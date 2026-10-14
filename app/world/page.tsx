import { WorldShell } from '@/components/world/shell';
import { Gateway } from '@/components/world/gateway';
import './soft-world.css';
export const metadata = {
  title: '进入蓝旗鱼的AI世界',
  alternates: { canonical: '/world' },
};
export default function Page() {
  return (
    <WorldShell back={false} variant="soft">
      <Gateway />
    </WorldShell>
  );
}
