import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { reports } from '@/lib/company';

export function ReportList({ slugs }: { slugs?: string[] }) {
  const items = slugs ? reports.filter((r) => slugs.includes(r.slug)) : reports;
  return (
    <div className="report-list">
      {items.map((r) => (
        <Link className="report-row" href={`/news/${r.slug}`} key={r.slug}>
          <div className="report-date">
            <time dateTime={r.date}>{r.date.replaceAll('-', '.')}</time>
            <span>{r.city}</span>
          </div>
          <div>
            <p className="micro accent">{r.source}</p>
            <h3>{r.title}</h3>
            <p>{r.role}</p>
          </div>
          <ArrowUpRight aria-hidden="true" size={24} />
        </Link>
      ))}
    </div>
  );
}
