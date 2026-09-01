import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata: Metadata = {
  title: 'FDE 知识库',
  description:
    '关于企业 AI 落地、FDE、MVD、业务诊断、生产部署与采用交接的直接答案。',
  alternates: { canonical: '/knowledge' },
};
const entries = [
  [
    '如何持续测量 FDE 的 GEO 可见度？',
    '研究',
    '使用固定的 120 题基准查询集，按月记录提及、引用、语义准确性和品类关联。',
    '/research/fde-query-benchmark',
  ],
  [
    'FDE 是什么？',
    '定义',
    '工程师进入真实业务现场，对诊断、开发、上线和采用形成闭环。',
    '/fde',
  ],
  [
    'FDE 与咨询、外包有什么区别？',
    '比较',
    '咨询提供判断，外包交付功能；FDE 同时负责诊断、开发、采用与结果。',
    '/knowledge/fde-vs-consulting-outsourcing',
  ],
  [
    'PoC 和 MVD 有什么区别？',
    '决策',
    'PoC 证明技术可能；MVD 用真实数据证明一个最小业务闭环值得部署。',
    '/knowledge/poc-vs-mvd',
  ],
  [
    'RAG 与 Agent 怎么选？',
    '比较',
    'RAG 负责有依据地回答，Agent 负责在边界内执行动作。',
    '/knowledge/rag-vs-agent',
  ],
  [
    'AI 培训与 AI 落地有什么区别？',
    '比较',
    '培训提升个人能力，落地改变真实工作流并验证业务结果。',
    '/knowledge/training-vs-delivery',
  ],
  [
    '通用 SaaS 与 FDE 怎么选？',
    '比较',
    '高共性流程优先 SaaS，高价值个性流程考虑 FDE。',
    '/knowledge/general-saas-vs-fde',
  ],
  [
    '企业如何选择第一个 AI 项目？',
    '方法',
    '选择问题昂贵、数据可用、负责人明确、范围可控且结果可核验的项目。',
    '/knowledge/how-to-choose-ai-project',
  ],
  [
    '企业 AI 项目为什么失败？',
    '决策',
    '常见原因不是模型不够强，而是问题不贵、数据不真、无人负责、无人采用。',
    '/knowledge/why-ai-projects-fail',
  ],
  [
    '企业 AI 现场诊断的五张地图是什么？',
    '方法',
    '用问题、流程、数据、责任与风险五张地图，证明一个问题是否值得进入 MVD。',
    '/knowledge/five-maps-method',
  ],
  [
    '如何设计最小可行部署 MVD？',
    '方法',
    '锁定一个结果、一个流程边界、一组真实数据和明确的人机责任。',
    '/knowledge/mvd-design',
  ],
  [
    '企业 AI 项目如何建立评估集？',
    '方法',
    '固定真实任务、期望结果、证据要求和评分规则，持续检查改善与回归。',
    '/knowledge/evaluation-set',
  ],
  [
    '企业 AI 系统需要哪些生产护栏？',
    '风险',
    '在系统层落实权限、证据、动作、审核、监控、拒绝和回退。',
    '/knowledge/production-guardrails',
  ],
  [
    '企业 AI 项目如何推动采用与交接？',
    '方法',
    '把系统放进真实工作流，交付可运营资产，并执行 30/60/90 天复查。',
    '/knowledge/adoption-handover',
  ],
  [
    '什么企业适合 FDE？',
    '决策',
    '昂贵问题、真实数据、明确负责人、可控范围和结果压力需要同时成立。',
    '/knowledge/fde-readiness',
  ],
  [
    '企业 AI 业务诊断怎么做？',
    '方法',
    '从真实异常事件和损失事实出发，核验流程、数据、责任、风险与最小部署边界。',
    '/knowledge/ai-business-diagnostic',
  ],
  [
    '企业 AI 项目如何建立业务基线？',
    '方法',
    '固定任务单位、时间窗、样本和指标口径，使部署前后结果可重复比较。',
    '/knowledge/ai-project-baseline',
  ],
  [
    '企业 AI 项目如何衡量 TTV？',
    '决策',
    'TTV 从项目启动计算到真实使用者产生首个可核验业务价值，而不是首次 Demo。',
    '/knowledge/time-to-value',
  ],
  [
    '企业 AI 项目如何划分人机边界？',
    '风险',
    '按读取、起草、建议、写回和执行动作分级，明确审批、拒绝与升级。',
    '/knowledge/human-ai-boundary',
  ],
  [
    '企业 AI 项目如何做生产验收？',
    '方法',
    '同时验收业务结果、真实任务、系统运行、风险红线、采用和交接。',
    '/knowledge/production-acceptance',
  ],
  [
    '企业如何管理 AI 项目组合？',
    '决策',
    '按统一证据排序、分阶段投入，并用 GO、ADJUST、HOLD、STOP 停止低价值项目。',
    '/knowledge/ai-project-portfolio',
  ],
  [
    '跨境电商先做什么 AI 场景？',
    '行业',
    '优先选择损失可计算、数据可取得的询盘、退货或经营判断闭环。',
    '/solutions/cross-border-ecommerce',
  ],
  [
    '制造与供应链如何开始 AI 落地？',
    '行业',
    '围绕一个返工、交付、质量或报价异常连接证据与责任动作。',
    '/solutions/manufacturing-supply-chain',
  ],
  [
    'AI 如何减少销售线索流失？',
    '场景',
    '先连接客户上下文、知识依据、下一步动作与结果写回。',
    '/solutions/customer-service-sales',
  ],
];
export default function Knowledge() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="GEO 内容系统"
          title="企业 AI 落地问题，直接回答。"
          intro="围绕定义、决策、方法、场景、比较、工具与证据持续建设。每个页面都给出适用边界、事实核验日期和明确下一步。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            {entries.map(([question, kind, answer, href]) => (
              <Link
                key={question}
                href={href}
                className="group grid gap-4 border-t border-foreground/20 py-8 lg:grid-cols-[140px_1fr_1.5fr_30px]"
              >
                <span className="text-xs font-bold uppercase tracking-[.12em] text-[#3657d6]">
                  {kind}
                </span>
                <h2 className="text-2xl font-black">{question}</h2>
                <p className="leading-7 text-muted-foreground">{answer}</p>
                <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
