import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata: Metadata = {
  title: '企业 AI 系统需要哪些生产护栏',
  description:
    '生产护栏覆盖数据权限、输出依据、行动边界、人工审核、监控、回退与拒绝机制。',
  alternates: { canonical: '/knowledge/production-guardrails' },
};
const sections = [
  {
    title: '数据与权限护栏',
    detail:
      '按最小权限访问数据，区分公开、内部、敏感和受限内容；记录身份、来源与访问范围。',
    output: '角色权限矩阵、敏感数据规则和审计记录。',
  },
  {
    title: '答案与证据护栏',
    detail:
      '要求关键结论带可追溯依据；证据不足、冲突或过期时应拒绝、降级或升级给人。',
    output: '引用要求、置信规则和拒绝模板。',
  },
  {
    title: '行动与审批护栏',
    detail:
      '把检索、起草、建议、写回和外部执行分级；承诺、付款、删除、报价和权限变更保留人工审批。',
    output: '动作白名单、额度、审批人和不可逆动作禁区。',
  },
  {
    title: '监控与异常护栏',
    detail:
      '记录输入、检索、输出、工具调用、人工修改和最终结果，监测错误、延迟、成本、越权和采用率。',
    output: '日志字段、告警阈值和升级责任人。',
  },
  {
    title: '回退与停止护栏',
    detail:
      '准备规则流程、人工流程或旧系统作为降级路径；明确触发暂停和 STOP 的条件。',
    output: '回退步骤、恢复目标和事故复盘机制。',
  },
];
export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="方法 · 生产部署"
      title="生产护栏不是一句“请谨慎使用”。它必须改变系统能做什么。"
      intro="企业 AI 生产护栏是一组可执行的权限、证据、动作、审核、监控和回退规则。它们不是免责声明，而是在系统层限制越权、错误承诺和不可逆操作，并为失败准备安全路径。"
      description={metadata.description as string}
      path="/knowledge/production-guardrails"
      sections={sections}
      good={[
        'AI 输出会影响客户承诺、审批、报价、数据写回或后续自动动作。',
        '系统访问企业知识、个人信息或分级权限数据。',
        '错误不可完全消除，但可以被限制、检测、拒绝和回退。',
      ]}
      bad={[
        '只在页面底部放免责声明，却不限制工具、权限和动作。',
        '所有输出都要求人工逐字检查，却没有风险分级与效率目标。',
        '系统没有日志、告警或备用流程，出错后无法追溯和恢复。',
      ]}
      verification={[
        '权限、动作和审批规则能够在系统层被测试，不能靠口头提醒绕过。',
        '高风险场景在评估集中有拒绝、升级和回退测试。',
        '事故发生时能追溯输入、依据、输出、工具调用、人工决策和最终结果。',
      ]}
      related={[
        { label: '建立评估集', href: '/knowledge/evaluation-set' },
        { label: '设计 MVD', href: '/knowledge/mvd-design' },
        { label: '查看案例证据标准', href: '/evidence/case-template' },
      ]}
    />
  );
}
