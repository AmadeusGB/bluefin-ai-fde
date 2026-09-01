import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleMeta } from '@/components/article-meta';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'企业如何选择第一个 AI 项目',description:'第一个企业 AI 项目应同时满足问题昂贵、数据可用、负责人明确、范围可控和结果可核验。',alternates:{canonical:'/knowledge/how-to-choose-ai-project'}};
const rules=[['问题足够昂贵','持续损失时间、收入、客户或风险，而不是“大家觉得低效”。'],['数据能够验证','有代表性真实样本，清楚来源、权限、版本和敏感范围。'],['负责人能够决策','有业务所有者协调跨部门资源，并能批准 GO / STOP。'],['范围足够小','在数周内跑通一个闭环，不需要先改造整个企业。'],['结果能够核验','开始前就定义基线、成功阈值、失败条件与复查时间。']];
export default function Page(){return <><SiteHeader/><main><PageHero eyebrow="决策 · 方法" title="第一个 AI 项目，不选最炫的。选最能被验证的。" intro="理想的第一个项目不是覆盖面最大，而是问题价值高、真实数据可得、负责人明确、范围可控，并能在较短周期内决定继续、调整、暂停或停止。"/><ArticleMeta title="企业如何选择第一个 AI 项目" description="第一个 AI 项目应同时满足问题、数据、负责人、范围和核验条件。" path="/knowledge/how-to-choose-ai-project"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1100px]">{rules.map(([t,d],i)=><article key={t} className="grid gap-4 border-t border-foreground/20 py-8 md:grid-cols-[70px_1fr_2fr]"><span className="text-[#147e66]">0{i+1}</span><h2 className="text-2xl font-black">{t}</h2><p className="text-lg leading-8 text-muted-foreground">{d}</p></article>)}<div className="mt-12 bg-[#dff6e6] p-8"><h2 className="text-3xl font-black">一个实用筛选顺序</h2><p className="mt-4 leading-8 text-muted-foreground">先列出正在发生的损失，再核验数据和负责人；通过后画五张地图，最后才设计 MVD。任何关键条件缺失，都应该先补齐而不是立即开发。</p><Button nativeButton={false} render={<Link href="/diagnostic"/>} size="lg" className="mt-6 h-12 rounded-none">做 FDE 适配度评估 <ArrowRight/></Button></div></div></section></main><SiteFooter/></>}
