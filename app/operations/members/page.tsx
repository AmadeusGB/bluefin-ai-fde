import { WorldShell } from '@/components/world/shell';
import { MembersAdmin } from '@/components/world/members-admin';
export const metadata = {
  title: '会员管理',
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <WorldShell>
      <MembersAdmin />
    </WorldShell>
  );
}
