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
  avatar_url?: string | null;
};
function MemberAvatar({
  card,
  className = '',
}: {
  card: Card;
  className?: string;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  return (
    <span className={`member-avatar ${className}`}>
      {card.avatar_url && failedUrl !== card.avatar_url ? (
        <Image
          src={card.avatar_url}
          alt={`${card.display_name}的头像`}
          width={320}
          height={320}
          unoptimized
          onError={() => setFailedUrl(card.avatar_url || null)}
        />
      ) : (
        card.display_name.replace('演示·', '').slice(0, 1)
      )}
    </span>
  );
}
type Self = Card & {
  answers: Record<string, string | string[]>;
  visible: boolean;
  report: string | null;
  attachment: boolean;
};
type Resource = { id: string; title: string; type: string; demo: boolean };
function cardSummary(card: Card) {
  return (
    [card.industry, card.city]
      .filter((value) => value && !value.endsWith('待补充'))
      .join(' · ') || '基本资料待补充'
  );
}
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
  const [page, setPage] = useState(0);
  const [basic, setBasic] = useState({
    name: String(initial.answers.name || ''),
    displayName: String(initial.answers.displayName || ''),
    city: String(initial.answers.city || ''),
    industry: String(initial.answers.industry || ''),
  });
  const [saving, setSaving] = useState(false),
    [saved, setSaved] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''),
    [newPassword, setNewPassword] = useState('');
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
  const pageSize = list ? 24 : 12;
  const pageCount = Math.max(1, Math.ceil(shown.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageMembers = shown.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
            </label>
            <select
              aria-label="筛选行业"
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setPage(0);
              }}
            >
              <option value="">全部行业</option>
              {[...new Set(members.map((m) => m.industry))].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <button
              className="secondary-button"
              onClick={() => {
                setList(!list);
                setPage(0);
              }}
            >
              {list ? <Orbit size={17} /> : <List size={17} />}{' '}
              {list ? '空间视图' : '列表视图'}
            </button>
          </div>
          {preview && members.some((m) => m.is_demo) && (
            <p className="quiet">
              标有“演示”的成员是虚拟测试资料，不代表真实会员。头像暂用编号占位。
            </p>
          )}
          {loaded && (
            <p className="quiet" aria-live="polite">
              找到 {shown.length} 位会员 · 行业与城市由已有资料整理。
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
          <div className={list ? 'member-list' : 'member-universe'}>
            {!list && (
              <div className="universe-center" aria-hidden="true">
                <span>BLUEFIN</span>
                <p>CONNECTED BY CURIOSITY</p>
              </div>
            )}
            {pageMembers.map((m, i) => (
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
                <MemberAvatar card={m} className={`avatar-${i % 4}`} />
                <span className="member-node-info">
                  <strong>{m.display_name}</strong>
                  <small>{cardSummary(m)}</small>
                  {m.is_demo && <em>演示</em>}
                </span>
              </button>
            ))}
          </div>
          {loaded && pageCount > 1 && (
            <nav
              className="space-toolbar member-pagination"
              aria-label="会员名录翻页"
            >
              <button
                className="secondary-button"
                disabled={currentPage === 0}
                onClick={() => setPage(currentPage - 1)}
              >
                上一页
              </button>
              <span aria-live="polite">
                第 {currentPage + 1} / {pageCount} 页
              </span>
              <button
                className="secondary-button"
                disabled={currentPage + 1 >= pageCount}
                onClick={() => setPage(currentPage + 1)}
              >
                下一页
              </button>
            </nav>
          )}
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
                <MemberAvatar card={selected} className="large-avatar" />
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
            基本资料只需姓名／昵称、手机号、行业和城市。手机号仅本人和管理员可见。
          </p>
          <form
            className="member-basic-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setSaved('');
              setError('');
              try {
                await post('profile', { basic });
                const response = await fetch('/api/community/me');
                if (!response.ok) throw new Error('资料已保存，请刷新查看');
                const { member } = await response.json();
                setMe(member);
                setMembers((rows) =>
                  rows.map((m) => (m.id === member.id ? member : m)),
                );
                setSaved('基本资料已保存');
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setSaving(false);
              }
            }}
          >
            {(
              [
                ['name', '姓名或昵称'],
                ['displayName', '展示昵称（选填）'],
                ['industry', '行业（选填）'],
                ['city', '城市（选填）'],
              ] as const
            ).map(([key, label]) => (
              <label className="question" key={key}>
                {label}
                <input
                  required={key === 'name'}
                  maxLength={120}
                  value={basic[key]}
                  onChange={(e) =>
                    setBasic({ ...basic, [key]: e.target.value })
                  }
                />
              </label>
            ))}
            <p className="quiet">
              手机号：{String(me.answers.phone || '未填写')}
              。更换手机号请联系管理员。
            </p>
            <button className="primary-button" disabled={saving}>
              保存基本资料
            </button>
          </form>
          {saved && <output>{saved}</output>}
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
            <MemberAvatar card={me} />
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
          <form
            className="member-basic-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setSaved('');
              setError('');
              try {
                await post('password', { currentPassword, newPassword });
                setCurrentPassword('');
                setNewPassword('');
                setSaved('密码已更新');
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setSaving(false);
              }
            }}
          >
            <h3>修改密码</h3>
            <label className="question">
              当前密码
              <input
                required
                type="password"
                autoComplete="current-password"
                maxLength={128}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label className="question">
              新密码
              <input
                required
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                placeholder="至少8个字符"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button className="secondary-button" disabled={saving}>
              更新密码
            </button>
          </form>
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
