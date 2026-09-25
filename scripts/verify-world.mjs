import { chromium, request } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import { commonFields, roleFields, sections } from '../lib/community-fields.ts';
const base = process.env.TEST_URL || 'http://127.0.0.1:4186';
const access = JSON.parse(readFileSync('data/preview-access.json', 'utf8'));
const password = process.env.TEST_PASSWORD || JSON.parse(readFileSync('data/member-test-access.json', 'utf8')).password;
const results = [];
const ok = (name) => {
  results.push({ name, passed: true });
  console.log('PASS', name);
};
const contexts = [];
function answers(section, n) {
  return Object.fromEntries(
    [...commonFields, ...roleFields[section]].map((f) => [
      f.key,
      f.options
        ? f.multi
          ? [f.options[0]]
          : f.options[0]
        : {
            name: '测试体验' + n,
            displayName: '演示·' + sections[section].name,
            phone: '00000000' + String(n).padStart(3, '0'),
            city: '深圳',
            company: '演示企业（非真实客户）',
            caseTitle: '模拟知识助手',
            caseDescription: '功能测试样本，无真实客户数据',
          }[f.key] || '功能测试',
    ]),
  );
}
const anon = await request.newContext({ baseURL: base });
assert.equal((await anon.get('/api/community/members')).status(), 401);
assert.equal(
  (await anon.get('/api/community/download/club-course')).status(),
  401,
);
assert.equal(
  (
    await anon.get('/api/operations/community', {
      headers: {
        'oai-authenticated-user-id': 'spoof',
        'oai-authenticated-user-email': access.adminUser,
      },
    })
  ).status(),
  401,
);
ok('未登录下载、会员资料与伪造管理员请求均拒绝');
assert.equal(
  (
    await anon.post('/api/community/invite', {
      data: { section: 'club', code: 'invalid' },
    })
  ).status(),
  400,
);
ok('无效邀请码被拒绝');
const admin = await request.newContext({
  baseURL: base,
  extraHTTPHeaders: {
    Authorization:
      'Basic ' +
      Buffer.from(access.adminUser + ':' + access.adminPassword).toString(
        'base64',
      ),
  },
});
for (const [n, section] of ['club', 'fde', 'enterprise'].entries()) {
  const ctx = await request.newContext({ baseURL: base });
  contexts.push(ctx);
  const a = answers(section, n + 1);
  let reg = await ctx.post('/api/community/register', {
    data: {
      section,
      answers: a,
      code: access.invites[section],
      password,
      consent: true,
      visible: false,
    },
  });
  if (!reg.ok()) {
    const login = await ctx.post('/api/community/login', {
      data: { phone: a.phone, password },
    });
    assert.equal(login.status(), 200, await login.text());
  } else assert.equal(reg.status(), 200, await reg.text());
  const me = await (await ctx.get('/api/community/me')).json();
  assert.equal(me.member.answers.name, a.name);
  assert.ok(!('password' in me.member));
  const members = await (await ctx.get('/api/community/members')).json();
  assert.ok(members.members.length >= 6);
  assert.ok(
    members.members.every(
      (m) => !('phone' in m) && !('answers' in m) && m.section === section,
    ),
  );
  const resources = await (await ctx.get('/api/community/resources')).json();
  assert.equal(resources.resources.length, section === 'enterprise' ? 4 : 1);
  const course = await ctx.get(
    '/api/community/download/' + section + '-course',
  );
  assert.equal(course.status(), 200);
  assert.equal((await course.body()).subarray(0, 2).toString(), 'PK');
  const other = section === 'club' ? 'fde' : 'club';
  assert.equal(
    (await ctx.get('/api/community/download/' + other + '-course')).status(),
    403,
  );
  if (section === 'enterprise') {
    assert.ok(me.member.report.includes('基于您自填的问卷'));
    assert.equal((await ctx.get('/api/community/report')).status(), 200);
  }
  if (section === 'fde') {
    const bad = await ctx.post('/api/community/upload', {
      multipart: {
        file: {
          name: 'bad.png',
          mimeType: 'image/png',
          buffer: Buffer.from('not an image payload'),
        },
      },
    });
    assert.equal(bad.status(), 400);
    const image = readFileSync('public/world/logo.png');
    const upload = await ctx.post('/api/community/upload', {
      multipart: {
        file: { name: 'demo.png', mimeType: 'image/png', buffer: image },
      },
    });
    assert.equal(upload.status(), 200, await upload.text());
    assert.equal((await ctx.get('/api/community/attachment')).status(), 200);
  }
  ok(section + '：加入、会话、资料隔离、下载与专属功能');
}
const xlsx = await admin.get('/api/operations/community?format=xlsx');
assert.equal(xlsx.status(), 200);
const wb = new ExcelJS.Workbook();
await wb.xlsx.load(await xlsx.body());
assert.equal(wb.worksheets.length, 3);
assert.ok(wb.worksheets.every((s) => s.rowCount >= 2));
writeFileSync('data/validated-members.xlsx', await xlsx.body());
const md = await admin.get('/api/operations/community?format=md&scope=public');
assert.equal(md.status(), 200);
assert.ok(!(await md.text()).includes('联系电话'));
ok('Excel三表与公开字段Markdown导出');
const made = await admin.post('/api/operations/community', {
  data: {
    action: 'invite',
    section: 'club',
    maxUses: 1,
    label: '自动验证一次性邀请',
  },
});
const invite = await made.json();
assert.ok(invite.code);
const c1 = await request.newContext({ baseURL: base }),
  c2 = await request.newContext({ baseURL: base });
