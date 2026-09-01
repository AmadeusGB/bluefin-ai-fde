import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';

export const metadata: Metadata = {
  title: '企业 AI 项目如何计算价值与 ROI',
  description:
    '企业 AI 项目应从可复算损失基线、可归因改善、全生命周期成本和证据强度计算价值，而不是用演示效果承诺 ROI。',
  alternates: { canonical: '/knowledge/ai-project-value-roi' },
};

const sections = [
  {
    title: '固定业务单位',
    detail:
      '先确定按一次询盘、一张订单、一次报价、一个工单或一个知识任务计算，避免把公司总收入与一个局部 AI 功能直接关联。',
    output: '分析单位、流程边界和责任人。',
  },
  {
    title: '复算当前损失',
    detail:
      '使用历史样本计算数量、耗时、错误、返工、流失、资金占用或风险暴露；记录数据来源、时间窗、排除项和波动范围。',
    output: '可由第三方复算的基线表。',
  },
  {
    title: '定义可归因改善',
    detail:
      '只计算项目边界内能够通过对照、分批上线或同口径前后比较解释的变化；把市场、季节、人员和政策变化列为干扰因素。',
    output: '改善指标、归因方法和不确定性说明。',
  },
  {
    title: '计算完整成本',
    detail:
      '除模型与开发费用外，还要计入取数、清洗、接口、安全、评估、人工复核、培训、运营、监控、变更和退出成本。',
    output: '建设、运行、采用与退出总成本。',
  },
  {
    title: '用证据门决定投入',
    detail:
      '在诊断、MVD、生产和复制阶段分别更新价值区间。证据不足时降低置信度或暂停，不用单一乐观数字包装商业承诺。',
    output: '价值区间、置信度及 GO / ADJUST / HOLD / STOP 决策。',
  },
];

export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="决策 · 价值与投入"
      title="AI 项目的 ROI，必须从一笔能复算的损失开始。"
      intro="合理的企业 AI 价值计算不是“节省多少人”，而是固定业务单位、复算当前损失、限定可归因改善、计入全生命周期成本，并用真实 MVD 数据逐步缩小价值区间。"
      description={metadata.description as string}
      path="/knowledge/ai-project-value-roi"
      sections={sections}
      good={[
        '项目声称能够提效、降本、提质、增收或降低风险。',
        '管理层需要比较多个 AI 候选场景的投入顺序。',
        'MVD 结束后需要决定是否进入生产部署。',
      ]}
      bad={[
        '没有历史任务或损失记录，却要求给出精确回报数字。',
        '把所有员工时间都按完全可节省的工资成本计算。',
        '只统计模型费用，忽略数据、复核、采用、运营和退出。',
      ]}
      verification={[
        '基线和结果使用相同任务单位、样本与时间口径。',
        '改善能够区分 AI 贡献、人工贡献和外部变化。',
        '价值区间同时披露成本、风险、假设、限制和证据强度。',
      ]}
      related={[
        { label: '建立业务基线', href: '/knowledge/ai-project-baseline' },
        { label: '使用项目评分器', href: '/tools/project-decision-scorer' },
        { label: '衡量项目 TTV', href: '/knowledge/time-to-value' },
      ]}
    />
  );
}
