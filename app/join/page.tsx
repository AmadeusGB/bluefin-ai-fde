import { WorldShell } from '@/components/world/shell';
import { JoinForm } from '@/components/world/join-form';
import { RegisterForm } from '@/components/world/register-form';
import { isSection } from '@/lib/community-fields';
export const metadata = {
  title: '加入蓝旗鱼',
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  return (
    <WorldShell>
      {isSection(section) && section !== 'club' ? (
        <JoinForm section={section} />
      ) : (
        <RegisterForm />
      )}
    </WorldShell>
  );
}
