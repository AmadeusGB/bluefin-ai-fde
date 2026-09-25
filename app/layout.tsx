import type { Metadata } from 'next';
import { AttributionCapture } from '@/components/attribution-capture';
import { buildSiteGraph, siteUrl } from '@/lib/knowledge-graph';
import './globals.css';
import './world.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: process.env.PREVIEW_MODE === 'true' ? {index:false,follow:false} : {index:true,follow:true},
  title: {
    default: '蓝旗鱼科技｜企业AI内训与AI方案落地',
    template: '%s｜蓝旗鱼科技',
  },
  description:
    '蓝旗鱼科技专注企业AI内训与企业AI方案落地（FDE），连接AI爱好者、FDE实践者与企业负责人。',
  alternates: {
    canonical: '/',
    types: {
      'application/json': '/api/content-index',
      'application/ld+json': '/api/knowledge-graph',
      'text/plain': '/llms.txt',
    },
  },
  openGraph: {
    title: '蓝旗鱼科技｜企业AI内训与AI方案落地',
    description: '让 AI 在真实业务里产生结果。',
    url: '/',
    siteName: '蓝旗鱼科技',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1536,
        height: 1024,
        alt: '蓝旗鱼科技｜企业AI内训与AI方案落地',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '蓝旗鱼科技｜企业AI内训与AI方案落地',
    description: '让 AI 在真实业务里产生结果。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const graph = buildSiteGraph();
  return (
    <html lang="zh-CN">
      <body>
        <a href="#main-content" className="skip-link">跳转到正文</a>
        {process.env.PREVIEW_MODE === "true" && <div className="preview-strip">蓝旗鱼 · 新版体验站 <span>部分成员与案例为演示数据</span></div>}
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
