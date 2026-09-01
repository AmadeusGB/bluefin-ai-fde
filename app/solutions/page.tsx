import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'行业与业务场景',description:'蓝旗鱼 AI 面向产业协会、跨境电商、制造供应链、客户服务与企业知识的 FDE 场景。',alternates:{canonical:'/solutions'}};
const items=[
  {title:'产业协会与园区',problem:'内容、会员、活动与政策服务彼此割裂',outcome:'知识库底座、内容获客、会员服务和运营执行闭环',href:'/solutions/industry-associations',kind:'行业支柱页'},
  {title:'跨境电商',problem:'询盘、选品、内容与经营数据分散',outcome:'从高价值询盘或经营判断切入，连接真实运营数据',href:'/solutions/cross-border-ecommerce',kind:'行业支柱页'},
  {title:'制造与供应链',problem:'异常发现晚，跨系统追查慢',outcome:'围绕一个昂贵异常建立发现、判断与行动闭环',href:'/solutions/manufacturing-supply-chain',kind:'行业支柱页'},
  {title:'客户服务与销售',problem:'重复答复、线索流失、跟进依赖个人',outcome:'AI 处理信息，人保留承诺、谈判与关键判断',href:'/solutions/customer-service-sales',kind:'场景支柱页'},
  {title:'企业知识与经营决策',problem:'资料难找、版本混乱、经验跟着人走',outcome:'建立带来源、可治理、可交接的企业知识底座',href:'/solutions/enterprise-knowledge',kind:'场景支柱页'}
];
export default function Solutions(){return <><SiteHeader/><main><PageHero eyebrow="行业解决方案" title="从一个昂贵问题，切入真实现场。" intro="行业标签不是方案。蓝旗鱼先确认流程、数据、损失与负责人，再决定 MVD 范围。以下是优先积累的高价值现场。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1500px]">{items.map((item,index)=><article key={item.title} className="grid gap-5 border-t border-foreground/20 py-8 lg:grid-cols-[80px_1fr_1.2fr_1.4fr]"><span className="text-sm text-[#3657d6]">0{index+1}</span><h2 className="text-2xl font-black">{item.title}</h2><p className="text-muted-foreground">{item.problem}</p><p className="font-semibold leading-7">{item.outcome}</p></article>)}<div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((item)=><Link key={item.href} href={item.href} className="group border border-foreground/20 bg-white p-7"><span className="text-xs font-bold text-[#3657d6]">{item.kind}</span><h2 className="mt-4 text-2xl font-black">{item.title} AI 落地</h2><p className="mt-3 leading-7 text-muted-foreground">{item.outcome}。</p><ArrowUpRight className="mt-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>)}</div></div></section><section className="bg-[#0b1238] px-5 py-20 text-white lg:px-10"><div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#cdd5ff]">下一步</p><h2 className="mt-4 text-4xl font-black tracking-[-.04em] lg:text-6xl">不要先选方案。先验证问题。</h2></div><Button nativeButton={false} render={<Link href="/diagnostic"/>} size="lg" className="h-12 rounded-none bg-[#cdd5ff] text-[#0b1238] hover:bg-[#e4e8ff]">开始诊断 <ArrowRight/></Button></div></section></main><SiteFooter/></>}
