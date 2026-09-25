import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
import { Gallery } from '@/components/world/gallery';
import activities from '@/lib/activity-data.json';
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
    title: a?.title || '活动',
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
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">{a.date} · 蓝旗鱼活动记录</p>
        <h1>{a.title}</h1>
        <p className="intro">
          {id === 'salon-0919'
            ? '线下分享、操作演示与小组交流，在面对面的讨论中连接不同领域的伙伴。'
            : id === 'advanced-0913'
              ? '围绕AI应用进行进阶学习，现场记录了讲师分享、智能体主题讲解和课程交流。'
              : '从课堂讲解到电脑实操，在具体练习中了解AI工具的应用。'}
        </p>
        <p className="quiet">根据现有活动照片整理；详细课程复盘后续补充。</p>
      </div>
      <Gallery photos={a.photos} />
    </WorldShell>
  );
}
