import { redirect } from 'next/navigation';
import { memberSession, publicCard } from '@/lib/community-store';
import { WorldShell } from '@/components/world/shell';
import { MemberSpace } from '@/components/world/member-space';
export const metadata = {
  title: '会员空间',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';
export default async function Page() {
  const m = await memberSession();
  if (!m) redirect('/login');
  return (
    <WorldShell>
      <MemberSpace
        initial={{
          ...publicCard(m),
          answers: JSON.parse(m.answers),
          visible: !!m.visible,
          report: m.report,
          attachment: !!m.attachment,
        }}
        preview={process.env.PREVIEW_MODE === 'true'}
      />
    </WorldShell>
  );
}
