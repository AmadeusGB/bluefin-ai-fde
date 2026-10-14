import { WorldShell } from '@/components/world/shell';
import { RegisterForm } from '@/components/world/register-form';
export const metadata = {
  title: '注册账号',
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <WorldShell>
      <RegisterForm />
    </WorldShell>
  );
}
