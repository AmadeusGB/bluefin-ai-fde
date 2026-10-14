import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { QrCard } from '@/components/world/qr-card';
import { company } from '@/lib/company';

export const metadata = {
  title: '联系我们与官方渠道',
  description:
    '联系蓝旗鱼科技，咨询企业AI内训与FDE落地；查看企业微信、小程序、公众号及刘向的内容渠道。',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">LET’S TALK</p>
        <h1>
          从一个真实问题，
          <br />
          开始聊聊。
        </h1>
        <p className="intro">企业AI内训、业务落地，或一次面对面的交流。</p>
      </div>
      <section className="contact-band" aria-label="联系方式">
        <div>
          <p className="micro accent">深圳 · 北京</p>
          <h2>企业AI内训与FDE咨询</h2>
          <p>
            主要服务粤港澳大湾区及北京。带上你希望改善的一项工作，我们一起梳理。
          </p>
        </div>
        <div className="contact-links">
          <a href={`tel:${company.phone}`}>
            <Phone size={20} />
            {company.phone}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={20} />
            {company.email}
          </a>
          <Link href="/apply">
            填写企业需求 <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="channel-grid" aria-label="微信联系与使用入口">
        <QrCard
          title="添加刘向企业微信"
          label="业务咨询"
          description="沟通企业内训、FDE需求与合作方向。"
          image="/official/wecom-liuxiang.jpg"
          width={1320}
          height={2868}
        />
        <QrCard
          title="蓝旗鱼AI小程序"
          label="产品与工具"
          description="通过微信进入小程序，探索AI内容创作与知识应用。"
          image="/official/miniapp-code.png"
          width={777}
          height={837}
        />
        <QrCard
          title="大向AI实业局"
          label="刘向的视频号"
          description="关注一线经营、AI学习与实践分享。"
          image="/official/channels-code.jpg"
          width={816}
          height={960}
        />
      </section>
      <section className="channel-editorial" aria-label="公众号与抖音">
        <div>
          <h2>在实践中，保持交流。</h2>
          <p>公众号关注企业AI应用；个人内容渠道记录学习、经营与现场实践。</p>
        </div>
        <div className="channel-links">
          <a
            href={company.wechatArticle}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <small>微信公众号</small>
              <strong>{company.wechatName}</strong>
              <span>阅读文章，并进入公众号关注</span>
            </span>
            <ArrowUpRight />
          </a>
          <a href={company.douyin} target="_blank" rel="noopener noreferrer">
            <span>
              <small>刘向的内容渠道</small>
              <strong>抖音主页</strong>
              <span>查看更多作品</span>
            </span>
            <ArrowUpRight />
          </a>
        </div>
      </section>
      <section className="product-preview">
        <div>
          <h2>
            把想法，
            <br />
            带进日常工作。
          </h2>
          <p>
            小程序界面提供知识库、文案、数字人口播和营销海报等功能入口。具体可用功能以小程序内当前展示为准。
          </p>
          <a
            className="text-link"
            href="/official/miniapp-code.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看小程序码 <ArrowUpRight size={18} />
          </a>
        </div>
        <Image
          src="/official/miniapp-screen.jpg"
          alt="蓝旗鱼AI小程序界面，包含知识库、文案、数字人口播与营销海报入口"
          width={1280}
          height={2781}
          sizes="(max-width: 700px) 80vw, 320px"
        />
      </section>
    </WorldShell>
  );
}
