import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bluefin-ai.cn'),
  title: { default: '蓝旗鱼 AI｜企业 AI 落地与 FDE', template: '%s｜蓝旗鱼 AI' },
  description: '蓝旗鱼 AI 是面向中国企业的 FDE 落地团队：进入真实业务现场，用真实数据完成最小可行部署。',
  alternates: { canonical: '/' },
  openGraph: { title:'蓝旗鱼 AI｜企业 AI 落地 · FDE', description:'让 AI 在真实业务里产生结果。', url:'/', siteName:'蓝旗鱼 AI', locale:'zh_CN', type:'website', images:[{url:'/og.png',width:1536,height:1024,alt:'蓝旗鱼 AI｜企业 AI 落地 · FDE'}] },
  twitter: { card:'summary_large_image', title:'蓝旗鱼 AI｜企业 AI 落地 · FDE', description:'让 AI 在真实业务里产生结果。', images:['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization={ '@context':'https://schema.org','@type':'Organization',name:'蓝旗鱼 AI',url:'https://bluefin-ai.cn',description:'面向中国企业的 Forward Deployed Engineering 落地团队',knowsAbout:['企业 AI 落地','Forward Deployed Engineering','最小可行部署','企业 AI 现场诊断'] };
  return <html lang="zh-CN"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}} /></body></html>;
}
