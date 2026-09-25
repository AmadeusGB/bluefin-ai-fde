import { authenticatedSiteUser } from '@/lib/site-auth';
import { communityDB } from '@/lib/community-store';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
export async function GET(req: Request) {
  if (!authenticatedSiteUser(req.headers))
    return new Response('需要管理员登录', { status: 401 });
  const row = communityDB()
    .prepare('SELECT attachment FROM community_members WHERE id=?')
    .get(new URL(req.url).searchParams.get('id') || '') as
    | { attachment: string | null }
    | undefined;
  if (!row?.attachment) return new Response('没有附件', { status: 404 });
  try {
    return new Response(
      await readFile(resolve('./data/uploads', row.attachment)),
      {
        headers: {
          'Content-Type': row.attachment.endsWith('.png')
            ? 'image/png'
            : 'image/jpeg',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        },
      },
    );
  } catch {
    return new Response('附件未找到', { status: 404 });
  }
}
