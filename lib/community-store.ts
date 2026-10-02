import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  randomBytes,
  createHash,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import { cookies } from 'next/headers';
import { sections, type Section } from './community-fields';

let connection: DatabaseSync | undefined;
export function communityDB() {
  if (connection) return connection;
  const path = resolve(process.env.DATABASE_PATH || './data/bluefin.db');
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(
    'PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;',
  );
  db.exec(`CREATE TABLE IF NOT EXISTS community_members(id TEXT PRIMARY KEY,section TEXT NOT NULL,phone TEXT NOT NULL UNIQUE,password TEXT NOT NULL,answers TEXT NOT NULL,visible INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'active',created_at INTEGER NOT NULL,report TEXT,attachment TEXT);
 CREATE TABLE IF NOT EXISTS community_sessions(hash TEXT PRIMARY KEY,member_id TEXT NOT NULL REFERENCES community_members(id),expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS community_invites(hash TEXT PRIMARY KEY,label TEXT NOT NULL,section TEXT NOT NULL,uses INTEGER NOT NULL DEFAULT 0,max_uses INTEGER NOT NULL,expires INTEGER NOT NULL,disabled INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS community_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,until INTEGER NOT NULL);`);
  db.exec(
    `CREATE TABLE IF NOT EXISTS community_directory(id TEXT PRIMARY KEY,section TEXT NOT NULL,answers TEXT NOT NULL,visible INTEGER NOT NULL DEFAULT 1,status TEXT NOT NULL DEFAULT 'active',created_at INTEGER NOT NULL);`,
  );
  const codes = (process.env.COMMUNITY_INVITES || '')
    .split(',')
    .filter(Boolean);
  for (const entry of codes) {
    const [section, code] = entry.split(':');
    if (code && ['club', 'fde', 'enterprise'].includes(section))
      db.prepare(
        'INSERT OR IGNORE INTO community_invites VALUES(?,?,?,0,?, ?,0)',
      ).run(hash(code), '初始邀请', section, 50, Date.now() + 30 * 86400000);
  }
  connection = db;
  return db;
}
export function hash(v: string) {
  return createHash('sha256').update(v).digest('hex');
}
export function passwordHash(v: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(v, salt, 64).toString('hex')}`;
}
export function passwordMatches(v: string, stored: string) {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const bytes = Buffer.from(key, 'hex');
  return bytes.length === 64 && timingSafeEqual(bytes, scryptSync(v, salt, 64));
}
export type Member = {
  id: string;
  section: Section;
  phone: string;
  password: string;
  answers: string;
  visible: number;
  status: string;
  created_at: number;
  report: string | null;
  attachment: string | null;
  record_kind?: 'account' | 'directory';
};
export function directoryMembers(): Member[] {
  return communityDB()
    .prepare('SELECT * FROM community_directory ORDER BY created_at DESC')
    .all()
    .map((row) => ({
      ...row,
      phone: '',
      password: '',
      report: null,
      attachment: null,
      record_kind: 'directory',
    })) as Member[];
}
export async function memberSession() {
  const token = (await cookies()).get('bluefin_session')?.value;
  if (!token) return null;
  return communityDB()
    .prepare(
      "SELECT m.* FROM community_members m JOIN community_sessions s ON s.member_id=m.id WHERE s.hash=? AND s.expires>? AND m.status='active'",
    )
    .get(hash(token), Date.now()) as Member | undefined;
}
export async function createSession(id: string) {
  const token = randomBytes(32).toString('hex');
  const db = communityDB();
  db.prepare('DELETE FROM community_sessions WHERE expires<?').run(Date.now());
  db.prepare('INSERT INTO community_sessions VALUES(?,?,?)').run(
    hash(token),
    id,
    Date.now() + 7 * 86400000,
  );
  (await cookies()).set('bluefin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.SECURE_COOKIES === 'true',
    path: '/',
    maxAge: 7 * 86400,
  });
}
export async function endSession() {
  const jar = await cookies();
  const token = jar.get('bluefin_session')?.value;
  if (token)
    communityDB()
      .prepare('DELETE FROM community_sessions WHERE hash=?')
      .run(hash(token));
  jar.delete('bluefin_session');
}
export function guardMutation(req: Request) {
  const origin = req.headers.get('origin');
  const url = new URL(req.url);
  const forwarded = req.headers.get('x-forwarded-host');
  if (origin) {
    let host = '';
    try {
      host = new URL(origin).host;
    } catch {
      throw new Error('请求来源无效');
    }
    if (host !== url.host && host !== forwarded)
      throw new Error('请求来源无效');
  } else if (req.headers.get('sec-fetch-site') === 'cross-site')
    throw new Error('请求来源无效');
}
export function throttle(key: string, max = 12) {
  const db = communityDB(),
    now = Date.now();
  db.prepare('DELETE FROM community_limits WHERE until<?').run(now);
  db.prepare(
    'INSERT INTO community_limits VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1',
  ).run(hash(key), now + 15 * 60000);
  const row = db
    .prepare('SELECT count FROM community_limits WHERE key=?')
    .get(hash(key)) as { count: number };
  if (row.count > max) throw new Error('尝试次数过多，请15分钟后再试');
}
export function publicCard(m: Member) {
  const a = JSON.parse(m.answers);
  const name = Array.from(String(a.displayName || a.name || '').trim());
  const displayName =
    name.length === 0
      ? '新成员'
      : name.length === 1
        ? name[0] + '*'
        : name.length === 2
          ? name[0] + '*'
          : name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  return {
    id: m.id,
    section: m.section,
    display_name: displayName,
    city: a.city || '城市待补充',
    industry: a.industry || '行业待补充',
    role: a.role || sections[m.section].name + '会员',
    bio: a.industry
      ? '关注' + a.industry + '的AI应用'
      : '一起学习与交流AI应用。',
    is_demo: false,
    avatar_url: /^[a-f0-9]{64}\.webp$/.test(a.avatarFile || '')
      ? `/api/community/avatar/${encodeURIComponent(m.id)}`
      : null,
  };
}
