import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  return {
    title: person === 'liuxiang' ? '刘向｜创始人' : '郭斌｜技术总监',
    alternates: { canonical: `/founders/${person}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  if (!['liuxiang', 'guobin'].includes(person)) notFound();
  return (
    <WorldShell>
      <div className="founder-profile">
        {person === 'liuxiang' ? (
          <Image
            src="/world/founder.webp"
            alt="刘向"
            width="700"
            height="930"
          />
        ) : (
          <div className="portrait-placeholder">
            <span>GB</span>
            <p>肖像待补充</p>
          </div>
        )}
        <article>
          <p className="micro accent">BLUEFIN TEAM</p>
          <h1>{person === 'liuxiang' ? '刘向' : '郭斌'}</h1>
          <p className="intro">
            {person === 'liuxiang'
              ? '大向 · 蓝旗鱼科技创始人'
              : 'Arthur · 蓝旗鱼技术总监'}
          </p>
          <h2>
            {person === 'liuxiang'
              ? '让AI与企业实际需求连接'
              : '围绕真实场景，推进技术落地'}
          </h2>
          <p>
            {person === 'liuxiang'
              ? '围绕企业AI内训与AI方案落地，开展课程分享、业务场景交流和实践协作。'
              : '参与企业FDE技术落地与实践交流，关注从业务需求到系统实施的协作过程。'}
          </p>
          <p className="notice">详细履历与资质背书正在核对，确认后补充。</p>
        </article>
      </div>
    </WorldShell>
  );
}
