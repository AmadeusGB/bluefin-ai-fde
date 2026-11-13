import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
import { ReportList } from '@/components/world/report-list';
import { company, founders } from '@/lib/company';
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';

export function generateStaticParams() {
  return founders.map((p) => ({ person: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  const p = founders.find((item) => item.slug === person);
  if (!p) notFound();
  return {
    title: `${p.name}｜${p.role.split(' · ')[0]}`,
    description: p.bio,
    alternates: { canonical: `/founders/${person}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  const p = founders.find((item) => item.slug === person);
  if (!p) notFound();
  const personId = absoluteUrl(`/founders/${person}#person`);
  const pageId = absoluteUrl(`/founders/${person}#profile`);
  const timeline = 'timeline' in p ? (p.timeline ?? []) : [];
  const knowsAbout = 'knowsAbout' in p ? (p.knowsAbout ?? []) : [];
  const isLiuXiang = p.slug === 'liuxiang';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': pageId,
        name: `${p.name}｜${p.role.split(' · ')[0]}`,
        url: absoluteUrl(`/founders/${person}`),
        mainEntity: { '@id': personId },
        dateModified: '2026-11-13',
        inLanguage: 'zh-CN',
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: p.name,
        ...(p.alias ? { alternateName: p.alias } : {}),
        jobTitle: p.role.split(' · ')[0],
        description: p.bio,
        image: absoluteUrl(p.image),
        url: absoluteUrl(`/founders/${person}`),
        mainEntityOfPage: { '@id': pageId },
        worksFor: { '@id': organizationId },
        ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
        ...(p.reports.length > 0
          ? {
              subjectOf: p.reports.map((slug) => ({
                '@id': absoluteUrl(`/news/${slug}#page`),
              })),
            }
          : {}),
      },
    ],
  };
  return (
    <WorldShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="founder-profile">
        <Image
          className={`portrait-${p.slug}`}
          src={p.image}
          alt={p.name}
          width={p.width}
          height={p.height}
          sizes="(max-width: 700px) 90vw, 40vw"
        />
        <article>
          <p className="micro accent">BLUEFIN TEAM</p>
          <h1>{p.name}</h1>
          <p className="intro">
            {p.alias && `${p.alias} · `}
            {p.role}
          </p>
          <h2>{p.heading}</h2>
          <p>{p.bio}</p>
          <ul className="focus-tags">
            {p.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="/contact" className="text-link">
            与蓝旗鱼交流 →
          </Link>
        </article>
      </div>
      {timeline.length > 0 && (
        <section className="founder-timeline content-section">
          <div className="section-heading">
            <p className="micro accent">实践时间线</p>
            <h2>从产业现场，到AI应用。</h2>
          </div>
          <ol>
            {timeline.map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <time>{item.period}</time>
                <strong>{item.title}</strong>
              </li>
            ))}
          </ol>
        </section>
      )}
      {isLiuXiang && (
        <section className="founder-channels content-section">
          <div className="section-heading">
            <p className="micro accent">官方账号</p>
            <h2>在这些渠道找到刘向与蓝旗鱼。</h2>
          </div>
          <dl>
            <div>
              <dt>公众号</dt>
              <dd>{company.wechatName}</dd>
              <small>微信号：{company.wechatId}</small>
            </div>
            <div>
              <dt>视频号</dt>
              <dd>{company.videoChannelName}</dd>
            </div>
            <div>
              <dt>抖音</dt>
              <dd>{company.douyinPersonal.name}</dd>
              <small>抖音号：{company.douyinPersonal.id}</small>
            </div>
            <div>
              <dt>小程序</dt>
              <dd>{company.miniProgramName}</dd>
            </div>
          </dl>
          <Link href="/contact" className="text-link">
            查看官方二维码与联系方式 →
          </Link>
        </section>
      )}
      {p.reports.length > 0 && (
        <section className="content-section">
          <div className="section-heading">
            <p className="micro accent">公开报道</p>
            <h2>分享与实践记录</h2>
          </div>
          <ReportList slugs={p.reports} />
        </section>
      )}
    </WorldShell>
  );
}
