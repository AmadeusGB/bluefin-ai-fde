import type { Metadata } from 'next';
import { MvdDesigner } from '@/components/mvd-designer';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'MVD 设计器',description:'用五个字段设计企业 AI 最小可行部署：问题、基线、数据、人机边界与成功条件。',alternates:{canonical:'/tools/mvd-designer'}};
export default function Page(){const schema={'@context':'https://schema.org','@type':'WebApplication',name:'蓝旗鱼 MVD 设计器',applicationCategory:'BusinessApplication',operatingSystem:'Web',description:'用问题、基线、数据、人机边界和成功条件设计企业 AI 最小可行部署。'};return <><SiteHeader/><main><PageHero eyebrow="在线工具" title="先写清楚一页 MVD，再决定要不要开发。" intro="最小可行部署不是缩小版 Demo。它必须使用真实数据、保留真实业务边界，并能在较短周期内支持明确的 GO / ADJUST / HOLD / STOP 决策。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1300px]"><MvdDesigner/></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></main><SiteFooter/></>}
