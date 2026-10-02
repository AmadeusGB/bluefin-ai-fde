// Run locally with --env-file=.env.local. Original photos are never changed.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash, randomInt } from 'node:crypto';
import { DatabaseSync, backup } from 'node:sqlite';
import sharp from 'sharp';

const source = process.argv[2];
if (!source || !process.env.DATABASE_PATH)
  throw new Error('Provide image directory and DATABASE_PATH');
const db = new DatabaseSync(resolve(process.env.DATABASE_PATH));
db.exec('PRAGMA busy_timeout=5000');
const members = ['community_members', 'community_directory'].flatMap((table) =>
  db
    .prepare(
      `SELECT id,answers FROM ${table} WHERE visible=1 AND status='active' ORDER BY id`,
    )
    .all()
    .map((row) => ({ ...row, table, answers: JSON.parse(row.answers) })),
);
const files = (await readdir(source))
  .filter((name) => /\.jpe?g$/i.test(name))
  .sort();
if (members.length !== 145 || files.length !== 145)
  throw new Error('Expected exactly 145 profiles and 145 images');
if (members.some((m) => m.answers.avatarFile))
  throw new Error(
    'Avatars already assigned; refusing to reshuffle existing assignments',
  );
await mkdir('data/backups', { recursive: true });
await backup(db, `data/backups/before-avatars-${Date.now()}.db`);
const folder = resolve(process.env.AVATAR_DIR || './data/avatars');
await mkdir(folder, { recursive: true });
for (let i = files.length - 1; i > 0; i--) {
  const j = randomInt(i + 1);
  [files[i], files[j]] = [files[j], files[i]];
}
const assignments = [];
let originalBytes = 0,
  webBytes = 0;
const hashes = new Set();
for (let i = 0; i < files.length; i++) {
  const original = await readFile(resolve(source, files[i]));
  const sha256 = createHash('sha256').update(original).digest('hex');
  if (hashes.has(sha256)) throw new Error('Duplicate source image');
  hashes.add(sha256);
  const bytes = await sharp(original)
    .rotate()
    .resize(320, 320, { fit: 'cover' })
    .webp({ quality: 82 })
    .toBuffer();
  const filename = createHash('sha256').update(bytes).digest('hex') + '.webp';
  await writeFile(resolve(folder, filename), bytes);
  originalBytes += original.length;
  webBytes += bytes.length;
  assignments.push({
    id: members[i].id,
    table: members[i].table,
    source: files[i],
    sourceSha256: sha256,
    filename,
  });
}
db.exec('BEGIN IMMEDIATE');
try {
  for (const a of assignments) {
    // Re-read inside the transaction to preserve concurrent profile edits.
    const current = db
      .prepare(`SELECT answers FROM ${a.table} WHERE id=?`)
      .get(a.id);
    if (!current) throw new Error('Member disappeared during assignment');
    const answers = { ...JSON.parse(current.answers), avatarFile: a.filename };
    db.prepare(`UPDATE ${a.table} SET answers=? WHERE id=?`).run(
      JSON.stringify(answers),
      a.id,
    );
  }
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw error;
}
await writeFile(
  `data/avatar-assignment-${Date.now()}.json`,
  JSON.stringify(assignments, null, 2),
);
db.close();
console.log(
  JSON.stringify({
    assigned: assignments.length,
    originalBytes,
    webBytes,
    unique: hashes.size,
  }),
);
