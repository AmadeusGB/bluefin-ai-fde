import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
import { Gallery } from '@/components/world/gallery';
import activities from '@/lib/activity-data.json';
import Link from 'next/link';
import { activityRecaps } from '@/lib/public-copy';
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';
export function generateStaticParams() {
  return activities.map((a) => ({ id: a.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params,
    a = activities.find((a) => a.id === id);
  return {
    title: activityRecaps[id]?.title || a?.title || '活动',
    description: activityRecaps[id]?.summary || a?.summary,
    alternates: { canonical: `/events/${id}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params,
    a = activities.find((a) => a.id === id);
  if (!a) notFound();
  const recap = activityRecaps[id] ?? {
    title: a.title + '回顾',
    summary: a.summary,
    observed: [a.summary],
    takeaway:
      '从现场学习走向工作应用，可以先选择一个真实任务，明确输入资料、输出要求与人工检查方法，再逐步完善自己的实践。',
    related: '/training',
  };
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: recap.title,
    description: recap.summary,
    url: absoluteUrl(`/events/${id}`),
    image: a.photos.map((p) => absoluteUrl(p.path)),
    author: {
      '@type': 'Organization',
      '@id': organizationId,
      name: '蓝旗鱼科技',
    },
    publisher: { '@id': organizationId },
    inLanguage: 'zh-CN',
    dateModified: a.updated_at,
  };
  return (
    <WorldShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="page-heading">
        <p className="micro accent">{a.date_label} · 蓝旗鱼活动记录</p>
        <h1>{recap.title}</h1>
        <p className="intro">{recap.summary}</p>
        <p className="quiet">
          蓝旗鱼科技整理 · 更新于{a.updated_at} · {a.date_source}
        </p>
      </div>
      <article className="public-reading">
        <h2>现场记录了什么？</h2>
        <ul>
          {recap.observed.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>延伸学习与实践建议</h2>
        <p>{recap.takeaway}</p>
        <p className="quiet">本篇依据现场影像整理，记录当期学习与交流。</p>
        <div className="auth-links">
          <Link href={recap.related}>了解相关课程与实践 →</Link>
          <Link href="/guest">浏览更多活动 →</Link>
        </div>
      </article>
      <h2 className="album-heading">现场照片</h2>
      <Gallery photos={a.photos} />
    </WorldShell>
  );
}
