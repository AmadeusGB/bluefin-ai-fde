import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ReportList } from '@/components/world/report-list';
import { founders } from '@/lib/company';
import { ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: '创始团队',
  description:
    '认识蓝旗鱼科技的刘向、郭斌与邹英鹏，连接企业经营、技术实施与商务实践。',
  alternates: { canonical: '/founders' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">THE PEOPLE BEHIND BLUEFIN</p>
        <h1>
          在一线，
          <br />
          一起把事情做成。
        </h1>
        <p className="intro">连接企业经营经验与技术实践。</p>
      </div>
      <div className="founder-grid">
        {founders.map((p) => (
          <Link
            href={`/founders/${p.slug}`}
            className="founder-card"
            key={p.slug}
          >
            <Image
              className={`portrait-${p.slug}`}
              src={p.image}
              alt={`${p.name}，${p.role}`}
              width={p.width}
              height={p.height}
              sizes="(max-width: 700px) 90vw, 30vw"
            />
            <div>
              <span>{p.role}</span>
              <h2>
                {p.name} {p.alias && <small>{p.alias}</small>}
                <ArrowUpRight />
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <section className="content-section">
        <div className="section-heading">
          <h2>把实践带到现场。</h2>
        </div>
        <ReportList />
      </section>
    </WorldShell>
  );
}
