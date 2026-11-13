import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { WorldShell } from '@/components/world/shell';
import { QrCard } from '@/components/world/qr-card';
import { company } from '@/lib/company';

export const metadata = {
  title: '联系我们与官方渠道',
  description:
    '联系蓝旗鱼科技，咨询个人知识库、深圳线下AI培训、企业AI业务梳理或协会商会AI会议合作。',
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
        <p className="intro">
          个人知识库、深圳线下培训、企业AI咨询，或一场协会商会AI活动。
        </p>
      </div>
      <section className="contact-band" aria-label="联系方式">
        <div>
          <p className="micro accent">深圳办公 · 服务大湾区及北京</p>
          <h2>四类AI需求，一个直接入口</h2>
          <p>
            主要服务粤港澳大湾区及北京。告诉我们你目前的基础、所在城市和希望解决的问题，我们会按对应方向沟通。
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
            填写企业AI需求 <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="channel-grid" aria-label="微信联系与使用入口">
        <QrCard
          title="添加刘向个人微信"
          label="个人微信 · 刘向"
          description="适合直接沟通个人知识库、深圳线下培训、企业AI咨询与会议合作。"
          image="/official/wechat-liuxiang-personal-20261113.jpg"
          width={888}
          height={1131}
          featured
        />
        <QrCard
          title="添加刘向企业微信"
          label="企业微信 · 业务咨询"
          description="适合企业需求、培训安排、方案咨询与后续项目沟通。"
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
          image="/official/channels-daxiang-ai-shiyiju-20261113.jpg"
          width={708}
          height={960}
        />
        <QrCard
          title="大向AI实业局"
          label="刘向的抖音"
          description={`抖音号 ${company.douyinPersonal.id}，记录经营、AI学习与业务实践。`}
          image="/official/douyin-daxiang-ai-shiyiju-20261113.jpg"
          width={1125}
          height={1680}
          instruction="使用抖音扫一扫，或保存原图后在抖音中识别。"
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
              <span>微信号：{company.wechatId}</span>
            </span>
            <ArrowUpRight />
          </a>
          <a href={company.douyin} target="_blank" rel="noopener noreferrer">
            <span>
              <small>抖音内容渠道</small>
              <strong>{company.douyinPersonal.name}</strong>
              <span>
                抖音号：{company.douyinPersonal.id} · 企业账号：
                {company.douyinCompanyName}
              </span>
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
          src="/official/miniapp-screen-20261113.jpg"
          alt="蓝旗鱼AI小程序界面，包含知识库、文案、数字人口播与营销海报入口"
          width={1280}
          height={2781}
          sizes="(max-width: 700px) 80vw, 320px"
        />
      </section>
    </WorldShell>
  );
}
