import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { breadcrumbList, StructuredData } from '@/components/structured-data';
import {
  productionAcceptanceGroups,
  productionAcceptanceItems,
  productionAcceptanceUpdatedAt,
  productionAcceptanceVersion,
} from '@/lib/production-acceptance-checklist';
import { organizationId, siteUrl } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: '企业 AI 生产验收清单',
  description:
    '28 项企业 AI 生产验收清单，覆盖业务结果、真实任务、系统运行、数据安全、人机边界、采用运营与交接退出。',
  alternates: { canonical: '/tools/production-acceptance-checklist' },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DigitalDocument',
        '@id': `${siteUrl}/tools/production-acceptance-checklist#document`,
        name: '蓝旗鱼 AI 企业 AI 生产验收清单',
        description: metadata.description,
        url: `${siteUrl}/tools/production-acceptance-checklist`,
        version: productionAcceptanceVersion,
        dateModified: productionAcceptanceUpdatedAt,
        inLanguage: 'zh-CN',
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
        encoding: {
          '@type': 'MediaObject',
          encodingFormat: 'text/csv',
          contentUrl: `${siteUrl}/api/production-acceptance-checklist?format=csv`,
        },
      },
      breadcrumbList([
        { name: '首页', path: '/' },
        { name: 'FDE 工具与模板', path: '/tools' },
        {
          name: '企业 AI 生产验收清单',
          path: '/tools/production-acceptance-checklist',
        },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow={`生产部署工具 · v${productionAcceptanceVersion}`}
          title="上线之前，逐项证明系统已经可以被企业接管。"
          intro="这份 28 项清单同时检查业务结果、真实任务、运行、安全、人机边界、采用和交接。任何关键红线缺少证据时，都不应仅凭 Demo 或功能完成度宣布生产验收。"
        />
        <section className="px-5 py-18 lg:px-10">
          <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-7 border border-foreground/15 bg-[#e7eaff] p-7 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#3657d6]">公开可复用资产</p>
              <h2 className="mt-3 text-3xl font-black">
                {productionAcceptanceItems.length} 项 · 7 个验收维度
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                CSV 预留状态、负责人和备注字段，可直接用于项目验收会议。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={
                  <a
                    href="/api/production-acceptance-checklist?format=csv"
                    download
                    aria-label="下载企业 AI 生产验收清单 CSV"
                  />
                }
                className="rounded-none"
              >
                下载 CSV <ArrowDownToLine />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/api/production-acceptance-checklist" />}
                variant="outline"
                className="rounded-none bg-transparent"
              >
                查看 JSON
              </Button>
            </div>
          </div>
        </section>
        <section className="px-5 pb-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-6 lg:grid-cols-2">
            {productionAcceptanceGroups.map((group, groupIndex) => (
              <article
                key={group.key}
                className="border border-foreground/15 bg-white p-7"
              >
                <span className="text-xs font-bold text-[#3657d6]">
                  0{groupIndex + 1}
                </span>
                <h2 className="mt-3 text-3xl font-black">{group.label}</h2>
                <ol className="mt-6 space-y-5">
                  {group.items.map(([item, evidence], index) => (
                    <li
                      key={item}
                      className="border-t border-foreground/15 pt-4"
                    >
                      <p className="font-bold leading-6">
                        {index + 1}. {item}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        需要证据：{evidence}
                      </p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-18 text-white lg:px-10">
          <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#cdd5ff]">验收之后</p>
              <h2 className="mt-4 text-4xl font-black">
                继续用 30/60/90 天复查真实采用与结果。
              </h2>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/tools/30-60-90-review" />}
              className="h-12 rounded-none bg-[#cdd5ff] text-[#0b1238] hover:bg-white"
            >
              进入复查工具 <ArrowRight />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
