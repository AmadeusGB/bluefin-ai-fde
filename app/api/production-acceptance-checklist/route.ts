import {
  productionAcceptanceItems,
  productionAcceptanceUpdatedAt,
  productionAcceptanceVersion,
} from '@/lib/production-acceptance-checklist';

const csvCell = (value: string | number) =>
  `"${String(value).replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('format') === 'csv') {
    const rows = [
      [
        'id',
        'category',
        'acceptance_item',
        'required_evidence',
        'status',
        'owner',
        'notes',
      ],
      ...productionAcceptanceItems.map((item) => [
        item.id,
        item.category,
        item.item,
        item.evidence,
        '',
        '',
        '',
      ]),
    ];
    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');
    return new Response(`\uFEFF${csv}`, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="bluefin-ai-production-acceptance-v${productionAcceptanceVersion}.csv"`,
        'cache-control': 'public, max-age=3600',
      },
    });
  }
  return Response.json(
    {
      name: '蓝旗鱼 AI 企业 AI 生产验收清单',
      version: productionAcceptanceVersion,
      updatedAt: productionAcceptanceUpdatedAt,
      count: productionAcceptanceItems.length,
      items: productionAcceptanceItems,
      csv: '/api/production-acceptance-checklist?format=csv',
    },
    { headers: { 'cache-control': 'public, max-age=3600' } },
  );
}
