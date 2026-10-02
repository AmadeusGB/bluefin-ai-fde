import { companyDescription } from '@/lib/public-copy';
import { siteContent, siteContentUpdatedAt } from '@/lib/site-content';
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  const items = kind
    ? siteContent.filter((item) => item.kind === kind)
    : siteContent;
  return Response.json(
    {
      name: '蓝旗鱼科技内容目录',
      description: companyDescription,
      language: 'zh-CN',
      updatedAt: siteContentUpdatedAt,
      publisher: {
        name: '蓝旗鱼科技',
        id: organizationId,
        url: absoluteUrl('/about'),
      },
      author: {
        name: '蓝旗鱼科技',
        id: organizationId,
        url: absoluteUrl('/about'),
      },
      license: absoluteUrl('/editorial-policy'),
      knowledgeGraph: absoluteUrl('/api/knowledge-graph'),
      count: items.length,
      items: items.map((item) => ({
        ...item,
        id: `${absoluteUrl(item.path)}#content`,
        url: absoluteUrl(item.path),
        language: 'zh-CN',
        dateModified: siteContentUpdatedAt,
        publisherId: organizationId,
        authorId: organizationId,
      })),
    },
    { headers: { 'cache-control': 'public, max-age=3600' } },
  );
}
