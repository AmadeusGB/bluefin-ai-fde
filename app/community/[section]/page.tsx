import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { sections, isSection } from '@/lib/community-fields';
import activities from '@/lib/activity-data.json';
export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return isSection(section)
    ? {
        title: sections[section].name,
        description: sections[section].intro,
        alternates: { canonical: `/community/${section}` },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const s = sections[section];
  const album = activities[section === 'club' ? 0 : section === 'fde' ? 1 : 2];
  return (
    <WorldShell>
      <div className="community-hero">
        <div>
          <p className="micro accent">{s.en}</p>
          <h1>{s.name}</h1>
          <h2>{s.line}</h2>
          <p className="intro">{s.intro}</p>
          <div className="button-row">
            <Link href={`/join?section=${section}`} className="primary-button">
              凭邀请码加入 <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="text-link">
              已经加入？登录
            </Link>
          </div>
          <p className="quiet">
            加入后可访问会员空间、活动相册和对应板块资料。
          </p>
        </div>
        <div
          className={`community-art portal-object object-${section}`}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
          <b />
        </div>
      </div>
      <div className="benefit-row">
        {s.features.map((x, i) => (
          <div key={x}>
            <span className="micro">{['CONNECT', 'PRACTICE', 'GROW'][i]}</span>
            <h3>
              <Check size={20} />
              {x}
            </h3>
          </div>
        ))}
      </div>
      <div className="editorial-split">
        <Image
          src={album.cover}
          alt={album.title + '现场'}
          width="900"
          height="600"
        />
        <div>
          <p className="micro accent">OFFLINE, TOGETHER</p>
          <h2>
            在真实的交流中，
            <br />
            找到下一步。
          </h2>
          <p>看看已经发生的学习与交流，发现更多学习与实践的机会。</p>
          <Link className="text-link" href={`/events/${album.id}`}>
            查看这期活动 <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="faq-block">
        <h2>加入前，你可能想了解</h2>
        <details>
          <summary>适合什么样的人？</summary>
          <p>{s.intro}</p>
        </details>
        <details>
          <summary>为什么需要邀请码？</summary>
          <p>
            邀请码用于确认加入的板块与来源。填写资料后可以进入对应会员空间。请向蓝旗鱼团队或活动组织者获取邀请码。
          </p>
        </details>
        <details>
          <summary>提交的资料都会公开吗？</summary>
          <p>
            不会。电话、企业经营信息、项目意向与诊断报告仅本人和管理员可见。你可以自主选择是否在会员空间展示昵称、行业、城市和身份。
          </p>
        </details>
        {section === 'fde' && (
          <details>
            <summary>加入后会保证派单吗？</summary>
            <p>
              不会。派单意向用于后续匹配，实际合作需结合能力、项目需求、时间与双方约定另行确认。
            </p>
          </details>
        )}
      </div>
    </WorldShell>
  );
}
