import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { GeoOperations } from '@/components/geo-operations';
import { authenticatedSiteUser } from '@/lib/site-auth';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'GEO 测量运营',
  description: '蓝旗鱼 AI 内部 GEO 引用与品类关联持续测量看板。',
  robots: { index: false, follow: false },
};
export default async function Page() {
  const user = authenticatedSiteUser(await headers());
  if (!user)
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f2e9] px-5">
        <div className="max-w-lg border border-foreground/15 bg-white p-10">
          <p className="eyebrow text-[#147e66]">内部运营页面</p>
          <h1 className="mt-4 text-4xl font-black">需要管理员登录</h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            该看板只向指定运营管理员开放。
          </p>
        </div>
      </main>
    );
  return (
    <main className="min-h-screen bg-[#f5f2e9]">
      <GeoOperations />
    </main>
  );
}
