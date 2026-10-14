import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { sections } from '@/lib/community-fields';
import { MarlinMark } from './marlin-mark';
import { PortalTilt } from './portal-tilt';

export function Gateway() {
  return (
    <div className="gateway">
      <section className="gateway-hero" aria-labelledby="world-title">
        <Image
          className="gateway-ocean"
          src="/world/ocean-night.webp"
          alt=""
          width={1920}
          height={640}
          priority
          sizes="100vw"
        />
        <div className="gateway-title">
          <p className="gateway-eyebrow">人 × AI × 更大的可能</p>
          <h1 id="world-title">
            每一种探索，
            <br />
            <span>都有同路人。</span>
          </h1>
          <p>从学习 AI，到交付真实价值。</p>
          <Link href="/guest" className="guest-link">
            先以游客探索 <ArrowRight size={18} />
          </Link>
        </div>
        <div className="gateway-marlin">
          <MarlinMark priority />
        </div>
      </section>
      <div className="portal-grid">
        {Object.entries(sections).map(([key, s], i) => (
          <PortalTilt
            href={`/community/${key}`}
            className={`portal-card portal-${key}`}
            key={key}
          >
            <div className="portal-card-top">
              <h2>{s.name}</h2>
              <p>
                {
                  [
                    '探索 · 学习 · 共创',
                    '实战 · 协作 · 交付',
                    '连接 · 转型 · 增长',
                  ][i]
                }
              </p>
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
              <p>
                {
                  [
                    '和一群热爱 AI 的人，一起讨论、实践、共同成长。',
                    '连接开发者与真实业务场景，把 AI 能力变成生产力。',
                    '与有远见的企业家同行，共探 AI 驱动的增长。',
                  ][i]
                }
              </p>
              <div className="portal-action-row">
                <span className="portal-action">立即进入</span>
                <span className="portal-corner-arrow">
                  <ArrowRight size={22} />
                </span>
              </div>
            </div>
          </PortalTilt>
        ))}
      </div>
      <div className="gateway-service">
        <p>企业 AI 内训与方案落地，让 AI 进入业务现场。</p>
        <Link href="/services">
          了解企业服务 <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
