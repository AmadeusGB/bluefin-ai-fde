import { env } from 'cloudflare:workers';

let ready: Promise<void> | undefined;
export function getD1(){ if(!env.DB) throw new Error('Cloudflare D1 binding `DB` is unavailable.'); return env.DB; }
export function ensureSchema(){
  if(!ready){ const db=getD1(); ready=db.batch([
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
      source TEXT NOT NULL DEFAULT 'website',
      status TEXT NOT NULL DEFAULT 'new'
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_diagnostic_applications_created_at ON diagnostic_applications(created_at)'),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_diagnostic_applications_open_status ON diagnostic_applications(status) WHERE status != 'closed'")
  ]).then(()=>undefined); }
  return ready;
}
