import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: '关于蓝旗鱼科技',
  description: '蓝旗鱼科技专注企业AI内训与企业AI方案落地（FDE）。',
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
          <p>
            深圳市蓝旗鱼科技有限公司围绕企业真实需求，提供企业AI内训与企业AI方案落地（FDE）服务，帮助团队建立应用能力，推进方案设计、实施与应用。
          </p>
          <p>
            我们同时通过AI俱乐部、FDE联盟和AI企业家联盟，连接学习者、实践者与企业负责人，开展学习交流、实践协作和企业应用探索。
          </p>
          <Link href="/services" className="text-link">
            了解两项核心服务 <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
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
    </WorldShell>
  );
}
