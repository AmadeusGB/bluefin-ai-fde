import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Factory,
  Handshake,
  Presentation,
} from 'lucide-react';
import { company, founders } from '@/lib/company';
import { MarlinMark } from './marlin-mark';
import { PersonalWechatTrigger } from './personal-wechat-trigger';
import { ReportList } from './report-list';

/* finesse · register=brand · A=midnight+ice-blue · B=FangYuan700/450 · C=service-mosaic+evidence-rail · D=pointer-depth+quiet-hover · E=official-marlin+field-photography · SOUL=8 SPECTACLE=6 DENSITY=6 */

const businesses = [
  {
    key: 'personal',
    title: 'Codex + Obsidian\n个人知识库成长系统',
    label: 'PERSONAL AI SYSTEM',
    detail:
      '从AI小白开始，装好工具、留下经验、学会调用，让个人知识库持续成长。',
    href: '/services/personal-knowledge',
    action: '查看个人AI方案',
    icon: BookOpenCheck,
    image: '/world/personal-knowledge-city-v1.webp',
  },
  {
    key: 'training',
    title: '深圳线下\nAI实战培训',
    label: 'SHENZHEN TRAINING',
    detail: '现场完成Codex实操、AI出图、Skills调用与真实工作练习。',
    href: '/training',
    action: '查看培训内容',
    icon: Presentation,
    image: '/world/foundation-0912-0.webp',
  },
  {
    key: 'consulting',
    title: '工厂与电商\nAI业务梳理咨询',
    label: 'BUSINESS CONSULTING',
    detail: '先盘点系统、流程与数据，再识别值得投入的AI场景和试点顺序。',
    href: '/services#enterprise-consulting',
    action: '了解企业咨询',
    icon: Factory,
    image: '/world/enterprise-factory-ecommerce-v1.webp',
  },
  {
    key: 'association',
    title: '协会商会\nAI会议合作',
    label: 'EVENT COLLABORATION',
    detail: '主题演讲、专题培训、圆桌交流、共创工作坊与企业走访。',
    href: '/partners',
    action: '洽谈会议合作',
    icon: Handshake,
    image: '/world/salon-0919-0.webp',
  },
] as const;

const directAnswers = [
  {
    question: '蓝旗鱼科技是做什么的？',
    answer:
      '为个人提供AI知识库与实战培训，为工厂、电商企业提供AI业务梳理咨询，并承接协会商会AI会议合作。',
    href: '/about',
  },
  {
    question: '个人知识库系统适合谁？',
    answer:
      '适合刚接触AI、资料长期零散，或希望把经历、学习与工作沉淀为个人知识体系的人。',
    href: '/services/personal-knowledge',
  },
  {
    question: '企业AI咨询怎么开始？',
    answer:
      '先梳理现有系统、流程、数据、重复工作和负责人，再判断培训、工具或FDE实施路径。',
    href: '/services#enterprise-consulting',
  },
  {
    question: '协会商会可以合作什么？',
    answer: '可沟通AI主题演讲、专题课程、圆桌交流、共创工作坊与企业走访。',
    href: '/partners',
  },
] as const;

