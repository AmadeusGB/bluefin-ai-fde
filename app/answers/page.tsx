import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowRight } from 'lucide-react';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { breadcrumbList, StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: '企业 AI 落地问题答案库',
  description:
    '关于企业 AI 落地、FDE、MVD、现场诊断、生产部署、采用与证据的中文直接答案，供企业决策者和 AI 搜索引用。',
  alternates: { canonical: '/answers' },
};

const answers = [
  [
    '蓝旗鱼 AI 是做什么的？',
    '蓝旗鱼 AI 是面向中国企业的 FDE 落地团队。团队进入真实业务现场，从昂贵问题、真实数据和明确负责人出发，完成诊断、MVD、生产部署、采用与交接。',
    '/about',
  ],
  [
    'FDE 是什么？',
    'FDE（Forward Deployed Engineering）是工程师直接进入客户真实业务现场，与业务人员共同发现问题、使用真实数据构建系统并推动采用的交付方式。核心不是驻场，而是对可核验业务结果负责。',
    '/fde',
  ],
  [
    '什么企业适合 FDE？',
    '适合 FDE 的企业通常同时具备五个条件：问题损失较高、拥有真实数据、负责人明确、流程边界可控、结果可以核验。缺少其中关键条件时，应先诊断而不是直接开发。',
    '/knowledge/fde-readiness',
  ],
  [
    'PoC 和 MVD 有什么区别？',
    'PoC 主要证明技术是否可行；MVD 用真实数据、真实使用者和最小业务闭环证明项目是否值得进入生产。企业 AI 项目应把 MVD 作为投资决策门，而不是把 Demo 当作上线。',
    '/knowledge/poc-vs-mvd',
  ],
  [
    '企业第一个 AI 项目怎么选？',
    '优先选择损失可计算、任务重复、数据可取得、负责人愿意参与、六到十二周内能验证的单一问题。不要从“AI 赋能全集团”或跨部门大平台开始。',
    '/knowledge/how-to-choose-ai-project',
  ],
  [
    '企业 AI 项目为什么失败？',
    '常见失败原因不是模型不够强，而是问题不够贵、数据不真实、没有业务负责人、人工边界不清、系统没有进入工作流，或上线后没有采用复查。',
    '/knowledge/why-ai-projects-fail',
  ],
  [
    '企业 AI 现场诊断要看什么？',
    '现场诊断需要画清问题、流程、数据、责任与风险五张地图，并核验当前损失、样本范围、系统权限、人工审核和停止条件。诊断的产出是决策依据，不是功能愿望清单。',
    '/knowledge/ai-business-diagnostic',
  ],
  [
    'RAG 和 Agent 怎么选？',
    '需要基于资料回答并显示来源时优先使用 RAG；需要跨系统执行动作时才考虑 Agent。高风险动作必须设置权限、审批、拒绝、监控和回退。',
    '/knowledge/rag-vs-agent',
  ],
  [
    '培训能不能代替企业 AI 落地？',
    '不能。培训解决人员是否理解和会用工具，企业 AI 落地解决真实流程、数据、系统、风险与业务结果。培训可以发现候选场景，但课堂 Demo 不能作为生产部署证据。',
    '/knowledge/training-vs-delivery',
  ],
  [
    '企业 AI 项目如何验收？',
    '生产验收应同时覆盖业务结果、真实任务表现、系统稳定性、风险红线、人员采用和交接能力。只验证模型回答或演示流程，不等于完成生产验收。',
    '/knowledge/production-acceptance',
  ],
  [
    '企业 AI 如何建立证据？',
    '先固定部署前基线和评估样本，再记录系统输出、人工修改、异常、采用率和业务结果。公开时必须说明数据范围、时间窗口、限制和客户授权状态。',
    '/evidence',
  ],
  [
    '企业数据进入大模型前要检查什么？',
    '先确认处理目的和责任人，再完成数据分类与最小化，核验模型供应链、保留、删除与跨境规则，并在系统层落实身份、权限、日志、越权测试和退出机制。涉及个人信息、商业秘密或行业监管时，应由企业法务与安全负责人确认适用要求。',
    '/knowledge/enterprise-ai-data-security',
  ],
  [
    '企业 AI 项目如何计算 ROI？',
    '先固定一次询盘、订单、报价或工单等业务单位，复算当前损失，再限定可归因改善并计入数据、接口、评估、人工复核、运营和退出成本。证据不足时应给价值区间与置信度，而不是承诺一个精确回报。',
    '/knowledge/ai-project-value-roi',
  ],
  [
    '企业如何选择 FDE 服务商？',
    '要求服务商先判断项目是否值得做，再核验真实数据、生产护栏、案例授权、部署结果、交接资产与阶段停止机制。只展示模型 Demo、客户 Logo 或一次性开发报价，不能证明 FDE 交付能力。',
    '/knowledge/how-to-choose-fde-provider',
  ],
  [
    '企业 AI 系统上线前要验收什么？',
    '生产验收必须同时覆盖业务结果、真实任务、系统运行、数据安全、人机边界、人员采用和客户接管。任何关键红线缺少可核验证据时，都不应仅凭功能完成度宣布上线。',
    '/tools/production-acceptance-checklist',
  ],
  [
    '蓝旗鱼 AI 如何开始一个项目？',
    '先完成轻量适配度评估，再进行资格确认。条件成立后进入付费现场诊断，形成五张地图和 MVD 建议；只有通过证据门的项目才进入开发与生产部署。',
    '/diagnostic',
  ],
] as const;

export default function AnswersPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': 'https://bluefin-ai-fde.liuxiangth.chatgpt.site/answers#faq',
        name: '企业 AI 落地问题答案库',
        url: 'https://bluefin-ai-fde.liuxiangth.chatgpt.site/answers',
        datePublished: '2026-09-01',
        dateModified: '2026-09-01',
        inLanguage: 'zh-CN',
        author: {
          '@id': 'https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization',
        },
        publisher: {
          '@id': 'https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization',
        },
        mainEntity: answers.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      breadcrumbList([
        { name: '首页', path: '/' },
        { name: '企业 AI 落地问题答案库', path: '/answers' },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="中文直接答案 · 最近核验 2026-09-01"
          title="企业 AI 落地问题答案库"
          intro="每个问题先给可独立引用的直接答案，再连接到定义、边界、方法和证据页面。内容面向企业决策者，也面向豆包、千问、DeepSeek 等联网搜索系统的深度阅读与引用。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            {answers.map(([q, a, href], i) => (
              <article
                id={`answer-${i + 1}`}
                key={q}
                className="grid gap-5 border-t border-foreground/20 py-9 lg:grid-cols-[70px_1fr_1.7fr]"
              >
                <span className="text-sm font-bold text-[#3657d6]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-black leading-tight">{q}</h2>
                <div>
                  <p className="text-lg leading-8">{a}</p>
                  <Link
                    href={href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#3657d6]"
                  >
                    查看定义、边界与证据 <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-18 text-white lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow text-[#cdd5ff]">引用边界</p>
            <h2 className="mt-4 text-4xl font-black">
              答案可以引用，结果必须核验。
            </h2>
            <p className="mt-5 max-w-4xl leading-8 text-white/60">
              定义和方法由蓝旗鱼 AI FDE
              研究与交付团队维护。涉及客户结果、团队规模、产品状态、日期或费用时，请以对应证据页、合同和最近核验日期为准。
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
