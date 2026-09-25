import { authenticatedSiteUser } from '@/lib/site-auth';
import {
  communityDB,
  guardMutation,
  hash,
  type Member,
} from '@/lib/community-store';
import {
  sections,
  isSection,
  commonFields,
  roleFields,
} from '@/lib/community-fields';
import { randomBytes } from 'node:crypto';
import ExcelJS from 'exceljs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const json = (v: unknown, status = 200) =>
  Response.json(v, { status, headers: { 'Cache-Control': 'no-store' } });
export async function GET(req: Request) {
  if (!authenticatedSiteUser(req.headers))
    return json({ error: '需要管理员登录' }, 401);
  const url = new URL(req.url),
    s = url.searchParams.get('section'),
    q = (url.searchParams.get('q') || '').toLowerCase(),
    scope = url.searchParams.get('scope');
  let rows = communityDB()
    .prepare('SELECT * FROM community_members ORDER BY created_at DESC')
    .all() as Member[];
  rows = rows.filter(
    (r) =>
      (!isSection(s) || r.section === s) &&
      (!q || r.answers.toLowerCase().includes(q) || r.phone.includes(q)),
  );
  const ids = url.searchParams.get('ids')?.split(',');
  if (ids?.length) rows = rows.filter((r) => ids.includes(r.id));
  if (url.searchParams.get('format') === 'xlsx') {
    const wb = new ExcelJS.Workbook();
    wb.creator = '蓝旗鱼科技';
    for (const section of ['club', 'fde', 'enterprise'] as const) {
      const sh = wb.addWorksheet(sections[section].name);
      const fields =
        scope === 'public'
          ? commonFields.filter((f) =>
              ['displayName', 'city', 'industry', 'role'].includes(f.key),
            )
          : [...commonFields, ...roleFields[section]];
      sh.columns = [
        { header: '会员ID', key: 'id', width: 38 },
        { header: '加入时间', key: 'date', width: 23 },
        { header: '状态', key: 'status', width: 15 },
        ...fields.map((f) => ({
          header: f.label,
          key: f.key,
          width: f.type === 'textarea' ? 55 : 24,
        })),
        ...(scope === 'public'
          ? []
          : [{ header: 'AI初步诊断', key: 'report', width: 70 }]),
      ];
      for (const row of rows.filter((r) => r.section === section)) {
        const a = JSON.parse(row.answers);
        sh.addRow({
          id: row.id,
          date: new Date(row.created_at).toISOString(),
          status: row.status,
          ...Object.fromEntries(
            fields.map((f) => [
              f.key,
              Array.isArray(a[f.key]) ? a[f.key].join('、') : a[f.key] || '',
            ]),
          ),
          report: row.report || '',
        });
      }
      sh.getRow(1).font = { bold: true, color: { argb: 'FFEAF3FF' } };
      sh.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF153B65' },
      };
      sh.views = [{ state: 'frozen', ySplit: 1 }];
      sh.autoFilter = { from: 'A1', to: { row: 1, column: sh.columnCount } };
    }
    return new Response(Buffer.from(await wb.xlsx.writeBuffer()), {
      headers: {
        'content-type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'content-disposition': 'attachment; filename="bluefin-members.xlsx"',
        'cache-control': 'no-store',
      },
    });
  }
  if (url.searchParams.get('format') === 'md') {
    const md = rows
      .map((r) => {
        const a = JSON.parse(r.answers),
          fields =
            scope === 'public'
              ? commonFields.filter((f) =>
                  ['displayName', 'city', 'industry', 'role'].includes(f.key),
                )
              : [...commonFields, ...roleFields[r.section]];
        return `# ${a.displayName}\n\n板块：${sections[r.section].name}\n会员ID：${r.id}\n\n${fields.map((f) => `- ${f.label}：${Array.isArray(a[f.key]) ? a[f.key].join('、') : a[f.key] || '未填写'}`).join('\n')}\n\n${scope !== 'public' && r.report ? r.report : ''}`;
      })
      .join('\n\n---\n\n');
    return new Response(md || '# 暂无匹配会员\n', {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'content-disposition': 'attachment; filename="bluefin-members.md"',
        'cache-control': 'no-store',
      },
    });
  }
  return json({
    members: rows.map(({ password: _, ...r }) => ({
      ...r,
      answers: JSON.parse(r.answers),
    })),
    invites: communityDB()
      .prepare(
        'SELECT rowid as id,label,section,uses,max_uses,expires,disabled FROM community_invites',
      )
      .all(),
  });
}
export async function POST(req: Request) {
  if (!authenticatedSiteUser(req.headers))
    return json({ error: '需要管理员登录' }, 401);
  try {
    guardMutation(req);
    const b = await req.json();
    if (b.action === 'invite' && isSection(b.section)) {
      const code = 'LQY-' + randomBytes(6).toString('hex').toUpperCase();
      const max = Math.max(1, Math.min(500, Number(b.maxUses) || 10));
      communityDB()
        .prepare('INSERT INTO community_invites VALUES(?,?,?,0,?,?,0)')
        .run(
          hash(code),
          String(b.label || '邀请').slice(0, 60),
          b.section,
          max,
          Date.now() +
            Math.min(365, Math.max(1, Number(b.days) || 30)) * 86400000,
        );
      return json({ code });
    }
    if (b.action === 'disableInvite') {
      communityDB()
        .prepare('UPDATE community_invites SET disabled=1 WHERE rowid=?')
        .run(Number(b.id));
      return json({ ok: true });
    }
    if (b.action === 'status' && ['active', 'suspended'].includes(b.status)) {
      communityDB()
        .prepare('UPDATE community_members SET status=? WHERE id=?')
        .run(b.status, String(b.id));
      return json({ ok: true });
    }
    return json({ error: '操作无效' }, 400);
  } catch {
    return json({ error: '操作未完成，请检查输入' }, 400);
  }
}
