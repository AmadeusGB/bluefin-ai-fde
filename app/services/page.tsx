import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { companyDescription, serviceQuestions } from '@/lib/public-copy';

export const metadata = {
  title: '蓝旗鱼主营业务｜个人知识库、深圳AI培训与企业咨询',
  description: companyDescription,
  alternates: { canonical: '/services' },
};

const services = [
  {
    label: 'PERSONAL AI SYSTEM',
    title: 'Codex + Obsidian 个人知识库成长系统',
    description:
      '面向刚接触AI、希望系统整理经历与知识的人，完成工具安装、知识库结构、常用Skills与上手训练。',
    points: [
      'Codex与Obsidian安装、基础配置和备份说明',
      'AI入门、个人资料整理与知识调用练习',
      'AI出图、常用Skills与个人工作流上手',
      '梳理过往经历，形成未来目标与行动清单',
    ],
    href: '/services/personal-knowledge',
    action: '了解个人成长系统',
  },
  {
    label: 'SHENZHEN AI TRAINING',
    title: '深圳线下AI实战培训',
    description:
      '以小班现场实操为主，从工具入门到真实工作练习，让学员在课堂上完成可继续使用的成果。',
    points: [
      'Codex与AI工具基础操作',
      'AI出图、内容生产与Skills调用',
      '个人知识库、工作流与智能体体验',
      '基础班、高阶班及企业专题培训',
    ],
    href: '/training',
    action: '查看深圳培训内容',
  },
  {
    label: 'BUSINESS CONSULTING',
    title: '工厂与电商AI业务梳理咨询',
    description:
      '针对工厂与电商团队，先看现有系统、人员、数据与流程，再判断哪些问题值得进入AI试点。',
    points: [
      '盘点现有软件、表格、岗位与数据流',
      '梳理重复任务、异常节点与责任边界',
      '评估AI机会、优先级与最小试点范围',
      '需要实施时再进入FDE方案与交付',
    ],
    href: '/solutions',
    action: '了解企业咨询路径',
    id: 'enterprise-consulting',
  },
  {
    label: 'ASSOCIATION EVENTS',
    title: '协会商会AI会议合作',
    description:
      '面向协会、商会、园区与企业家组织，围绕AI认知、商业应用与现场实操设计合作内容。',
    points: [
      'AI趋势与企业应用主题演讲',
      '企业AI与Codex专题培训',
      '圆桌对谈、企业走访与案例拆解',
      '结合行业问题的共创工作坊',
    ],
    href: '/partners',
    action: '洽谈会议合作',
  },
];

export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">BLUEFIN SERVICES</p>
        <h1>
          从个人成长，
          <br />
          到企业现场。
        </h1>
        <p className="intro">{companyDescription}</p>
      </div>

      <div className="service-editorial service-editorial-four">
        {services.map((service) => (
          <article key={service.title} id={service.id}>
            <span className="micro accent">{service.label}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link className="primary-button" href={service.href}>
              {service.action} <ArrowUpRight size={18} />
            </Link>
          </article>
        ))}
      </div>

      <section className="public-reading">
        <p className="micro accent">HOW TO START</p>
        <h2>先确认你要解决的是哪一类问题。</h2>
        <ol>
          <li>
            <strong>个人刚开始接触AI。</strong>
            先完成工具安装、个人知识库与基础使用训练。
          </li>
          <li>
            <strong>希望现场学会并做出作品。</strong>
            选择深圳线下实战培训，按当期课程安排报名。
          </li>
          <li>
            <strong>工厂或电商有具体业务问题。</strong>
            先做系统、流程、岗位与数据梳理，再确定试点范围。
          </li>
          <li>
            <strong>协会商会希望组织AI活动。</strong>
            明确参会人群、行业背景与会议目标后共同设计内容。
          </li>
        </ol>
        <div className="auth-links">
          <Link href="/events">查看往期课程与活动 →</Link>
          <Link href="/solutions/manufacturing-supply-chain">
            查看工厂咨询方向 →
          </Link>
          <Link href="/solutions/cross-border-ecommerce">
            查看电商咨询方向 →
          </Link>
          <Link href="/contact">添加企业微信咨询 →</Link>
        </div>
      </section>

      <section className="faq-block">
        <h2>开始之前，常问的问题</h2>
        {serviceQuestions.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <div className="diagnostic-callout">
        <div>
          <h2>不确定从哪项开始？</h2>
          <p>
            带上你的基础情况、目前最想解决的一件事，以及已有工具或资料，我们先判断更适合个人系统、培训还是企业咨询。
          </p>
        </div>
        <Link href="/contact" className="primary-button">
          联系蓝旗鱼 <ArrowRight size={18} />
        </Link>
      </div>
      <Link href="/apply" className="text-link">
        企业可直接提交业务梳理需求 <ArrowUpRight size={17} />
      </Link>
    </WorldShell>
  );
}
