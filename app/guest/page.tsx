import Image from 'next/image';
import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import activities from '@/lib/activity-data.json';
export const metadata = {
  title: '游客空间',
  alternates: { canonical: '/guest' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">GUEST SPACE</p>
        <h1>先看看，我们的相聚。</h1>
        <p className="intro">
          无需账号，浏览往期活动与照片，认识蓝旗鱼的伙伴与实践。
        </p>
        <div className="auth-links">
          <Link className="primary-button" href="/register">
            注册加入 AI 俱乐部
          </Link>
          <Link className="secondary-button" href="/login">
            会员登录
          </Link>
        </div>
      </div>
      <div className="notice">
        <strong>当前为游客访问</strong>
        <p>
          可浏览公开活动、照片、企业服务与社群介绍。课件与案例下载、会员名片、个人资料、企业诊断需相应会员权限；管理后台仅管理员可访问。
        </p>
      </div>
      <div className="event-list">
        {activities.map((a, i) => (
          <Link className="event-card" href={`/events/${a.id}`} key={a.id}>
            <Image
              src={a.cover}
              alt={a.title}
              width={1000}
              height={700}
              loading={i ? 'lazy' : 'eager'}
            />
            <div>
              <time>{a.date}</time>
              <h2>{a.title}</h2>
              <span>查看活动回顾 →</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="auth-links">
        <Link href="/world">了解三大社群 →</Link>
        <Link href="/services">了解企业服务 →</Link>
      </div>
    </WorldShell>
  );
}
