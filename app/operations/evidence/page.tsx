import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { EvidenceOperations } from '@/components/evidence-operations';
import { authenticatedSiteUser } from '@/lib/site-auth';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: '案例证据运营',
  description: '蓝旗鱼 AI 内部案例证据沉淀与发布审核。',
  robots: { index: false, follow: false },
};
export default async function Page() {
  const user = authenticatedSiteUser(await headers());
  if (!user)
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f2e9] px-5">
        <div className="max-w-lg border border-foreground/15 bg-white p-10">
          <p className="eyebrow text-[#3657d6]">内部运营页面</p>
          <h1 className="mt-4 text-4xl font-black">需要管理员登录</h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            案例原始证据只向指定运营管理员开放。
          </p>
        </div>
      </main>
    );
  return (
    <main className="min-h-screen bg-[#f5f2e9]">
      <EvidenceOperations />
    </main>
  );
}
