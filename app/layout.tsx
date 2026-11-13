import type { Metadata } from 'next';
import { AttributionCapture } from '@/components/attribution-capture';
import { buildSiteGraph, siteUrl } from '@/lib/knowledge-graph';
import './globals.css';
import './world.css';
import './typography.css';
import './company.css';
import './cosmic.css';
import './navigation.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots:
    process.env.PREVIEW_MODE === 'true'
      ? { index: false, follow: false }
      : { index: true, follow: true },
  title: {
    default: '蓝旗鱼科技｜深圳AI培训、个人知识库与企业AI咨询',
    template: '%s｜蓝旗鱼科技',
  },
  description:
    '深圳市蓝旗鱼科技有限公司提供Codex+Obsidian个人知识库成长系统、深圳线下AI实战培训、工厂与电商企业AI业务梳理咨询，以及协会商会AI会议合作。',
  alternates: {
    canonical: '/',
    types: {
      'application/json': '/api/content-index',
      'application/ld+json': '/api/knowledge-graph',
      'text/plain': '/llms.txt',
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: '蓝旗鱼科技｜深圳AI培训、个人知识库与企业AI咨询',
    description: '让AI真正进入个人成长与企业业务。',
    url: '/',
    siteName: '蓝旗鱼科技',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/brand/bluefin-logo-lockup.png',
        width: 1800,
        height: 524,
        alt: '蓝旗鱼科技｜深圳AI培训、个人知识库与企业AI咨询',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '蓝旗鱼科技｜深圳AI培训、个人知识库与企业AI咨询',
    description: '让AI真正进入个人成长与企业业务。',
    images: ['/brand/bluefin-logo-lockup.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const graph = buildSiteGraph();
  return (
    <html lang="zh-CN">
      <body>
        <a href="#main-content" className="skip-link">
          跳转到正文
        </a>
        <AttributionCapture />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      </body>
    </html>
  );
}