const regOne = await c1.post('/api/community/register', {
  data: {
    section: 'club',
    answers: answers('club', 701 + (Date.now() % 100)),
    code: invite.code,
    password,
    consent: true,
  },
});
assert.equal(regOne.status(), 200, await regOne.text());
const regTwo = await c2.post('/api/community/register', {
  data: {
    section: 'club',
    answers: answers('club', 901 + (Date.now() % 100)),
    code: invite.code,
    password,
    consent: true,
  },
});
assert.equal(regTwo.status(), 400);
ok('一次性邀请码无法重复使用');
await c1.dispose();
await c2.dispose();
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(base);
await page
  .getByRole('button', { name: '进入蓝旗鱼的AI世界', exact: true })
  .click();
await page.waitForURL('**/world');
assert.ok(
  await page
    .getByRole('heading', { name: 'AI俱乐部', exact: true })
    .isVisible(),
);
await page.screenshot({ path: 'data/world-desktop.png', fullPage: true });
ok('Logo点击、进入进度与三入口导航');
await page.goto(base + '/join?section=enterprise');
await page.getByPlaceholder('输入邀请码').fill(access.invites.enterprise);
await page.getByRole('button', { name: '继续', exact: true }).click();
const uiAnswers = answers('enterprise', 501 + (Date.now() % 100));
for (const fields of [commonFields, roleFields.enterprise]) {
  for (const f of fields) {
    if (f.options) await page.locator(`input[name="${f.key}"]`).first().check();
    else
      await page
        .getByLabel(f.label, { exact: true })
        .fill(String(uiAnswers[f.key]));
  }
  await page.getByRole('button', { name: '继续', exact: true }).click();
}
await page.getByPlaceholder('至少10个字符').fill(password);
await page.getByRole('checkbox').last().check();
await page.getByRole('button', { name: '确认加入', exact: true }).click();
await page.waitForURL('**/members');
await page.getByRole('button', { name: '我的AI诊断', exact: true }).click();
await page.getByText('当前判断', { exact: true }).waitFor();
await page.screenshot({ path: 'data/diagnostic-desktop.png', fullPage: true });
ok('企业四步表单实际提交与报告页面');
await page.getByRole('button', { name: '同路人', exact: true }).click();
await page.locator('.member-node').first().focus();
await page.keyboard.press('Enter');
await page.locator('dialog[open]').waitFor();
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog[open]').count(), 0);
await page.screenshot({ path: 'data/members-desktop.png', fullPage: true });
ok('悬浮会员资料弹窗与键盘关闭');
await page.goto(base + '/events/salon-0919');
await page.getByRole('button', { name: '放大：集体合影' }).click();
await page.locator('dialog[open]').waitFor();
await page.getByRole('button', { name: '下一张', exact: true }).click();
await page.keyboard.press('Escape');
ok('活动相册放大与切换');
for (const width of [320, 375, 414, 768]) {
  await page.setViewportSize({ width, height: 900 });
  for (const path of [
    '/',
    '/world',
    '/community/club',
    '/join?section=fde',
    '/members',
    '/founders',
    '/services',
    '/about',
    '/training',
    '/knowledge',
  ]) {
    await page.goto(base + path);
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    assert.equal(over, false, `overflow ${width} ${path}`);
  }
  if (width === 375) {
    await page.goto(base + '/world');
    await page.screenshot({ path: 'data/world-mobile.png', fullPage: true });
    await page.goto(base + '/members');
    await page.screenshot({ path: 'data/members-mobile.png', fullPage: true });
  }
}
ok('320/375/414/768宽度十个页面无横向溢出');
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto(base);
await page.waitForTimeout(1000);
assert.ok(
  await page
    .getByRole('button', { name: '进入蓝旗鱼的AI世界', exact: true })
    .isVisible(),
);
await page.screenshot({ path: 'data/entrance-mobile.png' });
ok('减少动态效果下入口仍完整可用');
assert.equal(errors.length, 0, JSON.stringify(errors));
ok('浏览器无运行时异常');
await browser.close();
await anon.dispose();
await admin.dispose();
for (const c of contexts) await c.dispose();
writeFileSync(
  'data/verification.json',
  JSON.stringify({ date: new Date().toISOString(), base, results }, null, 2),
);
writeFileSync(
  'data/member-test-access.json',
  JSON.stringify(
    {
      password,
      accounts: ['club', 'fde', 'enterprise'].map((s, i) => ({
        section: s,
        phone: answers(s, i + 1).phone,
      })),
    },
    null,
    2,
  ),
);
