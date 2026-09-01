import { ensureSchema, getD1 } from '@/db';
import { authenticatedSiteUser } from '@/lib/site-auth';
type LeadSummary = {
  total: number;
  open_count: number;
  qualified_count: number;
  recent_count: number;
};
type EvidenceSummary = {
  total: number;
  review_count: number;
  approved_count: number;
  average_completeness: number;
};
type GeoSummary = {
  observations: number;
  latest_date: string | null;
  measurement_dates: number;
  platforms: number;
};
export async function GET(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: '需要管理员登录后访问。' }, { status: 401 });
  await ensureSchema();
  const db = getD1(),
    since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const [leads, evidence, geo] = await Promise.all([
    db
      .prepare(
        "SELECT COUNT(*) total,SUM(CASE WHEN status NOT IN ('closed','not_fit') THEN 1 ELSE 0 END) open_count,SUM(CASE WHEN status IN ('qualified','diagnostic_paid','mvd','won') THEN 1 ELSE 0 END) qualified_count,SUM(CASE WHEN created_at>=? THEN 1 ELSE 0 END) recent_count FROM diagnostic_applications",
      )
      .bind(since)
      .first<LeadSummary>(),
    db
      .prepare(
        "SELECT COUNT(*) total,SUM(CASE WHEN publication_status='review' THEN 1 ELSE 0 END) review_count,SUM(CASE WHEN publication_status='approved' THEN 1 ELSE 0 END) approved_count,COALESCE(AVG(completeness),0) average_completeness FROM evidence_records",
      )
      .first<EvidenceSummary>(),
    db
      .prepare(
        'SELECT COUNT(*) observations,MAX(test_date) latest_date,COUNT(DISTINCT test_date) measurement_dates,COUNT(DISTINCT platform) platforms FROM geo_measurements',
      )
      .first<GeoSummary>(),
  ]);
  return Response.json(
    {
      user: { email: user.email },
      generatedAt: Date.now(),
      leads: {
        total: Number(leads?.total || 0),
        open: Number(leads?.open_count || 0),
        qualified: Number(leads?.qualified_count || 0),
        recent: Number(leads?.recent_count || 0),
      },
      evidence: {
        total: Number(evidence?.total || 0),
        review: Number(evidence?.review_count || 0),
        approved: Number(evidence?.approved_count || 0),
        averageCompleteness: Math.round(
          Number(evidence?.average_completeness || 0),
        ),
      },
      geo: {
        observations: Number(geo?.observations || 0),
        latestDate: geo?.latest_date || null,
        measurementDates: Number(geo?.measurement_dates || 0),
        platforms: Number(geo?.platforms || 0),
      },
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}
