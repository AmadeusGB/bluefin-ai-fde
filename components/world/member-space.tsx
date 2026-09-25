'use client';
import Image from 'next/image';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Download,
  ArrowUpRight,
  X,
  List,
  Orbit,
  LogOut,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { sections, type Section } from '@/lib/community-fields';
import activities from '@/lib/activity-data.json';
import { post } from './join-form';
type Card = {
  id: string;
  section: Section;
  display_name: string;
  city: string;
  industry: string;
  role: string;
  bio: string;
  is_demo: boolean;
};
type Self = Card & {
  answers: Record<string, string | string[]>;
  visible: boolean;
  report: string | null;
  attachment: boolean;
};
type Resource = { id: string; title: string; type: string; demo: boolean };
export function MemberSpace({
  initial,
  preview,
}: {
  initial: Self;
  preview: boolean;
}) {
  const [tab, setTab] = useState('members'),
    [members, setMembers] = useState<Card[]>([]),
    [resources, setResources] = useState<Resource[]>([]),
    [search, setSearch] = useState(''),
    [industry, setIndustry] = useState(''),
    [list, setList] = useState(false),
    [selected, setSelected] = useState<Card | null>(null),
    [me, setMe] = useState(initial),
    [error, setError] = useState(''),
    [loaded, setLoaded] = useState(false),
    [uploading, setUploading] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    router = useRouter();
  useEffect(() => {
    Promise.all([
      fetch('/api/community/members').then((r) => {
        if (!r.ok) throw new Error('会员资料加载失败，请刷新或重新登录');
        return r.json();
      }),
      fetch('/api/community/resources').then((r) => {
        if (!r.ok) throw new Error('资料加载失败');
        return r.json();
      }),
    ])
      .then(([m, r]) => {
        setMembers(m.members);
        setResources(r.resources);
        setLoaded(true);
      })
      .catch((e) => setError(e.message));
  }, []);
  const shown = members.filter(
    (m) =>
      (!industry || m.industry === industry) &&
      (!search ||
        [m.display_name, m.industry, m.city].some((x) => x.includes(search))),
  );
  return (
    <>
      <div className="member-heading">
        <div>
          <p className="micro accent">YOUR BLUEFIN SPACE</p>
          <h1>{sections[me.section].name}</h1>
          <p>你好，{me.display_name}。和同路人，一起向前。</p>
        </div>
        <button
          className="secondary-button"
          onClick={async () => {
            await post('logout', {});
            router.push('/login');
            router.refresh();
          }}
        >
          <LogOut size={16} />
          退出登录
        </button>
      </div>
      <nav className="member-tabs" aria-label="会员空间导航">
        {[
          ['members', '同路人'],
          ['events', '活动记忆'],
          ['resources', '学习与资料'],
          ...(me.section === 'enterprise' ? [['report', '我的AI诊断']] : []),
          ['profile', '我的资料'],
        ].map(([id, name]) => (
          <button
            className={tab === id ? 'active' : ''}
            onClick={() => setTab(id)}
            key={id}
          >
            {name}
          </button>
        ))}
      </nav>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {tab === 'members' && (
        <>
          <div className="space-toolbar">
            <label className="search-field">
              <Search size={17} />
              <input
                aria-label="搜索会员"
                placeholder="搜索昵称、行业或城市"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <select
              aria-label="筛选行业"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">全部行业</option>
              {[...new Set(members.map((m) => m.industry))].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <button className="secondary-button" onClick={() => setList(!list)}>
              {list ? <Orbit size={17} /> : <List size={17} />}{' '}
              {list ? '空间视图' : '列表视图'}
            </button>
          </div>
          {preview && (
            <p className="quiet">
              标有“演示”的成员是虚拟测试资料，不代表真实会员。头像暂用编号占位。
            </p>
          )}
          {!loaded && !error && (
            <p className="empty-state">正在连接你的会员空间…</p>
          )}
          {loaded && !shown.length && (
            <p className="empty-state">
              暂时没有匹配的会员。试试其他行业或关键词。
            </p>
          )}
          <div
            className={
              list || shown.length > 12 ? 'member-list' : 'member-universe'
            }
          >
            {!list && (
              <div className="universe-center" aria-hidden="true">
                <span>BLUEFIN</span>
                <p>CONNECTED BY CURIOSITY</p>
              </div>
            )}
            {shown.map((m, i) => (
              <button
                className="member-node"
                key={m.id}
                style={
                  {
                    '--i': i,
                    '--x': `${[13, 39, 71, 87, 24, 58, 78, 46, 10, 88, 35, 65][i % 12]}%`,
                    '--y': `${[25, 17, 24, 52, 70, 78, 75, 45, 48, 18, 61, 51][i % 12]}%`,
                    '--delay': `${-i * 0.7}s`,
                  } as CSSProperties
                }
                onClick={() => {
                  setSelected(m);
                  dialog.current?.showModal();
                }}
              >
                <span className={`member-avatar avatar-${i % 4}`}>
                  {m.is_demo
                    ? String(i + 1).padStart(2, '0')
                    : m.display_name.slice(0, 1)}
                </span>
                <span className="member-node-info">
                  <strong>{m.display_name}</strong>
                  <small>
                    {m.industry} · {m.city}
                  </small>
                  {m.is_demo && <em>演示</em>}
                </span>
              </button>
            ))}
          </div>
          <dialog ref={dialog} className="profile-dialog">
            <button
              className="dialog-close"
              aria-label="关闭会员资料"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
            {selected && (
              <>
                <span className="member-avatar large-avatar">
                  {selected.display_name.replace('演示·', '').slice(0, 1)}
                </span>
                <h2>{selected.display_name}</h2>
                <p>
                  {selected.role} · {selected.industry}
                </p>
                <p className="location">
                  <MapPin size={15} />
                  {selected.city}
                </p>
                <p>{selected.bio}</p>
                {selected.is_demo && (
                  <p className="notice">虚拟演示成员，仅用于功能与视觉测试。</p>
                )}
              </>
            )}
          </dialog>
        </>
      )}
      {tab === 'events' && (
        <div className="event-list">
          {activities.map((a) => (
            <Link key={a.id} href={`/events/${a.id}`} className="event-card">
              <Image src={a.cover} alt={a.title} width="800" height="600" />
              <div>
                <time>{a.date}</time>
                <h2>{a.title}</h2>
                <span>
                  打开相册 <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      {tab === 'resources' && (
        <>
          <div className="section-intro">
            <h2>把学习，带回你的现场。</h2>
            <p>对应板块的课件与案例资料。下载文件供学习使用。</p>
          </div>
          <div className="resource-list">
            {resources.map((r) => (
              <article key={r.id}>
                <span className="file-icon">
                  {r.type === 'PPTX' ? 'P' : 'M'}
                </span>
                <div>
                  <span className="micro">
                    {r.type}
                    {r.demo ? ' · 模拟案例' : ''}
                  </span>
                  <h3>{r.title}</h3>
                  <p>
                    {r.demo
                      ? '场景演示，非真实客户或交付结果。'
                      : '蓝旗鱼已有课程资料 · 会员学习使用'}
                  </p>
                </div>
                <a
                  href={`/api/community/download/${r.id}`}
                  className="secondary-button"
                >
                  <Download size={17} />
                  下载
                </a>
              </article>
            ))}
          </div>
        </>
      )}
      {tab === 'report' && (
        <>
          <div className="report-heading">
            <div>
              <h2>你的企业AI初步诊断</h2>
              <p>基于问卷的规则分析，随时下载留存。</p>
            </div>
            <a className="primary-button" download href="/api/community/report">
              <Download size={17} />
              下载MD报告
            </a>
          </div>
          <article className="report-body">
            {me.report
              ?.split('\n')
              .filter(Boolean)
              .map((l, i) =>
                l.startsWith('# ') ? (
                  <h2 key={i}>{l.slice(2)}</h2>
                ) : l.startsWith('## ') ? (
                  <h3 key={i}>{l.slice(3)}</h3>
                ) : (
                  <p key={i}>{l.replace(/^> /, '')}</p>
                ),
              )}
          </article>
        </>
      )}
      {tab === 'profile' && (
        <div className="profile-settings">
          <h2>资料由你掌控。</h2>
          <p>
            详细报名信息仅本人和管理员可见。会员空间仅展示昵称、行业、城市与身份。
          </p>
          <label className="check-line">
            <input
              type="checkbox"
              checked={me.visible}
              onChange={async (e) => {
                const visible = e.target.checked;
                try {
                  await post('profile', { visible });
                  setMe({ ...me, visible });
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            />
            在所属板块会员空间展示我的卡片
          </label>
          <div className="profile-preview">
            <span className="member-avatar">{me.display_name.slice(0, 1)}</span>
            <div>
              <h3>{me.display_name}</h3>
              <p>
                {me.industry} · {me.city}
              </p>
              <span>{me.role}</span>
            </div>
          </div>
          <p className="quiet">
            更正报名资料、账号恢复或删除请求，请联系蓝旗鱼团队。
          </p>
          {me.section === 'fde' && (
            <>
              <h3>过往案例截图</h3>
              <p>PNG / JPEG，最大5MB，仅本人及管理员可见。</p>
              <input
                aria-label="上传案例截图"
                type="file"
                accept="image/png,image/jpeg"
                disabled={uploading}
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setUploading(true);
                  setError('');
                  try {
                    const form = new FormData();
                    form.set('file', f);
                    const r = await fetch('/api/community/upload', {
                        method: 'POST',
                        body: form,
                      }),
                      d = await r.json();
                    if (!r.ok) throw new Error(d.error);
                    setMe({ ...me, attachment: true });
                  } catch (err) {
                    setError((err as Error).message);
                  } finally {
                    setUploading(false);
                  }
                }}
              />
              {uploading && <output>正在上传…</output>}
              {me.attachment && (
                <a
                  className="text-link"
                  href="/api/community/attachment"
                  target="_blank"
                >
                  查看已上传截图 <ArrowUpRight size={16} />
                </a>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
