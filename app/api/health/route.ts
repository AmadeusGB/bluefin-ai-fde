import { ensureSchema, getDatabase } from '@/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensureSchema();
    const result = await getDatabase()
      .prepare('SELECT 1 AS healthy')
      .first<{ healthy: number }>();
    if (result?.healthy !== 1) throw new Error('Database check failed');
    return Response.json(
      { ok: true },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch (error) {
    console.error('health check failed', error);
    return Response.json(
      { ok: false },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    );
  }
}
