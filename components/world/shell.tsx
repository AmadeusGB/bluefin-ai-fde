import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, ArrowLeft } from 'lucide-react';
import { company } from '@/lib/company';
export function WorldHeader({ immersive = false }: { immersive?: boolean }) {
  const links = [
    ['服务总览', '/services'],
    ['个人知识库', '/services/personal-knowledge'],
    ['深圳培训', '/training'],
    ['企业咨询', '/services#enterprise-consulting'],
    ['会议合作', '/partners'],
  ];
  return (
    <header className="world-header site-navigation">
      <Link
        href="/"
        className={immersive ? 'cosmic-brand' : 'brand-logo'}
        aria-label="蓝旗鱼科技，返回首页"
      >
        {immersive ? (
          <Image
            className="official-brand-lockup"
            src="/brand/bluefin-logo-lockup.png"
            alt="蓝旗鱼AI · 探索 · 实践 · 共创"
            width={1800}
            height={524}
            priority
          />
        ) : (
          <Image
            src="/brand/bluefin-logo-lockup.png"
            alt="蓝旗鱼AI · 探索 · 实践 · 共创"
            width={1800}
            height={524}
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
        <Link className="header-login" href="/contact">
          预约咨询 <ArrowUpRight size={15} />
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
          <Link href="/">首页</Link>
          <Link href="/events">活动与报道</Link>
          <Link href="/founders">创始团队</Link>
          <Link href="/knowledge">知识库</Link>
          <Link href="/answers">常见问题</Link>
          <Link href="/about">关于蓝旗鱼</Link>
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
        <span>
          深圳办公 · 服务大湾区及北京｜个人成长 · 线下培训 · 企业咨询 · 会议合作
        </span>
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
    <Link className="back-link" href="/">
      <ArrowLeft size={20} /> 返回蓝旗鱼首页
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
