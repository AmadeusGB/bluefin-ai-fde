import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'脱敏交付记录',description:'蓝旗鱼 AI 公开的脱敏 FDE 交付记录，明确问题、流程、系统边界、验收指标和证据限制。',alternates:{canonical:'/evidence/cases'}};
const cases=[['深圳某消费电子企业','退货利润归因与整改','关联订单、物流、客服、商品版本，形成原因证据链和整改闭环。','/evidence/cases/return-root-cause'],['佛山某定制家居企业','询盘识别与跟进闭环','统一客户上下文，AI 协助识别和起草，动作与状态写回 CRM。','/evidence/cases/sales-follow-up']];
export default function Page(){return <><SiteHeader/><main><PageHero eyebrow="证据类型 · 脱敏交付记录" title="交付过什么，边界在哪里。" intro="以下内容来自蓝旗鱼内部项目演讲材料。客户身份已经脱敏，公开信息仅证明问题、交付路径与验收设计；未公开部署前后量化结果时，不宣称经营改善幅度。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1100px]">{cases.map(([c,t,d,h],i)=><Link key={t} href={h} className="group grid gap-4 border-t border-foreground/20 py-8 md:grid-cols-[70px_1fr_1.2fr_2fr_30px]"><span className="text-[#147e66]">0{i+1}</span><span className="text-sm text-muted-foreground">{c}</span><h2 className="text-xl font-black">{t}</h2><p className="leading-7 text-muted-foreground">{d}</p><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>)}</div></section></main><SiteFooter/></>}
