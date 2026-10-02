import { WorldShell } from '@/components/world/shell';
import { LoginForm } from '@/components/world/login-form';
export const metadata = {
  title: '会员登录',
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <WorldShell>
      <LoginForm />
    </WorldShell>
  );
}
