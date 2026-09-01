import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata: Metadata = {
  title: '企业 AI 项目如何建立评估集',
  description:
    '评估集用固定真实样本、期望结果和评分规则，持续验证企业 AI 系统是否改善并守住风险边界。',
  alternates: { canonical: '/knowledge/evaluation-set' },
};
const sections = [
  {
    title: '从真实任务取样',
    detail:
      '从历史工单、查询、合同、报价或决策记录中抽取常见任务、高价值任务和高风险例外，不用只对模型友好的演示题。',
    output: '带来源与时间范围的代表性样本。',
  },
  {
    title: '定义期望与容错',
    detail:
      '为每个样本记录可接受答案、必须包含的依据、禁止出现的内容和允许的合理差异。',
    output: '明确的正确、部分正确、错误和拒绝标准。',
  },
  {
    title: '拆分质量维度',
    detail:
      '分别评估事实依据、完整性、行动正确性、权限、格式、延迟与成本，避免一个模糊“准确率”掩盖风险。',
    output: '与业务损失相关的评分维度。',
  },
  {
    title: '保留人工复核',
    detail:
      '由理解业务的人复核争议样本，记录判定理由；高风险输出不能只依靠自动评分。',
    output: '复核人、争议说明和最终标签。',
  },
  {
    title: '版本化并持续回归',
    detail:
      '冻结核心样本，新增线上失败样本；每次模型、提示词、知识或流程变化后运行同一套回归。',
    output: '可比较的版本记录与失败类型趋势。',
  },
];
export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="方法 · 评估与回归"
      title="没有固定评估集，AI 系统就没有可比较的进步。"
      intro="企业 AI 评估集是一组固定的真实任务、期望结果、证据要求和评分规则。它让团队在模型、提示词、知识库或工作流变化后，判断系统到底改善了什么，又破坏了什么。"
      description={metadata.description as string}
      path="/knowledge/evaluation-set"
      sections={sections}
      good={[
        '系统会持续更新模型、知识、提示词或业务规则，需要防止回归。',
        '错误类型对应不同业务损失，不能只看平均准确率。',
        '上线前需要证明常见任务和高风险例外都有明确表现。',
      ]}
      bad={[
        '只使用合成的理想问题，没有真实噪声、缺字段和例外。',
        '用一个总分替代事实、行动、权限和风险的独立判断。',
        '评估样本与答案无人维护，线上失败也不回流。',
      ]}
      verification={[
        '样本能追溯到真实任务来源，并覆盖常见与高风险分布。',
        '评分规则让两名复核者对大多数样本得到一致结论。',
        '每次重要变更都有同一核心集上的回归结果和失败清单。',
      ]}
      related={[
        { label: '设计一个 MVD', href: '/knowledge/mvd-design' },
        { label: '配置生产护栏', href: '/knowledge/production-guardrails' },
        { label: '检查项目失败风险', href: '/knowledge/why-ai-projects-fail' },
      ]}
    />
  );
}
