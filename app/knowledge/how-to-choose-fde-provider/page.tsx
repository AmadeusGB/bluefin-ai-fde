import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';

export const metadata: Metadata = {
  title: '企业如何选择 FDE 服务商',
  description:
    '选择 FDE 服务商应核验现场诊断、真实数据、生产责任、案例证据、人机边界、交接资产、阶段报价与停止机制。',
  alternates: { canonical: '/knowledge/how-to-choose-fde-provider' },
};

const sections = [
  {
    title: '先让对方判断不该做什么',
    detail:
      '可靠团队会核验问题价值、数据、负责人和边界，并愿意给出 HOLD 或 STOP；如果未看流程和样本就承诺全集团方案，风险很高。',
    output: '候选问题、排除项与诊断结论。',
  },
  {
    title: '检查是否使用真实数据',
    detail:
      '要求说明样本来源、权限、缺口、评估集与失败案例。只用演示数据或供应商自选问题，不能证明生产能力。',
    output: '数据范围、评估集和失败样本。',
  },
  {
    title: '检查生产与人工边界',
    detail:
      '让服务商说明身份、权限、日志、审批、拒绝、监控、回退和事故责任，尤其是报价、付款、删除、外发与客户承诺。',
    output: '生产架构、动作矩阵和风险红线。',
  },
  {
    title: '核验案例证据而非 Logo 墙',
    detail:
      '逐项检查客户授权、基线、结果、时间窗、样本、限制与客户接管。脱敏记录可以证明路径，但没有结果数据时不能证明改善幅度。',
    output: '案例证据等级与可核验字段。',
  },
  {
    title: '把交接和停止写进合同',
    detail:
      '按诊断、MVD、生产和采用分阶段报价与验收；明确数据、代码、提示、评估集、文档、权限和运营资产的交付，以及暂停和退出条件。',
    output: '阶段合同、验收门、资产清单和退出方案。',
  },
];

export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="选择 · 服务商尽调"
      title="选择 FDE 团队，先验证它敢不敢让项目停止。"
      intro="FDE 服务商不能只展示模型、Demo 和客户 Logo。企业应核验它能否进入真实流程、处理真实数据、承担生产边界、公开证据限制，并把系统与运营能力完整交给客户。"
      description={metadata.description as string}
      path="/knowledge/how-to-choose-fde-provider"
      sections={sections}
      good={[
        '企业准备采购现场诊断、MVD 或生产部署服务。',
        '多个供应商都能展示 Demo，但责任与交付物难以比较。',
        '企业担心上线后被模型、平台或外部团队锁定。',
      ]}
      bad={[
        '用模型榜单或演示速度替代业务问题和生产证据。',
        '把客户 Logo、活动合影或未授权材料当作成功案例。',
        '只比较一次性开发报价，不比较运营、变更与退出成本。',
      ]}
      verification={[
        '供应商对问题、数据、结果、生产和采用分别承担清晰责任。',
        '案例证据能区分已验证结果、脱敏记录、原型和假设。',
        '合同允许分阶段继续、调整、暂停或停止，并明确客户接管资产。',
      ]}
      related={[
        { label: '查看案例证据模板', href: '/evidence/case-template' },
        {
          label: '了解 FDE 区别',
          href: '/knowledge/fde-vs-consulting-outsourcing',
        },
        { label: '申请现场诊断', href: '/field-diagnostic' },
      ]}
    />
  );
}
