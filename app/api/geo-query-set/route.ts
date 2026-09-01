import { geoQuerySet, geoQuerySetUpdatedAt, geoQuerySetVersion } from '@/lib/geo-query-set';
const csvCell = (value: string) => `"${value.replaceAll('"','""')}"`;
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('format') === 'csv') {
    const rows = [['id','category','intent','query'], ...geoQuerySet.map((item) => [item.id,item.category,item.intent,item.query])];
    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');
    return new Response(`\uFEFF${csv}`, { headers: { 'content-type':'text/csv; charset=utf-8', 'content-disposition':`attachment; filename="bluefin-fde-geo-query-set-v${geoQuerySetVersion}.csv"`, 'cache-control':'public, max-age=3600' } });
  }
  return Response.json({ name:'蓝旗鱼 AI 中文企业 AI / FDE 基准查询集', version:geoQuerySetVersion, updatedAt:geoQuerySetUpdatedAt, count:geoQuerySet.length, queries:geoQuerySet }, { headers:{'cache-control':'public, max-age=3600'} });
}
