import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MessagesSquare,
  Mic2,
  Presentation,
  UsersRound,
} from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { ReportList } from '@/components/world/report-list';
import { siteUrl } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: '协会商会AI会议合作',
  description:
    '蓝旗鱼科技面向协会、商会、园区与企业家组织提供AI主题演讲、专题培训、圆桌对谈和共创工作坊合作。',
  alternates: { canonical: '/partners' },
};

const formats = [
  {
    icon: Mic2,
    title: '主题演讲',
    detail: '结合参会人群与行业背景，讲清AI趋势、企业应用与真实落地边界。',
  },
  {
    icon: Presentation,
    title: '专题培训',
    detail: '围绕Codex、AI工具、企业场景或FDE方法设计半天、一天或系列课程。',
  },
  {
    icon: MessagesSquare,
    title: '圆桌对谈',
    detail: '围绕企业经营者关心的真实问题，组织案例拆解、提问与现场讨论。',
  },
  {
    icon: UsersRound,
    title: '共创工作坊',
    detail: '让参与者带着业务问题来，现场梳理任务、流程和可尝试的AI场景。',
  },
];

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '协会商会AI会议合作',
    description: metadata.description,
    provider: {
      '@type': 'Organization',
      name: '蓝旗鱼科技',
      url: siteUrl,
    },
    areaServed: { '@type': 'Country', name: '中国' },
  };

  return (
    <WorldShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="page-heading">
        <p className="micro accent">ASSOCIATIONS · CHAMBERS · EVENTS</p>
        <h1>
          把AI讲清楚，
          <br />
          也把下一步带回组织。
        </h1>
        <p className="intro">
          欢迎协会、商会、园区与企业家组织洽谈AI会议合作。我们会根据行业、参会人群和会议目标，共同设计能听懂、能讨论、能带走的内容。
        </p>
      </div>

      <section className="knowledge-growth-map event-format-grid" aria-label="会议合作形式">
        {formats.map((format, index) => {
          const Icon = format.icon;
          return (
            <article key={format.title}>
              <div className="growth-index">0{index + 1}</div>
              <Icon aria-hidden="true" />
              <h2>{format.title}</h2>
              <p>{format.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="public-reading">
        <p className="micro accent">CO-CREATE THE AGENDA</p>
        <h2>先确认四件事，再定会议内容。</h2>
        <ol>
          <li>
            <strong>参会者是谁。</strong>
            企业负责人、管理者、一线员工或创业者，关注的问题并不相同。
          </li>
          <li>
            <strong>希望解决什么。</strong>
            是建立AI认知、学习工具、寻找业务场景，还是推动一次行业交流。
          </li>
          <li>
            <strong>现场如何参与。</strong>
            确认演讲、实操、圆桌、企业走访或工作坊的组合方式。
          </li>
          <li>
            <strong>会后留下什么。</strong>
            可以是学习资料、问题清单、场景地图或下一次深入沟通的方向。
          </li>
        </ol>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="micro accent">公开活动与报道</p>
          <h2>可核查的公开交流记录</h2>
          <p>
            以下内容用于说明公开活动主题与参与角色，不把一次分享包装成客户实施结果。
          </p>
        </div>
        <ReportList />
      </section>

      <div className="diagnostic-callout">
        <div>
          <h2>准备一场AI主题活动？</h2>
          <p>
            告诉我们主办方、参会人群、城市、预计时间和希望达成的目标，我们再共同确认主题、形式与合作范围。
          </p>
        </div>
        <Link href="/contact" className="primary-button">
          洽谈会议合作 <ArrowRight size={18} />
        </Link>
      </div>
    </WorldShell>
  );
}
