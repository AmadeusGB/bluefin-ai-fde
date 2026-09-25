import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  communityDB,
  memberSession,
  hash,
  passwordHash,
  passwordMatches,
  createSession,
  endSession,
  guardMutation,
  throttle,
  publicCard,
  type Member,
} from '@/lib/community-store';
import { isSection, validateAnswers } from '@/lib/community-fields';
import { diagnosticReport } from '@/lib/community-report';
import resources from '@/lib/resource-data.json';
import demos from '@/lib/demo-members.json';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const json = (v: unknown, status = 200) =>
  NextResponse.json(v, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
type Context = { params: Promise<{ action: string[] }> };
export async function GET(req: Request, ctx: Context) {
  const { action } = await ctx.params;
  const me = await memberSession();
  if (!me) return json({ error: '请先登录会员账号' }, 401);
  if (action[0] === 'me')
    return json({
      member: {
        ...publicCard(me),
        answers: JSON.parse(me.answers),
        visible: !!me.visible,
        report: me.report,
        attachment: !!me.attachment,
      },
    });
  if (action[0] === 'members') {
    const real = communityDB()
      .prepare(
        "SELECT * FROM community_members WHERE visible=1 AND status='active' AND section=? ORDER BY created_at DESC LIMIT 300",
      )
      .all(me.section) as Member[];
    return json({
      members: [
        ...real.map(publicCard),
        ...(process.env.PREVIEW_MODE === 'true'
          ? demos
              .filter((m) => m.section === me.section)
              .map((m) => ({
                id: m.id,
                section: m.section,
                display_name: m.display_name,
                city: m.city,
                industry: m.industry,
                role: m.role,
                bio: m.bio,
                is_demo: true,
              }))
          : []),
      ],
    });
  }
  if (action[0] === 'report' && me.report)
    return new Response(me.report, {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'content-disposition': 'attachment; filename="bluefin-diagnostic.md"',
        'cache-control': 'no-store',
      },
    });
  if (action[0] === 'resources')
    return json({
      resources: resources.filter(
        (r) =>
          r.section === me.section &&
          (!r.demo || process.env.PREVIEW_MODE === 'true'),
      ),
    });
  if (action[0] === 'download') {
    const r = resources.find(
      (r) =>
        r.id === action[1] &&
        r.section === me.section &&
        (!r.demo || process.env.PREVIEW_MODE === 'true'),
    );
    if (!r) return json({ error: '当前账号没有此资料的下载权限' }, 403);
    try {
      const bytes = await readFile(
        resolve(process.env.RESOURCE_DIR || './data/resources', r.filename),
      );
      return new Response(bytes, {
        headers: {
          'content-type':
            r.type === 'PPTX'
              ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
              : 'text/markdown; charset=utf-8',
          'content-disposition': `attachment; filename="${r.filename}"`,
          'cache-control': 'private, no-store',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch {
      return json({ error: '资料暂未就绪，请联系管理员' }, 404);
    }
  }
  if (action[0] === 'attachment' && me.attachment) {
    try {
      return new Response(
        await readFile(resolve('./data/uploads', me.attachment)),
        {
          headers: {
            'content-type': me.attachment.endsWith('.png')
              ? 'image/png'
              : 'image/jpeg',
            'cache-control': 'private, no-store',
            'X-Content-Type-Options': 'nosniff',
          },
        },
      );
    } catch {
      return json({ error: '图片未找到' }, 404);
    }
  }
  return json({ error: '没有找到此功能' }, 404);
}
export async function POST(req: Request, ctx: Context) {
  try {
    guardMutation(req);
    const { action } = await ctx.params;
    if (Number(req.headers.get('content-length')) > 6 * 1024 * 1024)
      return json({ error: '请求内容过大' }, 413);
    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      'local';
    if (action[0] === 'logout') {
      await endSession();
      return json({ ok: true });
    }
    if (action[0] === 'upload') {
      const me = await memberSession();
      if (!me || me.section !== 'fde')
        return json({ error: '请使用FDE会员账号登录' }, 403);
      throttle('upload:' + me.id, 15);
      const form = await req.formData(),
        file = form.get('file');
      if (
        !(file instanceof File) ||
        file.size > 5 * 1024 * 1024 ||
        file.size < 10
      )
        throw new Error('请选择5MB以内的PNG或JPEG截图');
      const bytes = Buffer.from(await file.arrayBuffer()),
        png = bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
        jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      if (!png && !jpg) throw new Error('只接受PNG或JPEG图片');
      const name = randomUUID() + (png ? '.png' : '.jpg');
      await mkdir(resolve('./data/uploads'), { recursive: true });
      await writeFile(resolve('./data/uploads', name), bytes);
      communityDB()
        .prepare('UPDATE community_members SET attachment=? WHERE id=?')
        .run(name, me.id);
      return json({ ok: true });
    }
    const raw = await req.text();
    if (raw.length > 30000) throw new Error('表单内容过长');
    const body = JSON.parse(raw);
    if (action[0] === 'invite') {
      throttle('invite:' + ip, 25);
      const inv = communityDB()
        .prepare(
          'SELECT section FROM community_invites WHERE hash=? AND disabled=0 AND expires>? AND uses<max_uses',
        )
        .get(hash(String(body.code || '')), Date.now()) as
        | { section: string }
        | undefined;
      if (!inv || inv.section !== body.section)
        return json({ error: '邀请码无效、已到期或不属于所选板块' }, 400);
      return json({ ok: true });
    }
    if (action[0] === 'register') {
      throttle('register:' + ip, 20);
      if (!isSection(body.section)) throw new Error('请选择加入的板块');
      if (!body.consent) throw new Error('请阅读并同意资料处理说明');
      const a = validateAnswers(body.section, body.answers || {}),
        password = String(body.password || '');
      if (password.length < 10 || password.length > 128)
        throw new Error('密码需要10—128个字符');
      const db = communityDB(),
        id = randomUUID(),
        phone = String(a.phone).replace(/[ -]/g, ''),
        pw = passwordHash(password),
        report = body.section === 'enterprise' ? diagnosticReport(a) : null;
      db.exec('BEGIN IMMEDIATE');
      try {
        const use = db
          .prepare(
            'UPDATE community_invites SET uses=uses+1 WHERE hash=? AND section=? AND disabled=0 AND expires>? AND uses<max_uses',
          )
          .run(hash(String(body.code || '')), body.section, Date.now());
        if (!use.changes) throw new Error('邀请码无效、已使用完或已到期');
        if (
          db
            .prepare('SELECT id FROM community_members WHERE phone=?')
            .get(phone)
        )
          throw new Error('此手机号已经注册，请直接登录');
        db.prepare(
          'INSERT INTO community_members(id,section,phone,password,answers,visible,created_at,report) VALUES(?,?,?,?,?,?,?,?)',
        ).run(
          id,
          body.section,
          phone,
          pw,
          JSON.stringify({
            ...a,
            consentAt: new Date().toISOString(),
            policyVersion: '2026-09-25',
          }),
          body.visible === true ? 1 : 0,
          Date.now(),
          report,
        );
        db.exec('COMMIT');
      } catch (e) {
        db.exec('ROLLBACK');
        throw e;
      }
      await createSession(id);
      return json({ ok: true, id });
    }
    if (action[0] === 'login') {
      const phone = String(body.phone || '').replace(/[ -]/g, '');
      throttle('login:' + ip, 25);
      throttle('account:' + phone, 12);
      const m = communityDB()
        .prepare(
          "SELECT * FROM community_members WHERE phone=? AND status='active'",
        )
        .get(phone) as Member | undefined;
      if (
        !m ||
        !passwordMatches(String(body.password || '').slice(0, 128), m.password)
      )
        return json({ error: '手机号或密码不正确，或账号已停用' }, 401);
      await createSession(m.id);
      return json({ ok: true });
    }
    if (action[0] === 'profile') {
      const me = await memberSession();
      if (!me) return json({ error: '请先登录' }, 401);
      communityDB()
        .prepare('UPDATE community_members SET visible=? WHERE id=?')
        .run(body.visible === true ? 1 : 0, me.id);
      return json({ ok: true });
    }
    return json({ error: '没有找到此功能' }, 404);
  } catch (e) {
    return json(
      { error: e instanceof Error ? e.message : '请求未完成，请重试' },
      400,
    );
  }
}
