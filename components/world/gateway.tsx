import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { sections } from '@/lib/community-fields';
export function Gateway() {
  return (
    <div className="gateway">
      <div className="gateway-title">
        <div>
          <p className="micro accent">WELCOME TO BLUEFIN</p>
          <h1>
            每一种探索，
            <br />
            <span>都有同路人。</span>
          </h1>
        </div>
        <p>
          从学习AI，到交付价值。
          <br />
          找到属于你的入口，
          <br />
          一起把可能变成现实。
        </p>
      </div>
      <div className="portal-grid">
        {Object.entries(sections).map(([key, s], i) => (
          <Link
            href={`/community/${key}`}
            className={`portal-card portal-${key}`}
            key={key}
          >
            <div className="portal-card-top">
              <span className="micro">{s.en}</span>
              <ArrowUpRight size={20} />
            </div>
            <div className={`portal-object object-${key}`} aria-hidden="true">
              {key === 'club' ? (
                <>
                  <i />
                  <i />
                  <i />
                  <b />
                </>
              ) : key === 'fde' ? (
                <>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </>
              ) : (
                <>
                  <i />
                  <i />
                  <i />
                  <i />
                </>
              )}
            </div>
            <div className="portal-card-copy">
              <span className="portal-index">
                {
                  ['LEARN & CREATE', 'BUILD & DELIVER', 'CONNECT & TRANSFORM'][
                    i
                  ]
                }
              </span>
              <h2>{s.name}</h2>
              <p>{s.line}</p>
              <span className="portal-action">
                进入探索 <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="gateway-service">
        <span className="status-dot" />
        <p>
          为企业而来？<strong>从内训到FDE，让AI进入业务现场。</strong>
        </p>
        <Link href="/services">
          了解企业服务 <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
