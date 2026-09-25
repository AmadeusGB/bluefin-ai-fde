import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import activities from '@/lib/activity-data.json';
import { ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: '往期活动',
  alternates: { canonical: '/events' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">MOMENTS THAT CONNECT US</p>
        <h1>学习发生在现场。</h1>
        <p className="intro">从课堂到沙龙，每一次相聚都是实践的开始。</p>
      </div>
      <div className="event-list">
        {activities.map((a, i) => (
          <Link className="event-card" href={`/events/${a.id}`} key={a.id}>
            <Image
              src={a.cover}
              alt={a.title}
              width="1000"
              height="700"
              loading={i ? 'lazy' : 'eager'}
            />
            <div>
              <time>{a.date}</time>
              <h2>{a.title}</h2>
              <span>
                查看活动回顾 <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </WorldShell>
  );
}
