import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'脱敏交付记录',description:'蓝旗鱼 AI 公开的脱敏 FDE 交付记录，明确问题、流程、系统边界、验收指标和证据限制。',alternates:{canonical:'/evidence/cases'}};
const cases=[
  ['深圳某消费电子企业','2026.03','退货利润归因与整改','关联订单、物流、客服、商品版本，形成原因证据链和整改闭环。','/evidence/cases/return-root-cause'],
  ['东莞某消费品企业','2026.04','产品情报与开模决策','把评论、竞品与历史表现变成有证据、经过小样验证的开模判断。','/evidence/cases/product-intelligence'],
  ['佛山某定制家居企业','2026.05','询盘识别与跟进闭环','统一客户上下文，AI 协助识别和起草，动作与状态写回 CRM。','/evidence/cases/sales-follow-up'],
  ['中山某定制灯具企业','2026.06','报价知识库与审批闭环','调用价格记忆生成草稿，毛利、交期和承诺由负责人批准。','/evidence/cases/quotation-approval']
];
export default function Page(){return <><SiteHeader/><main><PageHero eyebrow="证据类型 · 脱敏交付记录" title="交付过什么，边界在哪里。" intro="以下内容来自蓝旗鱼内部项目演讲材料。客户身份已经脱敏，公开信息仅证明问题、交付路径与验收设计；未公开部署前后量化结果时，不宣称经营改善幅度。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1200px]">{cases.map(([company,date,title,detail,href],index)=><Link key={title} href={href} className="group grid gap-4 border-t border-foreground/20 py-8 md:grid-cols-[60px_1fr_100px_1.2fr_1.8fr_30px]"><span className="text-[#147e66]">0{index+1}</span><span className="text-sm text-muted-foreground">{company}</span><span className="text-sm text-muted-foreground">{date}</span><h2 className="text-xl font-black">{title}</h2><p className="leading-7 text-muted-foreground">{detail}</p><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>)}</div></section></main><SiteFooter/></>}
