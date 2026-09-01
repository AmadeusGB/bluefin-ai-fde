import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';

export const metadata: Metadata = {
  title: '企业数据进入大模型前要检查什么',
  description:
    '企业数据进入大模型或 AI Agent 前，应检查处理目的、数据分类、供应链、最小权限、日志、保留、删除、跨境与退出机制。',
  alternates: { canonical: '/knowledge/enterprise-ai-data-security' },
};

const sections = [
  {
    title: '确认处理目的与依据',
    detail:
      '先写清哪些角色为了什么任务处理哪些数据，哪些数据不能进入模型。涉及个人信息、商业秘密、合同义务或行业监管时，由企业合规与法务确认适用要求。',
    output: '目的—数据—角色—处理依据清单。',
  },
  {
    title: '完成数据分类与最小化',
    detail:
      '区分公开、内部、敏感、受限和禁止数据；删除与任务无关的字段，优先使用脱敏、摘要、检索片段或合成样本，不默认上传完整资料库。',
    output: '数据分类表、禁止清单和最小样本集。',
  },
  {
    title: '核验模型与供应链',
    detail:
      '确认模型服务商、部署位置、日志与训练使用规则、分包方、数据保留、删除、跨境、事故通知和退出后的数据处置。不能仅凭“企业版”三个字判断安全。',
    output: '供应商问卷、合同条款和数据流图。',
  },
  {
    title: '落实身份、权限与隔离',
    detail:
      '按角色、数据域和动作实施最小权限；把读取、生成、写回、导出和外发分开授权。测试越权检索、提示词注入、跨租户访问和批量导出。',
    output: '权限矩阵、越权测试和审批记录。',
  },
  {
    title: '建立日志、保留与退出',
    detail:
      '记录数据来源、检索、输出、人工修改和系统动作；确定日志可见范围、保留期限、删除流程、异常响应和服务退出时的导出与销毁证明。',
    output: '审计日志、保留表、事故响应与退出清单。',
  },
];

export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="风险 · 数据与合规"
      title="企业数据进入大模型前，先回答七个责任问题。"
      intro="不能把“不要上传敏感数据”当作完整方案。企业需要明确处理目的、数据分类、模型供应链、权限、日志、保留、删除与退出机制，再决定哪些数据可以进入哪一种 AI 工作流。"
      description={metadata.description as string}
      path="/knowledge/enterprise-ai-data-security"
      sections={sections}
      good={[
        '系统需要处理客户、员工、合同、价格、研发或经营资料。',
        'AI 会连接企业知识库、业务系统或外部模型服务。',
        '项目准备从个人试用进入企业生产环境。',
      ]}
      bad={[
        '没有数据所有者，却希望工程团队自行判断所有合规边界。',
        '只签保密协议，不核验实际数据流、日志、保留和删除机制。',
        '把法律合规、信息安全和业务风险全部混成一个勾选项。',
      ]}
      verification={[
        '任何输入字段都能说明来源、目的、权限、保留期和责任人。',
        '越权、提示注入、批量导出、供应商退出和事故场景已经测试。',
        '企业法务、安全、数据所有者和业务负责人共同确认生产边界。',
      ]}
      sources={[
        {
          label: '《中华人民共和国个人信息保护法》',
          href: 'https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm',
          note: '核对个人信息、敏感个人信息及处理责任的官方原文。',
        },
        {
          label: '《中华人民共和国数据安全法》',
          href: 'https://www.npc.gov.cn/npc/c2/c30834/202106/t20210610_311888.html',
          note: '核对数据处理、安全管理、风险监测与分类分级要求。',
        },
        {
          label: '《生成式人工智能服务管理暂行办法》',
          href: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
          note: '核对面向境内公众提供生成式 AI 服务时的适用边界。',
        },
      ]}
      related={[
        { label: '查看生产护栏', href: '/knowledge/production-guardrails' },
        { label: '划分人机边界', href: '/knowledge/human-ai-boundary' },
        {
          label: '使用生产验收清单',
          href: '/tools/production-acceptance-checklist',
        },
      ]}
    />
  );
}
