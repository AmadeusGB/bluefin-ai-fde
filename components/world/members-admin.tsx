'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  sections,
  commonFields,
  roleFields,
  type Section,
} from '@/lib/community-fields';
type Row = {
  id: string;
  section: Section;
  phone: string;
  answers: Record<string, string | string[]>;
  created_at: number;
  status: string;
  visible: number;
  report: string | null;
  attachment: string | null;
};
type Invite = {
  id: number;
  label: string;
  section: Section;
  uses: number;
  max_uses: number;
  expires: number;
  disabled: number;
};
export function MembersAdmin() {
  const [rows, setRows] = useState<Row[]>([]),
    [invites, setInvites] = useState<Invite[]>([]),
    [section, setSection] = useState(''),
    [q, setQ] = useState(''),
    [error, setError] = useState(''),
    [selected, setSelected] = useState<string[]>([]),
    [detail, setDetail] = useState<Row | null>(null),
    [inviteSection, setInviteSection] = useState<Section>('club'),
    [code, setCode] = useState(''),
    [scope, setScope] = useState('private'),
    [label, setLabel] = useState('官网邀请'),
    [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/operations/community');
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setRows(d.members);
      setInvites(d.invites);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  const shown = rows.filter(
    (r) =>
      (!section || r.section === section) &&
      (!q || JSON.stringify(r.answers).includes(q)),
  );
  async function mutate(body: unknown) {
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/operations/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      if (d.code) setCode(d.code);
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function exportURL(format: string) {
    return (
      '/api/operations/community?' +
      new URLSearchParams({
        format,
        section,
        q,
        scope,
        ...(selected.length ? { ids: selected.join(',') } : {}),
      }).toString()
    );
  }
  return (
    <div className="admin-space">
      <div className="page-heading">
        <p className="micro accent">BLUEFIN OPERATIONS</p>
        <h1>会员与邀请管理</h1>
        <p>三类报名信息统一管理，私人数据仅供授权管理员使用。</p>
        <Link className="text-link" href="/operations">
          原有线索与GEO后台 →
        </Link>
      </div>
      <div className="admin-stats">
        {Object.entries(sections).map(([k, s]) => (
          <div key={k}>
            <span>{s.name}</span>
            <strong>{rows.filter((r) => r.section === k).length}</strong>
            <small>已登记账号</small>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <div className="space-toolbar">
        <input
          aria-label="搜索报名资料"
          placeholder="搜索姓名、行业、城市"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSelected([]);
          }}
        />
        <select
          aria-label="筛选板块"
          value={section}
          onChange={(e) => {
            setSection(e.target.value);
            setSelected([]);
          }}
        >
          <option value="">全部板块</option>
          {Object.entries(sections).map(([k, s]) => (
            <option key={k} value={k}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          aria-label="导出字段范围"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        >
          <option value="private">完整资料（含私人字段）</option>
          <option value="public">展示卡片字段</option>
        </select>
        <a className="secondary-button" href={exportURL('xlsx')}>
          导出Excel
        </a>
        <a className="secondary-button" href={exportURL('md')}>
          导出Markdown
        </a>
      </div>
      <p className="quiet">
        {selected.length
          ? `导出选中的 ${selected.length} 位会员`
          : `导出当前筛选的 ${shown.length} 位会员`}{' '}
        · Excel按板块分工作表
      </p>
      <div className="table-scroll">
        <table className="members-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="选择当前所有会员"
                  checked={shown.length > 0 && selected.length === shown.length}
                  onChange={(e) =>
                    setSelected(e.target.checked ? shown.map((r) => r.id) : [])
                  }
                />
              </th>
              <th>姓名 / 昵称</th>
              <th>板块</th>
              <th>行业 / 城市</th>
              <th>电话</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={'选择' + r.answers.name}
                    checked={selected.includes(r.id)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, r.id]
                          : selected.filter((x) => x !== r.id),
                      )
                    }
                  />
                </td>
                <td>
                  <strong>{r.answers.name}</strong>
                  <small>{r.answers.displayName}</small>
                </td>
                <td>{sections[r.section].name}</td>
                <td>
                  {r.answers.industry}
                  <small>{r.answers.city}</small>
                </td>
                <td>{r.phone}</td>
                <td>{r.status === 'active' ? '正常' : '已停用'}</td>
                <td>
                  <button className="text-link" onClick={() => setDetail(r)}>
                    查看资料
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <p className="empty-state">
            还没有匹配的报名记录。通过邀请码完成首次加入后，会在这里出现。
          </p>
        )}
      </div>
      {detail && (
        <section className="admin-detail">
          <div className="report-heading">
            <h2>{detail.answers.name} · 完整资料</h2>
            <button
              className="secondary-button"
              onClick={() => setDetail(null)}
            >
              收起
            </button>
          </div>
          <dl>
            {[...commonFields, ...roleFields[detail.section]].map((f) => (
              <div key={f.key}>
                <dt>{f.label}</dt>
                <dd>
                  {Array.isArray(detail.answers[f.key])
                    ? (detail.answers[f.key] as string[]).join('、')
                    : detail.answers[f.key] || '未填写'}
                </dd>
              </div>
            ))}
          </dl>
          {detail.report && <pre>{detail.report}</pre>}
          {detail.attachment && (
            <a
              className="text-link"
              href={`/api/operations/community/attachment?id=${detail.id}`}
              target="_blank"
            >
              查看案例截图
            </a>
          )}
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() => {
              void mutate({
                action: 'status',
                id: detail.id,
                status: detail.status === 'active' ? 'suspended' : 'active',
              });
              setDetail(null);
            }}
          >
            {detail.status === 'active' ? '停用账号' : '恢复账号'}
          </button>
        </section>
      )}
      <section className="invite-manager">
        <h2>邀请码</h2>
        <p>
          按板块生成，默认30天有效、10次使用。邀请码只在生成时显示，请及时复制。
        </p>
        <div className="space-toolbar">
          <label>
            邀请备注
            <input value={label} onChange={(e) => setLabel(e.target.value)} />
          </label>
          <label>
            加入板块
            <select
              value={inviteSection}
              onChange={(e) => setInviteSection(e.target.value as Section)}
            >
              {Object.entries(sections).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <button
            disabled={busy}
            className="primary-button"
            onClick={() =>
              mutate({ action: 'invite', section: inviteSection, label })
            }
          >
            生成邀请码
          </button>
        </div>
        {code && (
          <output className="notice">
            新邀请码：<strong>{code}</strong>
          </output>
        )}
        <div className="table-scroll">
          <table className="members-table">
            <thead>
              <tr>
                <th>备注</th>
                <th>板块</th>
                <th>使用情况</th>
                <th>到期时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((i) => (
                <tr key={i.id}>
                  <td>{i.label}</td>
                  <td>{sections[i.section].name}</td>
                  <td>
                    {i.uses} / {i.max_uses}
                  </td>
                  <td>{new Date(i.expires).toLocaleDateString('zh-CN')}</td>
                  <td>
                    {i.disabled ? (
                      '已停用'
                    ) : (
                      <button
                        className="text-link"
                        disabled={busy}
                        onClick={() =>
                          mutate({ action: 'disableInvite', id: i.id })
                        }
                      >
                        停用邀请码
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
