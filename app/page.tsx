import type { Metadata } from 'next';
import { Gateway } from '@/components/world/gateway';
import { WorldShell } from '@/components/world/shell';
import './world/soft-world.css';

export const metadata: Metadata = {
  title: '深圳AI培训、个人知识库与企业AI咨询',
  description:
    '深圳市蓝旗鱼科技有限公司提供Codex+Obsidian个人知识库成长系统、深圳线下AI实战培训、工厂与电商企业AI业务梳理咨询，以及协会商会AI会议合作。',
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <WorldShell back={false} variant="soft">
      <Gateway />
    </WorldShell>
  );
}
