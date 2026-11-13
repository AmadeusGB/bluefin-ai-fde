// Local, owner-authorized import. Run with --env-file=.env.local and a private JSON path.
// Existing accounts and passwords are preserved; no phone means a directory entry only.
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync, backup } from 'node:sqlite';
import { randomBytes, scryptSync } from 'node:crypto';

const input = process.argv[2];
if (!input || !process.env.DATABASE_PATH)
  throw new Error('Specify input JSON and DATABASE_PATH');
const rows = JSON.parse(readFileSync(input, 'utf8'));
const ids = new Set(),
  phones = new Set();
for (const row of rows) {
  if (
    !/^archive-[a-f0-9]{24}$/.test(row.id) ||
    ids.has(row.id) ||
    row.section !== 'club'
  )
    throw new Error('Invalid or duplicate identity');
  ids.add(row.id);
  for (const key of ['name', 'displayName', 'phone', 'industry', 'city']) {
    if (typeof row[key] !== 'string' || row[key].length > 120)
      throw new Error('Invalid basic field');
  }
  if (
    !row.name ||
    (row.phone && (!/^1\d{10}$/.test(row.phone) || phones.has(row.phone)))
  )
    throw new Error('Invalid or duplicate phone');
  if (row.phone) phones.add(row.phone);
}
const db = new DatabaseSync(resolve(process.env.DATABASE_PATH));
db.exec('PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON');
mkdirSync('data/backups', { recursive: true });
await backup(db, `data/backups/before-member-import-${Date.now()}.db`);
db.exec(
  `CREATE TABLE IF NOT EXISTS community_directory(id TEXT PRIMARY KEY,section TEXT NOT NULL,answers TEXT NOT NULL,visible INTEGER NOT NULL DEFAULT 1,status TEXT NOT NULL DEFAULT 'active',created_at INTEGER NOT NULL)`,
);
const result = { createdAccounts: 0, existingAccounts: 0, directoryEntries: 0 };
db.exec('BEGIN IMMEDIATE');
try {
  for (const row of rows) {
    const basic = Object.fromEntries(
      ['name', 'displayName', 'phone', 'industry', 'city'].map((k) => [
        k,
        row[k],
      ]),
    );
    if (row.phone) {
      const existing = db
        .prepare('SELECT id FROM community_members WHERE phone=?')
        .get(row.phone);
      if (existing) {
        result.existingAccounts++;
        continue;
      }
      const salt = randomBytes(16).toString('hex');
      const password = `${salt}:${scryptSync(row.phone.slice(0, 8), salt, 64).toString('hex')}`;
      db.prepare(
        `INSERT INTO community_members(id,section,phone,password,answers,visible,status,created_at) VALUES(?,'club',?,?,?,1,'active',?)`,
      ).run(row.id, row.phone, password, JSON.stringify(basic), Date.now());
      result.createdAccounts++;
    } else {
      db.prepare(
        `INSERT INTO community_directory(id,section,answers,created_at) VALUES(?,'club',?,?) ON CONFLICT(id) DO NOTHING`,
      ).run(row.id, JSON.stringify(basic), Date.now());
      result.directoryEntries++;
    }
  }
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw error;
}
console.log(JSON.stringify(result));
db.close();
