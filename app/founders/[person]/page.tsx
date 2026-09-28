import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WorldShell } from '@/components/world/shell';
const zouBio =
  '拥有12年实体企业经营与商务实战经验，长期深耕企业客户合作、业务拓展与项目落地。现专注企业AI应用与FDE实践，持续参与AI线下沙龙、企业走访及项目需求对接，擅长从经营与业务视角发现企业真实需求，连接客户与技术团队，推动AI智能体、AI超级员工等解决方案在企业实际业务中落地。';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  if (!['liuxiang', 'guobin', 'zouyingpeng'].includes(person)) notFound();
  return {
    title:
      person === 'liuxiang'
        ? '刘向｜创始人'
        : person === 'guobin'
          ? '郭斌｜技术总监'
          : '邹英鹏｜联合创始人',
    ...(person === 'zouyingpeng' ? { description: zouBio } : {}),
    alternates: { canonical: `/founders/${person}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person } = await params;
  if (!['liuxiang', 'guobin', 'zouyingpeng'].includes(person)) notFound();
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
            <span>{person === 'guobin' ? 'GB' : 'ZYP'}</span>
            <p>肖像待补充</p>
          </div>
        )}
        <article>
          <p className="micro accent">BLUEFIN TEAM</p>
          <h1>
            {person === 'liuxiang'
              ? '刘向'
              : person === 'guobin'
                ? '郭斌'
                : '邹英鹏'}
          </h1>
          <p className="intro">
            {person === 'liuxiang'
              ? '大向 · 蓝旗鱼科技创始人'
              : person === 'guobin'
                ? 'Arthur · 蓝旗鱼技术总监'
                : '蓝旗鱼科技联合创始人 · 企业合作与业务落地'}
          </p>
          <h2>
            {person === 'liuxiang'
              ? '让AI与企业实际需求连接'
              : person === 'guobin'
                ? '围绕真实场景，推进技术落地'
                : '从经营与业务视角，连接企业需求与AI实践'}
          </h2>
          <p>
            {person === 'liuxiang'
              ? '围绕企业AI内训与AI方案落地，开展课程分享、业务场景交流和实践协作。'
              : person === 'guobin'
                ? '参与企业FDE技术落地与实践交流，关注从业务需求到系统实施的协作过程。'
                : zouBio}
          </p>
          {person !== 'zouyingpeng' && (
            <p className="notice">详细履历与资质背书正在核对，确认后补充。</p>
          )}
        </article>
      </div>
    </WorldShell>
  );
}
