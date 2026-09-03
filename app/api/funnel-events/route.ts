import { ensureSchema, getDatabase } from '@/db';

const events = new Set([
  'page_view',
  'diagnostic_started',
  'diagnostic_apply_clicked',
  'application_viewed',
]);
const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const event = clean(body.event, 40),
      source = clean(body.source, 40) || 'website',
      pathCandidate = clean(body.landingPath, 200),
      landingPath = pathCandidate.startsWith('/')
        ? pathCandidate.split('?')[0]
        : '/';
    if (!events.has(event))
      return Response.json({ error: '事件无效。' }, { status: 400 });
    await ensureSchema();
    const now = Date.now(),
      eventDate = new Date(now).toISOString().slice(0, 10);
    await getDatabase()
      .prepare(
        `INSERT INTO funnel_events (event_date,event_name,source,landing_path,count,updated_at) VALUES (?,?,?,?,1,?)
         ON CONFLICT(event_date,event_name,source,landing_path) DO UPDATE SET count=count+1,updated_at=excluded.updated_at`,
      )
      .bind(eventDate, event, source, landingPath, now)
      .run();
    return Response.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error('funnel event failed', error);
    return Response.json({ error: '暂时无法记录。' }, { status: 500 });
  }
}
