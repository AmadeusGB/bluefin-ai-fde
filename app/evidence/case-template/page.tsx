import type { Metadata } from 'next';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'企业 AI 案例证据标准',description:'蓝旗鱼 AI 用于发布真实 FDE 项目的统一案例结构与证据分级标准。',alternates:{canonical:'/evidence/case-template'}};
const sections=[
  ['01','客户背景','行业、组织范围、业务负责人及项目上下文。'],
  ['02','原始流程','系统上线前的实际流程、角色、等待点和例外路径。'],
  ['03','可量化损失','时间、收入、错误率、机会成本或风险的计算方式与基线。'],
  ['04','证据与数据范围','数据来源、样本量、时间范围、权限和质量限制。'],
  ['05','普通方案为何无效','标准 SaaS、培训、规则自动化或既有项目无法闭环的原因。'],
  ['06','现场诊断','问题、流程、数据、责任与风险五张地图的关键判断。'],
  ['07','MVD 范围','首个最小可行部署明确包含什么、不包含什么。'],
  ['08','系统与人工边界','AI 自动处理、人工审核、回退和拒绝处理的位置。'],
  ['09','基线与结果','使用相同口径对比部署前后，并说明统计周期。'],
  ['10','风险与限制','失败场景、未覆盖范围、外部依赖与结果不确定性。'],
  ['11','客户如何接管','权限、文档、培训、监控与 30 / 60 / 90 天复查方式。'],
  ['12','可复用资产','哪些数据结构、评估集、模板和模块可以合法复用。'],
];
export default function Page(){return <><SiteHeader/><main><PageHero eyebrow="公开标准 · 版本 1.0" title="案例不是故事。案例是一组可核验证据。" intro="所有蓝旗鱼案例统一公开项目背景、原始流程、基线、数据范围、MVD 边界、结果、风险和客户接管方式。没有授权或数据时，必须明确标记为脱敏案例、内部实践、演示原型或待验证假设。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1200px]"><div className="grid gap-x-10 md:grid-cols-2">{sections.map(([n,t,d])=><article key={n} className="border-t border-foreground/20 py-7"><span className="text-xs font-bold text-[#147e66]">{n}</span><h2 className="mt-3 text-2xl font-black">{t}</h2><p className="mt-3 leading-7 text-muted-foreground">{d}</p></article>)}</div><div className="mt-14 bg-[#071817] p-8 text-white lg:p-12"><p className="eyebrow text-[#bff5d1]">发布底线</p><h2 className="mt-4 text-3xl font-black lg:text-5xl">不把原型包装成成功，<br/>不把相关性写成因果。</h2><p className="mt-5 max-w-3xl leading-8 text-white/60">每项结果都要说明口径、样本、时间范围和限制；无法核验的客户评价只能作为证言，不能替代业务结果。</p></div></div></section></main><SiteFooter/></>}
