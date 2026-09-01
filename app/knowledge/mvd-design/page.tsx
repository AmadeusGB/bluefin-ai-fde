import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata: Metadata = {
  title: '如何设计最小可行部署 MVD',
  description:
    'MVD 用真实数据、真实使用者和生产边界，验证一个最小业务闭环是否值得继续部署。',
  alternates: { canonical: '/knowledge/mvd-design' },
};
const sections = [
  {
    title: '锁定一个结果',
    detail:
      '选择一个可计算的业务结果，例如响应时间、线索转化、错误率或调查周期，并在开发前记录基线。',
    output: '基线口径、成功阈值和停止条件。',
  },
  {
    title: '缩小流程边界',
    detail:
      '只覆盖一个触发点、一类对象、一组使用者和一个最终动作；明确本轮不处理的场景。',
    output: '包含项、不包含项和例外升级路径。',
  },
  {
    title: '限定真实数据',
    detail:
      '选择能代表常见情况与高风险例外的样本，记录来源、权限、时间范围和质量限制。',
    output: '固定评估集与可追溯数据版本。',
  },
  {
    title: '划定人机责任',
    detail:
      '明确 AI 可以检索、判断、起草或执行到哪一步，哪些承诺、审批和不可逆动作必须由人完成。',
    output: '自动、审核、拒绝和回退四类边界。',
  },
  {
    title: '按结果决定下一步',
    detail:
      '用同一口径比较基线与 MVD 结果，并结合使用率、错误类型和运营成本作出 GO、ADJUST、HOLD 或 STOP。',
    output: '带证据的项目决策，而不是功能验收清单。',
  },
];
export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="方法 · 最小可行部署"
      title="MVD 不是缩小版 Demo。它是最小的真实业务部署。"
      intro="最小可行部署（MVD）必须接触真实数据、进入真实工作流、面对真实使用者，并在明确护栏内产生可核验结果。它的目标不是证明模型能运行，而是尽快判断这个业务闭环是否值得继续投入。"
      description={metadata.description as string}
      path="/knowledge/mvd-design"
      sections={sections}
      good={[
        '已有明确问题、基线、负责人和可用样本，需要用最小成本验证部署价值。',
        '完整系统范围过大，但可以隔离一个高价值流程节点。',
        '团队愿意接受失败条件，并根据证据停止或调整。',
      ]}
      bad={[
        '只想制作演示视频或向管理层展示技术效果。',
        '没有真实使用者、数据权限或业务负责人。',
        '把“最小”理解成省略评估、权限、日志、回退和人工审核。',
      ]}
      verification={[
        '同一组样本可以重复比较基线、当前系统和后续版本。',
        '每个成功指标都有阈值、统计周期和责任人。',
        'MVD 结束时能够明确作出继续、调整、暂停或停止决策。',
      ]}
      related={[
        { label: '打开 MVD 设计器', href: '/tools/mvd-designer' },
        { label: '理解 PoC 与 MVD', href: '/knowledge/poc-vs-mvd' },
        { label: '查看生产护栏', href: '/knowledge/production-guardrails' },
      ]}
    />
  );
}
