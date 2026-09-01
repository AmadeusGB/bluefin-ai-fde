import { env } from 'cloudflare:workers';

let ready: Promise<void> | undefined;
export function getD1() {
  if (!env.DB) throw new Error('Cloudflare D1 binding `DB` is unavailable.');
  return env.DB;
}
export function ensureSchema() {
  if (!ready) {
    const db = getD1();
    ready = db
      .batch([
        db.prepare(`CREATE TABLE IF NOT EXISTS diagnostic_applications (
      id TEXT PRIMARY KEY NOT NULL,
      created_at INTEGER NOT NULL,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      contact TEXT NOT NULL,
      role TEXT NOT NULL,
      industry TEXT NOT NULL,
      problem TEXT NOT NULL,
      diagnostic_score INTEGER,
      decision TEXT,
      diagnostic_profile TEXT,
      source TEXT NOT NULL DEFAULT 'website',
      landing_path TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
        acquisition_channel TEXT NOT NULL DEFAULT 'direct',
        owner_notes TEXT,
        next_action_at INTEGER,
        updated_at INTEGER,
        status TEXT NOT NULL DEFAULT 'new'
    )`),
        db.prepare(
          'CREATE INDEX IF NOT EXISTS idx_diagnostic_applications_created_at ON diagnostic_applications(created_at)',
        ),
        db.prepare(
          "CREATE INDEX IF NOT EXISTS idx_diagnostic_applications_open_status ON diagnostic_applications(status) WHERE status != 'closed'",
        ),
      ])
      .then(async () => {
        const result = await db
          .prepare('PRAGMA table_info(diagnostic_applications)')
          .all<{ name: string }>();
        const columns = new Set(
          (result.results || []).map((column) => column.name),
        );
        const additions: [string, string][] = [
          ['landing_path', 'TEXT'],
          ['diagnostic_profile', 'TEXT'],
          ['referrer', 'TEXT'],
          ['utm_source', 'TEXT'],
          ['utm_medium', 'TEXT'],
          ['utm_campaign', 'TEXT'],
          ['utm_content', 'TEXT'],
          ['utm_term', 'TEXT'],
          ['acquisition_channel', "TEXT NOT NULL DEFAULT 'direct'"],
          ['owner_notes', 'TEXT'],
          ['next_action_at', 'INTEGER'],
          ['updated_at', 'INTEGER'],
        ];
        const missing = additions.filter(([name]) => !columns.has(name));
        if (missing.length)
          await db.batch(
            missing.map(([name, type]) =>
              db.prepare(
                `ALTER TABLE diagnostic_applications ADD COLUMN ${name} ${type}`,
              ),
            ),
          );
        await db.batch([
          db.prepare(`CREATE TABLE IF NOT EXISTS geo_measurements (
            id TEXT PRIMARY KEY NOT NULL, query_id TEXT NOT NULL, category TEXT NOT NULL, query TEXT NOT NULL, platform TEXT NOT NULL,
            test_date TEXT NOT NULL, model_or_mode TEXT NOT NULL DEFAULT '', location TEXT NOT NULL DEFAULT '', web_enabled TEXT, fresh_session TEXT,
            response_archive TEXT, brand_mentioned INTEGER NOT NULL DEFAULT 0, fde_association INTEGER NOT NULL DEFAULT 0, citation_present INTEGER NOT NULL DEFAULT 0,
            citation_url TEXT, citation_position TEXT, semantic_accuracy INTEGER, independent_sources INTEGER NOT NULL DEFAULT 0,
            reviewer TEXT, notes TEXT, imported_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
          )`),
          db.prepare(
            'CREATE UNIQUE INDEX IF NOT EXISTS idx_geo_measurements_observation ON geo_measurements(query_id,platform,test_date,model_or_mode,location)',
          ),
          db.prepare(
            'CREATE INDEX IF NOT EXISTS idx_geo_measurements_date_platform ON geo_measurements(test_date,platform)',
          ),
        ]);
        await db.batch([
          db.prepare(`CREATE TABLE IF NOT EXISTS evidence_records (
            id TEXT PRIMARY KEY NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, title TEXT NOT NULL, client_label TEXT NOT NULL,
            industry TEXT NOT NULL, project_period TEXT, evidence_level TEXT NOT NULL, publication_status TEXT NOT NULL DEFAULT 'draft', client_authorized INTEGER NOT NULL DEFAULT 0,
            client_background TEXT, original_process TEXT, quantified_loss TEXT, data_scope TEXT, why_ordinary_failed TEXT, diagnosis TEXT, mvd_scope TEXT,
            human_system_boundary TEXT, baseline_results TEXT, risks_limitations TEXT, handover TEXT, reusable_assets TEXT, source_references TEXT, reviewer TEXT,
            completeness INTEGER NOT NULL DEFAULT 0
          )`),
          db.prepare(
            'CREATE INDEX IF NOT EXISTS idx_evidence_records_updated_at ON evidence_records(updated_at)',
          ),
        ]);
      });
  }
  return ready;
}
