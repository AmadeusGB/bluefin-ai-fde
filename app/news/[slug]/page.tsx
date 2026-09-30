import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { reports } from '@/lib/company';
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = reports.find((r) => r.slug === slug);
  if (!report) notFound();
  return {
    title: report.title,
    description: report.summary,
    alternates: { canonical: `/news/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = reports.find((r) => r.slug === slug);
  if (!r) notFound();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: r.title,
    description: r.summary,
    url: absoluteUrl(`/news/${slug}`),
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
    inLanguage: 'zh-CN',
    citation: {
      '@type': 'Article',
      headline: r.sourceTitle,
      url: r.url,
      datePublished: r.published,
      publisher: { '@type': 'Organization', name: r.source },
    },
  };
  return (
    <WorldShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="page-heading">
        <p className="micro accent">公开报道 · {r.city}</p>
        <h1>{r.title}</h1>
        <p className="intro">{r.summary}</p>
      </div>
      <dl className="company-facts report-facts">
        <div>
          <dt>活动日期</dt>
          <dd>
            <time dateTime={r.date}>{r.date}</time>
          </dd>
        </div>
        <div>
          <dt>活动地点</dt>
          <dd>{r.place}</dd>
        </div>
        <div>
          <dt>蓝旗鱼参与</dt>
          <dd>{r.role}</dd>
        </div>
        <div>
          <dt>分享主题</dt>
          <dd>{r.topic}</dd>
        </div>
      </dl>
      <article className="public-reading report-reading">
        <h2>从业务出发，交流AI实践。</h2>
        <p>
          {r.slug === 'agic-2026'
            ? '本次分享围绕企业知识治理、组织管理与决策支持，讨论AI如何进入企业真实场景。'
            : '本次课程由开平市青年企业家联合会主办，蓝旗鱼科技参与协办。刘向与郭斌共同授课，将企业经营视角与技术实施视角带到课堂。'}
        </p>
        <h2>报道来源</h2>
        <p>
          {r.source} · <time dateTime={r.published}>{r.published}</time>发布
        </p>
        <a
          className="source-link"
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {r.sourceTitle} <ArrowUpRight size={18} />
        </a>
        <p className="quiet">
          本页为蓝旗鱼科技依据公开报道整理的活动摘要。完整内容请阅读发布方原文。
        </p>
        <div className="auth-links">
          <Link href="/founders">认识讲师团队 →</Link>
          <Link href="/training">了解企业内训 →</Link>
          <Link href="/events">更多活动 →</Link>
        </div>
      </article>
    </WorldShell>
  );
}
