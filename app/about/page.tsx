import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ArrowUpRight } from 'lucide-react';
import { companyDescription } from '@/lib/public-copy';
import { company } from '@/lib/company';
import { ReportList } from '@/components/world/report-list';
export const metadata = {
  title: '关于蓝旗鱼科技',
  description: companyDescription,
  alternates: { canonical: '/about' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">ABOUT BLUEFIN</p>
        <h1>
          让AI走出想象，
          <br />
          进入业务现场。
        </h1>
        <p className="intro">蓝旗鱼科技，专注企业AI内训与AI方案落地。</p>
      </div>
      <div className="about-statement">
        <span className="micro">我们的工作</span>
        <div>
          <h2>
            从团队会用，
            <br />
            到业务用起来。
          </h2>
          <p>{companyDescription}</p>
          <p>
            面向工厂、实体门店、电商等企业的管理者与业务骨干，从一项具体任务出发，连接学习、试点与实际使用。
          </p>
          <Link href="/services" className="text-link">
            了解两项核心服务 <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <dl className="company-facts">
        <div>
          <dt>公司全称</dt>
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
        <div>
          <dt>业务咨询</dt>
          <dd>
            <a href={`tel:${company.phone}`}>{company.phone}</a>
          </dd>
        </div>
        <div>
          <dt>联系邮箱</dt>
          <dd>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </dd>
        </div>
      </dl>
      <div className="photo-strip">
        <Image
          src="/world/salon-0919-0.webp"
          alt="蓝旗鱼AI俱乐部线下分享沙龙合影"
          width="1400"
          height="850"
        />
        <span>2026.09.19 · 线下分享沙龙</span>
      </div>
      <div className="about-method">
        <h2>探索。实践。共创。</h2>
        <div>
          <p>
            <strong>探索</strong>从业务问题出发，理解AI的能力与边界。
          </p>
          <p>
            <strong>实践</strong>在具体任务中学习，在真实样本中验证。
          </p>
          <p>
            <strong>共创</strong>让业务负责人、工程师和使用者共同参与。
          </p>
        </div>
      </div>
      <Link href="/founders" className="wide-link">
        认识创始团队 <ArrowUpRight />
      </Link>
      <section className="content-section">
        <div className="section-heading">
          <p className="micro accent">公开报道</p>
          <h2>在交流中，推动实践。</h2>
        </div>
        <ReportList />
      </section>
      <Link href="/contact" className="wide-link">
        联系我们与官方渠道 <ArrowUpRight />
      </Link>
    </WorldShell>
  );
}
