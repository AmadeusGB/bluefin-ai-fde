import { ensureSchema, getD1 } from '@/db';
import {
  evidenceLevels,
  evidenceSections,
  evidenceStatuses,
} from '@/lib/evidence';
import { authenticatedSiteUser } from '@/lib/site-auth';
const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
const levelSet = new Set(evidenceLevels.map(([key]) => key)),
  statusSet = new Set(evidenceStatuses.map(([key]) => key));
type RecordRow = {
  id: string;
  created_at: number;
  updated_at: number;
  title: string;
  client_label: string;
  industry: string;
  project_period: string | null;
  evidence_level: string;
  publication_status: string;
  client_authorized: number;
  client_background: string | null;
  original_process: string | null;
  quantified_loss: string | null;
  data_scope: string | null;
  why_ordinary_failed: string | null;
  diagnosis: string | null;
  mvd_scope: string | null;
  human_system_boundary: string | null;
  baseline_results: string | null;
  risks_limitations: string | null;
  handover: string | null;
  reusable_assets: string | null;
  source_references: string | null;
  reviewer: string | null;
  completeness: number;
};
export async function GET(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: '需要管理员登录后访问。' }, { status: 401 });
  await ensureSchema();
  const rows = await getD1()
    .prepare(
      'SELECT * FROM evidence_records ORDER BY updated_at DESC LIMIT 200',
    )
    .all<RecordRow>();
  return Response.json(
    { user: { email: user.email }, records: rows.results || [] },
    { headers: { 'cache-control': 'no-store' } },
  );
}
export async function POST(request: Request) {
  return save(request, false);
}
export async function PATCH(request: Request) {
  return save(request, true);
}
async function save(request: Request, updating: boolean) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: '需要管理员登录后访问。' }, { status: 401 });
  const body = (await request.json()) as Record<string, unknown>,
    id = clean(body.id, 80),
    title = clean(body.title, 160),
    clientLabel = clean(body.clientLabel, 160),
    industry = clean(body.industry, 100),
    projectPeriod = clean(body.projectPeriod, 80),
    level = clean(body.evidenceLevel, 30),
    status = clean(body.publicationStatus, 30),
    clientAuthorized = body.clientAuthorized === true ? 1 : 0,
    sourceReferences = clean(body.sourceReferences, 4000),
    reviewer = clean(body.reviewer, 120);
  if (updating && !id)
    return Response.json({ error: '缺少证据记录编号。' }, { status: 400 });
  if (
    !title ||
    !clientLabel ||
    !industry ||
    !levelSet.has(level as never) ||
    !statusSet.has(status as never)
  )
    return Response.json(
      { error: '请完整填写标题、客户标识、行业、证据等级和状态。' },
      { status: 400 },
    );
  const sectionValues = evidenceSections.map((section) =>
      clean(body[section.key], 5000),
    ),
    completeness = Math.round(
      (sectionValues.filter(Boolean).length / evidenceSections.length) * 100,
    ),
    baselineResults =
      sectionValues[
        evidenceSections.findIndex(
          (section) => section.key === 'baselineResults',
        )
      ];
  if (level === 'verified' && (!clientAuthorized || !baselineResults))
    return Response.json(
      { error: '“已验证案例”必须具备客户授权和基线/结果证据。' },
      { status: 400 },
    );
  await ensureSchema();
  const db = getD1(),
    now = Date.now();
  if (updating) {
    const sql = `UPDATE evidence_records SET updated_at=?,title=?,client_label=?,industry=?,project_period=?,evidence_level=?,publication_status=?,client_authorized=?,${evidenceSections.map((section) => `${section.column}=?`).join(',')},source_references=?,reviewer=?,completeness=? WHERE id=?`,
      result = await db
        .prepare(sql)
        .bind(
          now,
          title,
          clientLabel,
          industry,
          projectPeriod || null,
          level,
          status,
          clientAuthorized,
          ...sectionValues.map((value) => value || null),
          sourceReferences || null,
          reviewer || null,
          completeness,
          id,
        )
        .run();
    if (!result.meta.changes)
      return Response.json({ error: '未找到该证据记录。' }, { status: 404 });
    return Response.json({ ok: true, id, completeness });
  }
  const newId = crypto.randomUUID(),
    columns = evidenceSections.map((section) => section.column).join(','),
    placeholders = evidenceSections.map(() => '?').join(',');
  await db
    .prepare(
      `INSERT INTO evidence_records (id,created_at,updated_at,title,client_label,industry,project_period,evidence_level,publication_status,client_authorized,${columns},source_references,reviewer,completeness) VALUES (?,?,?,?,?,?,?,?,?,?,${placeholders},?,?,?)`,
    )
    .bind(
      newId,
      now,
      now,
      title,
      clientLabel,
      industry,
      projectPeriod || null,
      level,
      status,
      clientAuthorized,
      ...sectionValues.map((value) => value || null),
      sourceReferences || null,
      reviewer || null,
      completeness,
    )
    .run();
  return Response.json({ ok: true, id: newId, completeness }, { status: 201 });
}
