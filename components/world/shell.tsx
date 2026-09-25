import Link from 'next/link';
import { ArrowUpRight, Menu, ArrowLeft } from 'lucide-react';
export function WorldHeader() {
  const links = [
    ['企业服务', '/services'],
    ['关于蓝旗鱼', '/about'],
    ['创始团队', '/founders'],
    ['知识库', '/knowledge'],
  ];
  return (
    <header className="world-header">
      <Link href="/world" className="brand-word">
        <span className="brand-fin">↗</span>
        <span>
          蓝旗鱼科技<small>BLUEFIN TECHNOLOGY</small>
        </span>
      </Link>
      <nav className="desktop-nav">
        {links.map(([title, url]) => (
          <Link key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <Link className="header-login" href="/members">
        会员空间 <ArrowUpRight size={15} />
      </Link>
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
        </nav>
      </details>
    </header>
  );
}
export function WorldFooter() {
  return (
    <footer className="world-footer">
      <span>© 2026 深圳市蓝旗鱼科技有限公司</span>
      <span>企业AI内训 · 企业AI方案落地（FDE）</span>
      <nav>
        <Link href="/events">往期活动</Link>
        <Link href="/privacy">隐私说明</Link>
        <Link href="/editorial-policy">内容政策</Link>
      </nav>
    </footer>
  );
}
export function WorldShell({
  children,
  back = true,
}: {
  children: React.ReactNode;
  back?: boolean;
}) {
  return (
    <div className="world-page">
      <WorldHeader />
      <main id="main-content" className="world-main">
        {back && (
          <Link className="back-link" href="/world">
            <ArrowLeft size={15} /> 返回AI世界
          </Link>
        )}
        {children}
      </main>
      <WorldFooter />
    </div>
  );
}
