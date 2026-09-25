import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: '创始团队',
  alternates: { canonical: '/founders' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">THE PEOPLE BEHIND BLUEFIN</p>
        <h1>
          在一线，
          <br />
          一起把事情做成。
        </h1>
        <p className="intro">连接企业经营经验与技术实践。</p>
      </div>
      <div className="founder-grid">
        <Link href="/founders/liuxiang" className="founder-card">
          <Image
            src="/world/founder.webp"
            alt="刘向的讲师介绍照片"
            width="700"
            height="930"
          />
          <div>
            <span>创始人 · 企业AI内训与业务落地</span>
            <h2>
              刘向 <small>大向</small>
              <ArrowUpRight />
            </h2>
          </div>
        </Link>
        <Link
          href="/founders/guobin"
          className="founder-card founder-placeholder"
        >
          <div className="portrait-placeholder">
            <span>GB</span>
            <p>肖像待补充</p>
          </div>
          <div>
            <span>技术总监 · FDE技术落地</span>
            <h2>
              郭斌 <small>Arthur</small>
              <ArrowUpRight />
            </h2>
          </div>
        </Link>
        <div className="founder-card founder-placeholder pending-founder">
          <div className="portrait-placeholder">
            <span>＋</span>
            <p>第三位创始人资料待补充</p>
          </div>
          <div>
            <span>团队档案</span>
            <h2>敬请期待</h2>
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