export function Gateway() {
  return (
    <div className="gateway">
      <section className="gateway-hero" aria-labelledby="home-title">
        <Image
          className="gateway-ocean"
          src="/world/ocean-night.webp"
          alt=""
          width={1920}
          height={640}
          priority
          sizes="100vw"
        />
        <div className="gateway-title">
          <p className="gateway-eyebrow">深圳AI实战培训 · 企业AI咨询</p>
          <h1 id="home-title">
            让AI真正进入，
            <br />
            <span>个人成长与企业业务。</span>
          </h1>
          <p>
            {company.legalName}
            ，为个人与企业提供清晰、可实践、可继续推进的AI服务。
          </p>
          <div className="gateway-actions">
            <Link href="#services" className="gateway-primary-action">
              选择我的AI方案 <ArrowRight size={18} />
            </Link>
            <PersonalWechatTrigger />
          </div>
        </div>
        <div className="gateway-marlin">
          <MarlinMark priority />
        </div>
      </section>

      <dl className="home-fact-band" aria-label="蓝旗鱼科技基本信息">
        <div>
          <dt>法定主体</dt>
          <dd>{company.legalName}</dd>
        </div>
        <div>
          <dt>成立时间</dt>
          <dd>{company.founded}</dd>
        </div>
        <div>
          <dt>办公城市</dt>
          <dd>{company.offices.join(' · ')}</dd>
        </div>
        <div>
          <dt>服务区域</dt>
          <dd>{company.regions.join(' · ')}</dd>
        </div>
      </dl>

      <section
        className="business-section"
        id="services"
        aria-labelledby="business-title"
      >
        <div className="business-heading">
          <div>
            <p className="micro accent">WHAT WE DO</p>
            <h2 id="business-title">四项主营业务</h2>
          </div>
          <p>从个人工具安装与成长，到企业业务梳理与行业交流。</p>
        </div>
        <div className="business-grid">
          {businesses.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                key={item.key}
                className={`business-card business-${item.key}`}
              >
                {item.image && (
                  <Image
                    className="business-card-image"
                    src={item.image}
                    alt=""
                    width={920}
                    height={620}
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                )}
                <div className="business-card-top">
                  <span>{item.label}</span>
                  <Icon size={23} aria-hidden="true" />
                </div>
                <div className="business-card-copy">
                  <h3>
                    {item.title.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <p>{item.detail}</p>
                  <span className="business-card-link">
                    {item.action} <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-proof-section" aria-labelledby="proof-title">
        <div className="home-proof-intro">
          <div>
            <h2 id="proof-title">真实活动与官方报道</h2>
          </div>
          <p>
            公开页面只记录已经发生、可以回查来源的分享与合作，不把课堂作品或方案构想包装成客户成果。
          </p>
        </div>
        <div className="home-proof-layout">
          <Link href="/events" className="home-proof-photo">
            <Image
              src="/world/salon-0919-0.webp"
              alt="蓝旗鱼线下AI分享活动现场"
              width={1400}
              height={850}
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <span>
              查看往期活动 <ArrowUpRight size={18} />
            </span>
          </Link>
          <ReportList slugs={['agic-2026', 'kaiping-2026']} />
        </div>
      </section>

      <section className="home-team-section" aria-labelledby="team-title">
        <div className="home-team-heading">
          <div>
            <h2 id="team-title">从经营、技术到业务合作</h2>
          </div>
          <Link href="/founders">
            查看创始团队 <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="home-team-list">
          {founders.map((founder) => (
            <Link href={`/founders/${founder.slug}`} key={founder.slug}>
              <Image
                src={founder.image}
                alt={`${founder.name}，${founder.role}`}
                width={founder.width}
                height={founder.height}
                sizes="(max-width: 760px) 72px, 88px"
              />
              <span>
                <strong>{founder.name}</strong>
                <small>{founder.role}</small>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-answer-section" aria-labelledby="answer-title">
        <div className="home-answer-heading">
          <h2 id="answer-title">关于蓝旗鱼和AI服务，直接回答。</h2>
        </div>
        <div className="home-answer-list">
          {directAnswers.map((item) => (
            <Link href={item.href} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <Link href="/answers" className="home-all-answers">
          查看完整问题答案库 <ArrowRight size={18} />
        </Link>
      </section>

      <section className="home-contact-cta" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">告诉我们，你现在最想解决什么。</h2>
          <p>
            个人知识库、深圳线下培训、企业AI业务梳理或协会会议合作，都可以先从一次清晰沟通开始。
          </p>
        </div>
        <div className="home-contact-actions">
          <Link href="/contact">
            联系蓝旗鱼 <ArrowUpRight size={18} />
          </Link>
          <a href={`tel:${company.phone}`}>{company.phone}</a>
        </div>
      </section>
    </div>
  );
}
