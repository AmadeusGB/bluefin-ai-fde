import { ensureSchema, getD1 } from '@/db';
import { geoPlatforms } from '@/lib/geo-measurement';
import { geoQuerySet } from '@/lib/geo-query-set';
import { authenticatedSiteUser } from '@/lib/site-auth';

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
const flag = (value: unknown) =>
  ['1', 'true', 'yes'].includes(String(value).trim().toLowerCase()) ? 1 : 0;
const queryMap = new Map(geoQuerySet.map((item) => [item.id, item]));
const platformSet = new Set<string>(geoPlatforms);
type Aggregate = {
  dimension: string;
  observations: number;
  brand_mentions: number;
  fde_associations: number;
  citations: number;
  semantic_points: number;
  semantic_scored: number;
  independent_sources: number;
};
const metrics = (row: Aggregate) => ({
  dimension: row.dimension,
  observations: Number(row.observations),
  brandMentionRate: Number(row.observations)
    ? Number(row.brand_mentions) / Number(row.observations)
    : 0,
  citationRate: Number(row.observations)
    ? Number(row.citations) / Number(row.observations)
    : 0,
  citationShare:
    Number(row.citations) + Number(row.independent_sources)
      ? Number(row.citations) /
        (Number(row.citations) + Number(row.independent_sources))
      : 0,
  semanticAccuracy: Number(row.semantic_scored)
    ? Number(row.semantic_points) / (Number(row.semantic_scored) * 2)
    : 0,
  fdeAssociation: Number(row.brand_mentions)
    ? Number(row.fde_associations) / Number(row.brand_mentions)
    : 0,
});
const selectMetrics = (dimension: string) =>
  `SELECT ${dimension} AS dimension,COUNT(*) observations,SUM(brand_mentioned) brand_mentions,SUM(fde_association) fde_associations,SUM(citation_present) citations,SUM(CASE WHEN semantic_accuracy IS NOT NULL THEN semantic_accuracy ELSE 0 END) semantic_points,SUM(CASE WHEN semantic_accuracy IS NOT NULL THEN 1 ELSE 0 END) semantic_scored,SUM(independent_sources) independent_sources FROM geo_measurements`;

export async function GET(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: '需要管理员登录后访问。' }, { status: 401 });
  await ensureSchema();
  const db = getD1(),
    selectedDate = clean(new URL(request.url).searchParams.get('date'), 10),
    where = selectedDate ? ' WHERE test_date=?' : '';
  const statement = (sql: string) =>
    selectedDate ? db.prepare(sql).bind(selectedDate) : db.prepare(sql);
  const [overall, platforms, categories, dates] = await Promise.all([
    statement(`${selectMetrics("'all'")}${where}`).first<Aggregate>(),
    statement(
      `${selectMetrics('platform')}${where} GROUP BY platform ORDER BY platform`,
    ).all<Aggregate>(),
    statement(
      `${selectMetrics('category')}${where} GROUP BY category ORDER BY category`,
    ).all<Aggregate>(),
    db
      .prepare(
        `${selectMetrics('test_date')} GROUP BY test_date ORDER BY test_date DESC`,
      )
      .all<Aggregate>(),
  ]);
  const empty: Aggregate = {
    dimension: 'all',
    observations: 0,
    brand_mentions: 0,
    fde_associations: 0,
    citations: 0,
    semantic_points: 0,
    semantic_scored: 0,
    independent_sources: 0,
  };
  return Response.json(
    {
      user: { email: user.email },
      overall: metrics(overall || empty),
      platforms: (platforms.results || []).map(metrics),
      categories: (categories.results || []).map(metrics),
      dates: (dates.results || []).map(metrics),
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: '需要管理员登录后访问。' }, { status: 401 });
  const body = (await request.json()) as { rows?: Record<string, unknown>[] };
  const rows = Array.isArray(body.rows) ? body.rows : [];
  if (!rows.length || rows.length > 1200)
    return Response.json({ error: '每次应导入 1—1200 行。' }, { status: 400 });
  await ensureSchema();
  const db = getD1(),
    now = Date.now();
  let skipped = 0;
  const statements = [];
  for (const row of rows) {
    const queryId = clean(row.query_id, 20),
      platform = clean(row.platform, 80),
      testDate = clean(row.test_date, 10),
      canonical = queryMap.get(queryId);
    if (!testDate) {
      skipped++;
      continue;
    }
    if (
      !canonical ||
      !platformSet.has(platform) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(testDate)
    ) {
      skipped++;
      continue;
    }
    const semanticRaw = clean(row.semantic_accuracy, 4),
      semantic =
        semanticRaw === ''
          ? null
          : Math.max(0, Math.min(2, Math.round(Number(semanticRaw) || 0)));
    const independent = Math.max(
      0,
      Math.min(999, Math.round(Number(row.independent_sources) || 0)),
    );
    const values = [
      crypto.randomUUID(),
      queryId,
      canonical.category,
      canonical.query,
      platform,
      testDate,
      clean(row.model_or_mode, 120),
      clean(row.location, 120),
      clean(row.web_enabled, 16),
      clean(row.fresh_session, 16),
      clean(row.response_archive, 1000),
      flag(row.brand_mentioned),
      flag(row.fde_association),
      flag(row.citation_present),
      clean(row.citation_url, 1000),
      clean(row.citation_position, 200),
      semantic,
      independent,
      clean(row.reviewer, 120),
      clean(row.notes, 2000),
      now,
      now,
    ];
    statements.push(
      db
        .prepare(
          `INSERT INTO geo_measurements (id,query_id,category,query,platform,test_date,model_or_mode,location,web_enabled,fresh_session,response_archive,brand_mentioned,fde_association,citation_present,citation_url,citation_position,semantic_accuracy,independent_sources,reviewer,notes,imported_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(query_id,platform,test_date,model_or_mode,location) DO UPDATE SET web_enabled=excluded.web_enabled,fresh_session=excluded.fresh_session,response_archive=excluded.response_archive,brand_mentioned=excluded.brand_mentioned,fde_association=excluded.fde_association,citation_present=excluded.citation_present,citation_url=excluded.citation_url,citation_position=excluded.citation_position,semantic_accuracy=excluded.semantic_accuracy,independent_sources=excluded.independent_sources,reviewer=excluded.reviewer,notes=excluded.notes,updated_at=excluded.updated_at`,
        )
        .bind(...values),
    );
  }
  if (!statements.length)
    return Response.json(
      { error: '没有可导入的有效观测；请至少填写测试日期。', skipped },
      { status: 400 },
    );
  for (let i = 0; i < statements.length; i += 100)
    await db.batch(statements.slice(i, i + 100));
  return Response.json({ ok: true, accepted: statements.length, skipped });
}
