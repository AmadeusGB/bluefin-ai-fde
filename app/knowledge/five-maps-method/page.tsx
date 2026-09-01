import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata: Metadata = {
  title: '企业 AI 现场诊断的五张地图',
  description:
    '用问题、流程、数据、责任与风险五张地图，把模糊 AI 需求转成可判断的业务问题。',
  alternates: { canonical: '/knowledge/five-maps-method' },
};
const sections = [
  {
    title: '问题地图',
    detail:
      '从正在发生的损失出发，记录影响对象、发生频率、当前成本和成功指标；不从“想做一个智能体”开始。',
    output: '一条有基线、有负责人、有时间范围的问题陈述。',
  },
  {
    title: '流程地图',
    detail:
      '沿真实工作路径记录触发、角色、系统、等待、返工、例外和最终动作，区分书面流程与实际流程。',
    output: '当前流程、关键等待点和例外路径。',
  },
  {
    title: '数据地图',
    detail:
      '列出完成判断或动作所需的数据来源、字段、样本、权限、版本、质量和敏感范围。',
    output: '可用于验证的代表性样本与数据缺口清单。',
  },
  {
    title: '责任地图',
    detail:
      '明确谁提供数据、谁审核输出、谁承担业务结果、谁能作出 GO / ADJUST / HOLD / STOP 决策。',
    output: '业务负责人、使用者、审核人和技术责任人。',
  },
  {
    title: '风险地图',
    detail:
      '记录错误输出、越权、隐私、承诺、不可逆动作和回退方式，并确定哪些动作必须保留人工最终决策。',
    output: '风险等级、护栏、拒绝条件和升级路径。',
  },
];
export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="方法 · 现场诊断"
      title="五张地图，不是五页模板。它们共同证明一个问题是否值得做。"
      intro="企业 AI 现场诊断的五张地图分别描述问题、流程、数据、责任和风险。只有五张地图能够互相对齐，团队才有条件设计 MVD；任何一张缺失，都可能把项目推向无边界开发。"
      description={metadata.description as string}
      path="/knowledge/five-maps-method"
      sections={sections}
      good={[
        '业务问题跨越多人、多个系统或多个部门，口头描述经常互相矛盾。',
        '团队有真实流程和样本，但尚未形成共同的问题边界。',
        '需要在立项前找出数据、责任或风险中的致命缺口。',
      ]}
      bad={[
        '问题只是展示 AI 概念，没有真实损失、使用者或结果责任。',
        '团队拒绝接触任何真实流程和数据，却要求提前承诺结果。',
        '把地图当成一次性咨询交付物，不准备在 MVD 中持续校正。',
      ]}
      verification={[
        '同一项业务损失能在问题、流程和数据三张地图中被追溯。',
        '每个 AI 输出都有审核人、最终动作和失败时的升级路径。',
        '地图明确记录未知项与证据来源，而不是用假设填满空白。',
      ]}
      related={[
        { label: '使用五张地图工具', href: '/tools/five-maps' },
        { label: '继续设计 MVD', href: '/knowledge/mvd-design' },
        { label: '做适配度评估', href: '/diagnostic' },
      ]}
    />
  );
}
