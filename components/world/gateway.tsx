import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { sections } from '@/lib/community-fields';
export function Gateway() {
  return (
    <div className="gateway">
      <div className="gateway-title">
        <div>
          <p className="gateway-eyebrow">
            <span /> BLUEFIN · 一起探索 AI 的可能
          </p>
          <h1>
            每一种探索，
            <br />
            <span>都有同路人。</span>
          </h1>
        </div>
        <p>
          从第一次尝试 AI，到让它进入真实业务。
          <br />
          和一群同路人，把想法做成现实。
        </p>
        <div className="gateway-cta">
          <Link className="primary-button" href="/register">
            加入 AI 俱乐部 <ArrowUpRight size={18} />
          </Link>
          <Link className="guest-link" href="/guest">
            先以游客探索 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="portal-deck">
        <div className="portal-grid">
          {Object.entries(sections).map(([key, s], i) => (
            <Link
              href={`/community/${key}`}
              className={`portal-card portal-${key}`}
              key={key}
            >
              <div className="portal-card-top">
                <span className="portal-audience">
                  {['AI 爱好者', 'FDE 学习者与实践者', '企业负责人'][i]}
                </span>
                <span className="portal-corner-arrow">
                  <ArrowUpRight size={20} />
                </span>
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
                    [
                      'LEARN & CREATE',
                      'BUILD & DELIVER',
                      'CONNECT & TRANSFORM',
                    ][i]
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
