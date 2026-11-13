// Private, local/SSH transfer only. Never commit or publicly upload the bundle.
// export <source.db> <new-bundle-directory>
// import <bundle-directory> <target.db> [--apply] (default is read-only planning)
import { DatabaseSync, backup } from 'node:sqlite';
import { mkdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const [mode, first, second, flag] = process.argv.slice(2);
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const tables = ['community_members', 'community_directory'];
if (!first || !second || !['export', 'import'].includes(mode))
  throw new Error('See usage in script header');
const schemas = {
  community_members: `CREATE TABLE IF NOT EXISTS community_members(id TEXT PRIMARY KEY,section TEXT NOT NULL,phone TEXT NOT NULL UNIQUE,password TEXT NOT NULL,answers TEXT NOT NULL,visible INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'active',created_at INTEGER NOT NULL,report TEXT,attachment TEXT)`,
  community_directory: `CREATE TABLE IF NOT EXISTS community_directory(id TEXT PRIMARY KEY,section TEXT NOT NULL,answers TEXT NOT NULL,visible INTEGER NOT NULL DEFAULT 1,status TEXT NOT NULL DEFAULT 'active',created_at INTEGER NOT NULL)`,
};
if (mode === 'export') {
  const source = resolve(first),
    dest = resolve(second);
  await mkdir(dest, { recursive: false });
  const db = new DatabaseSync(source, { readOnly: true });
  db.exec('BEGIN');
  const data = Object.fromEntries(
    tables.map((t) => [
      t,
      db
        .prepare(
          `SELECT * FROM ${t} WHERE visible=1 AND status='active' ORDER BY id`,
        )
        .all(),
    ]),
  );
  db.exec('COMMIT');
  db.close();
  if (
    data.community_members.length !== 107 ||
    data.community_directory.length !== 38
  )
    throw new Error('Unexpected member counts; re-audit before export');
  const files = new Set();
  for (const table of tables)
    for (const row of data[table]) {
      const a = JSON.parse(row.answers);
      if (!/^[a-f0-9]{64}\.webp$/.test(a.avatarFile || ''))
        throw new Error('Missing avatar');
      // Keep only the authorized basic profile; omit private source-form fields.
      row.answers = JSON.stringify(
        Object.fromEntries(
          ['name', 'displayName', 'phone', 'industry', 'city', 'avatarFile']
            .filter((k) => typeof a[k] === 'string')
            .map((k) => [k, a[k]]),
        ),
      );
      if (table === 'community_members') {
        row.report = null;
        row.attachment = null;
      }
      files.add('avatars/' + a.avatarFile);
    }
  const resources = JSON.parse(
    await readFile(
      new URL('../lib/resource-data.json', import.meta.url),
      'utf8',
    ),
  );
  for (const r of resources) files.add('resources/' + r.filename);
  const manifest = {
    version: 1,
    createdAt: new Date().toISOString(),
    accounts: 107,
    directory: 38,
    avatars: 145,
    files: [],
  };
  for (const path of files) {
    const bytes = await readFile(resolve(dirname(source), path));
    await mkdir(dirname(resolve(dest, path)), { recursive: true });
    await writeFile(resolve(dest, path), bytes);
    manifest.files.push({ path, bytes: bytes.length, sha256: sha(bytes) });
  }
  const bytes = Buffer.from(JSON.stringify(data));
  await writeFile(resolve(dest, 'members.json'), bytes);
  manifest.files.push({
    path: 'members.json',
    bytes: bytes.length,
    sha256: sha(bytes),
  });
  await writeFile(
    resolve(dest, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
  console.log(
    JSON.stringify({
      mode,
      accounts: 107,
      directory: 38,
      avatars: 145,
      files: manifest.files.length,
      excludedTestAccounts: 3,
    }),
  );
} else {
  const src = resolve(first),
    target = resolve(second),
    apply = flag === '--apply';
  const manifest = JSON.parse(
    await readFile(resolve(src, 'manifest.json'), 'utf8'),
  );
  if (manifest.version !== 1) throw new Error('Unsupported bundle');
  for (const file of manifest.files) {
    if (
      !/^(members\.json|avatars\/[a-f0-9]{64}\.webp|resources\/[a-z0-9-]+\.(pptx|md))$/.test(
        file.path,
      )
    )
      throw new Error('Invalid asset path');
    const bytes = await readFile(resolve(src, file.path));
    if (bytes.length !== file.bytes || sha(bytes) !== file.sha256)
      throw new Error('Bundle integrity check failed: ' + file.path);
  }
  const data = JSON.parse(await readFile(resolve(src, 'members.json'), 'utf8'));
  if (
    data.community_members.length !== manifest.accounts ||
    data.community_directory.length !== manifest.directory
  )
    throw new Error('Invalid profile counts');
  const files = new Set(manifest.files.map((f) => f.path));
  const ids = new Set(),
    phones = new Set();
  for (const t of tables)
    for (const r of data[t]) {
      if (
        ids.has(r.id) ||
        typeof r.id !== 'string' ||
        !['club', 'fde', 'enterprise'].includes(r.section) ||
        r.visible !== 1 ||
        r.status !== 'active'
      )
        throw new Error('Invalid profile');
      ids.add(r.id);
      const a = JSON.parse(r.answers);
      if (
        !/^[a-f0-9]{64}\.webp$/.test(a.avatarFile || '') ||
        !files.has('avatars/' + a.avatarFile)
      )
        throw new Error('Missing avatar asset');
      if (t === 'community_members') {
        if (
          !/^1\d{10}$/.test(r.phone) ||
          phones.has(r.phone) ||
          !/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(r.password)
        )
          throw new Error('Invalid account');
        phones.add(r.phone);
      }
    }
  const exists = await access(target).then(
    () => true,
    () => false,
  );
  if (!exists && !apply) {
    console.log(
      JSON.stringify({
        mode: 'plan',
        newDatabase: true,
        accounts: manifest.accounts,
        directory: manifest.directory,
        verifiedFiles: files.size,
      }),
    );
    process.exit(0);
  }
  if (apply) await mkdir(dirname(target), { recursive: true });
  const db = new DatabaseSync(target, { readOnly: !apply });
  db.exec('PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON');
  const summary = {
    mode: apply ? 'applied' : 'plan',
    newAccounts: 0,
    newDirectory: 0,
    existingPreserved: 0,
    verifiedFiles: files.size,
  };
  // Validate collisions before changing any target records or assets.
  const jobs = [];
  for (const t of tables) {
    const present = db
      .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?")
      .get(t);
    for (const r of data[t]) {
      const byId = present
        ? db.prepare(`SELECT * FROM ${t} WHERE id=?`).get(r.id)
        : undefined;
      const byPhone =
        present && t === 'community_members'
          ? db.prepare(`SELECT * FROM ${t} WHERE phone=?`).get(r.phone)
          : undefined;
      if (byId && t === 'community_members' && byId.phone !== r.phone)
        throw new Error('Account identity collision; target unchanged');
      if (byId && byPhone && byId.id !== byPhone.id)
        throw new Error('Conflicting account identity');
      const existing = byId || byPhone;
      if (existing) summary.existingPreserved++;
      else if (t === 'community_members') summary.newAccounts++;
      else summary.newDirectory++;
      jobs.push({ t, r, existing });
    }
  }
  if (!apply) {
    db.close();
    console.log(JSON.stringify(summary));
    process.exit(0);
  }
  if (exists) {
    await mkdir(resolve(dirname(target), 'backups'), { recursive: true });
    await backup(
      db,
      resolve(
        dirname(target),
        'backups',
        `before-community-transfer-${Date.now()}.db`,
      ),
    );
  }
  // Existing resources must be identical: never silently overwrite server files.
  for (const file of manifest.files.filter((f) => f.path !== 'members.json')) {
    const dest = resolve(dirname(target), file.path);
    const old = await readFile(dest).catch((e) => {
      if (e.code === 'ENOENT') return null;
      throw e;
    });
    if (old && sha(old) !== file.sha256)
      throw new Error('Existing server asset differs: ' + file.path);
  }
  for (const file of manifest.files.filter((f) => f.path !== 'members.json')) {
    const dest = resolve(dirname(target), file.path);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(resolve(src, file.path), dest);
  }
  db.exec('BEGIN IMMEDIATE');
  try {
    for (const t of tables) db.exec(schemas[t]);
    for (const { t, r, existing } of jobs) {
      if (existing) {
        // Preserve passwords, visibility, section and profile edits already on production.
        const current = db
          .prepare(`SELECT answers FROM ${t} WHERE id=?`)
          .get(existing.id);
        const incoming = JSON.parse(r.answers),
          a = JSON.parse(current.answers);
        for (const k of [
          'name',
          'displayName',
          'phone',
          'industry',
          'city',
          'avatarFile',
        ])
          if (!a[k]) a[k] = incoming[k];
        db.prepare(`UPDATE ${t} SET answers=? WHERE id=?`).run(
          JSON.stringify(a),
          existing.id,
        );
      } else {
        const keys =
          t === 'community_members'
            ? [
                'id',
                'section',
                'phone',
                'password',
                'answers',
                'visible',
                'status',
                'created_at',
                'report',
                'attachment',
              ]
            : ['id', 'section', 'answers', 'visible', 'status', 'created_at'];
        db.prepare(
          `INSERT INTO ${t}(${keys.join(',')}) VALUES(${keys.map(() => '?').join(',')})`,
        ).run(...keys.map((k) => r[k]));
      }
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  db.close();
  console.log(JSON.stringify(summary));
}
