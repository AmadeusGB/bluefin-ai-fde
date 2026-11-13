import { SolutionDetail } from '@/components/solution-detail';
export const metadata = {
  title: '美业企业AI应用与FDE方案',
  description:
    '从企业知识沉淀、员工培训与客户沟通切入，围绕单一岗位开展AI试点。',
  alternates: { canonical: '/solutions/beauty-business' },
};
export default function Page() {
  return (
    <SolutionDetail
      slug="beauty-business"
      eyebrow="行业方案 · 美业"
      title="把企业经验，变成团队用得上的知识。"
      intro="整理已有服务资料、常见问题与经过确认的销售经验，辅助员工培训、内容准备和客户沟通。从一个岗位试点，再决定是否扩展。"
      directTitle="哪些工作适合先尝试？"
      directAnswer="优先选择资料检索、员工学习、内容草稿和跟进整理等可复查任务，让管理者能确认知识来源、使用权限与最终输出。"
      problems={[
        '服务资料分散，新人反复询问同样的问题',
        '销售经验依赖个人，难以复用和交接',
        '宣传内容与服务介绍缺少统一审核口径',
        '客户沟通记录难以整理成后续工作清单',
      ]}
      mvd={[
        ['岗位诊断', '选择一个具体岗位和重复任务。'],
        ['知识整理', '将经确认的资料整理为带来源的知识库。'],
        ['试点使用', '辅助培训、问答和沟通草稿，保留人工审核。'],
        ['复盘扩展', '比较查找时间、回答准确率和实际使用情况。'],
      ]}
      boundaries={[
        '本页涉及经营与办公辅助，不提供自动医疗诊断或治疗建议。',
        '客户资料的使用需得到适当授权并按岗位控制权限。',
        '服务效果、价格与重要对外表述由业务负责人确认。',
      ]}
      notFit={[
        '没有可授权使用的服务资料。',
        '希望AI代替专业人员作出医疗判断或保证销售增长。',
      ]}
      evidence="本页根据2026年9月的美业AI/FDE交流资料整理，属于单模块试点构想，尚未作为已交付客户成果发布。"
    />
  );
}
