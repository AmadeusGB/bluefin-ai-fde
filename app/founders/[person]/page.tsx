import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
import { ReportList } from '@/components/world/report-list';
import { founders } from '@/lib/company';
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl(`/founders/${person}#person`),
    name: p.name,
    ...(p.alias ? { alternateName: p.alias } : {}),
    jobTitle: p.role.split(' · ')[0],
    description: p.bio,
    image: absoluteUrl(p.image),
    url: absoluteUrl(`/founders/${person}`),
    worksFor: { '@id': organizationId },
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
