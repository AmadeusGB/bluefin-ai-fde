import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, ArrowLeft } from 'lucide-react';
import { company } from '@/lib/company';
import { MarlinMark } from './marlin-mark';
export function WorldHeader({ immersive = false }: { immersive?: boolean }) {
  const links = [
    ['企业服务', '/services'],
    ['关于蓝旗鱼', '/about'],
    ['创始团队', '/founders'],
    ['知识库', '/knowledge'],
  ];
  return (
    <header className="world-header site-navigation">
      <Link
        href="/world"
        className={immersive ? 'cosmic-brand' : 'brand-logo'}
        aria-label="蓝旗鱼科技，返回AI世界"
      >
        {immersive ? (
          <>
            <MarlinMark />
            <span>蓝旗鱼科技</span>
          </>
        ) : (
          <Image
            src="/world/logo.png"
            alt="蓝旗鱼AI · 探索 · 实践 · 共创"
            width={500}
            height={205}
            priority
          />
        )}
      </Link>
      <nav className="desktop-nav">
        {links.map(([title, url]) => (
          <Link key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <div className="header-account-actions">
        <Link className="header-register" href="/register">
          注册
        </Link>
        <Link className="header-login" href="/members">
          会员空间 <ArrowUpRight size={15} />
        </Link>
      </div>
      <details className="mobile-nav">
        <summary aria-label="打开导航">
          <Menu size={21} />
        </summary>
        <nav>
          {links.map(([title, url]) => (
            <Link key={url} href={url}>
              {title}
            </Link>
          ))}
          <Link href="/world">三大社群</Link>
          <Link href="/register">注册账号</Link>
          <Link href="/guest">游客访问</Link>
          <Link href="/contact">联系我们</Link>
        </nav>
      </details>
    </header>
  );
}
export function WorldFooter() {
  return (
    <footer className="world-footer">
      <span>© 2026 深圳市蓝旗鱼科技有限公司</span>
      <div className="footer-contact">
        <span>深圳 · 北京｜企业AI内训 · FDE</span>
        <a href={`tel:${company.phone}`}>{company.phone}</a>
      </div>
      <nav>
        <Link href="/contact">联系我们</Link>
        <Link href="/events">往期活动</Link>
        <Link href="/evidence/cases">项目摘要</Link>
        <Link href="/privacy">隐私说明</Link>
        <Link href="/editorial-policy">内容政策</Link>
      </nav>
    </footer>
  );
}
export function WorldBackLink() {
  return (
    <Link className="back-link" href="/world">
      <ArrowLeft size={20} /> 返回AI世界
    </Link>
  );
}

export function WorldShell({
  children,
  back = true,
  variant = 'default',
}: {
  children: React.ReactNode;
  back?: boolean;
  variant?: 'default' | 'soft' | 'members';
}) {
  return (
    <div
      className={`world-page${variant === 'soft' ? ' soft-world cosmic-shell' : variant === 'members' ? ' cosmic-members cosmic-shell' : ''}`}
    >
      <WorldHeader immersive={variant !== 'default'} />
      <main id="main-content" className="world-main">
        {back && <WorldBackLink />}
        {children}
      </main>
      <WorldFooter />
    </div>
  );
}
