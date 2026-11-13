import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  ImageIcon,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { siteUrl } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: 'Codex + Obsidian 个人知识库成长系统',
  description:
    '面向AI小白的Codex与Obsidian个人知识库安装、基础训练、常用Skills、AI出图、经历梳理与行动规划服务。',
  alternates: { canonical: '/services/personal-knowledge' },
};

const stages = [
  {
    icon: Layers3,
    title: '先装好',
    detail: '安装Codex与Obsidian，完成基础配置、目录结构与备份说明。',
  },
  {
    icon: BookOpenCheck,
    title: '把经验留下来',
    detail: '整理个人资料、项目、经历与长期关注的问题，形成可继续维护的知识结构。',
  },
  {
    icon: Sparkles,
    title: '学会直接调用',
    detail: '安装并练习常用Skills，让AI参与检索、整理、写作与日常工作。',
  },
  {
    icon: ImageIcon,
    title: '做出第一批成果',
    detail: '练习AI出图、资料拆解和复盘，形成未来目标与下一步行动清单。',
  },
];

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Codex + Obsidian 个人知识库成长系统',
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
      <div className="page-heading personal-system-hero">
        <p className="micro accent">CODEX × OBSIDIAN</p>
        <h1>
          从AI小白，
          <br />
          到拥有一套会成长的个人知识库。
        </h1>
        <p className="intro">
          安装只是第一步。我们会一起把工具、个人资料、常用Skills和真实练习连起来，让知识能够留下、找得到，也能在需要时用起来。
        </p>
      </div>

      <section className="knowledge-growth-map" aria-label="个人知识库成长路径">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <article key={stage.title}>
              <div className="growth-index">0{index + 1}</div>
              <Icon aria-hidden="true" />
              <h2>{stage.title}</h2>
              <p>{stage.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="editorial-split personal-system-split">
        <div>
          <p className="micro accent">适合谁</p>
          <h2>先解决“不会开始”和“资料越积越乱”。</h2>
        </div>
        <div>
          <p>
            适合刚接触AI、想系统学习的人；也适合已有很多资料、经历和想法，却一直没有形成个人知识体系的人。
          </p>
          <ul>
            <li>不知道Codex和Obsidian怎么安装、怎么配合</li>
            <li>收藏了很多内容，真正需要时却找不到</li>
            <li>想用AI整理经历、能力、长期主题与未来方向</li>
            <li>希望把AI出图、写作和常用Skills接进日常工作</li>
          </ul>
        </div>
      </section>

      <section className="public-reading">
        <p className="micro accent">SERVICE BOUNDARY</p>
        <h2>一次服务会留下什么</h2>
        <ol>
          <li>
            <strong>可运行的本地工具。</strong>
            完成安装与基础配置，并说明数据目录、备份和后续维护方式。
          </li>
          <li>
            <strong>可继续扩展的知识库结构。</strong>
            根据你的资料与目标搭出起步结构，不复制一套空模板就结束。
          </li>
          <li>
            <strong>一套真实上手练习。</strong>
            练习资料整理、知识检索、AI出图与Skills调用，让你能独立完成下一次操作。
          </li>
          <li>
            <strong>一份成长与行动梳理。</strong>
            用AI帮助复盘过往经历、识别长期主题，并形成可执行的未来行动清单；不做人生预测。
          </li>
        </ol>
      </section>

      <section className="privacy-callout">
        <div>
          <p className="micro accent">资料与隐私</p>
          <h2>你的知识库，先明确存在哪里、谁能访问。</h2>
        </div>
        <p>
          安装前会说明本地文件、同步与外部模型之间的区别。涉及账号、公司资料或个人隐私时，先确认权限和处理边界，再决定哪些内容可以进入AI工作流。
        </p>
      </section>

      <div className="diagnostic-callout">
        <div>
          <h2>想先看看适不适合你？</h2>
          <p>告诉我们你目前使用的电脑、已有资料和最想解决的问题，再确定安装与训练范围。</p>
        </div>
        <Link href="/contact" className="primary-button">
          咨询个人知识库 <ArrowRight size={18} />
        </Link>
      </div>
    </WorldShell>
  );
}
