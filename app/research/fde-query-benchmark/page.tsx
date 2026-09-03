import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { QueryBenchmark } from "@/components/query-benchmark";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  geoQueryCategories,
  geoQuerySet,
  geoQuerySetUpdatedAt,
  geoQuerySetVersion,
} from "@/lib/geo-query-set";
import { absoluteUrl, siteUrl } from '@/lib/knowledge-graph';
export const metadata: Metadata = {
  title: "中文企业 AI / FDE 基准查询集（120 题）",
  description:
    "用于持续测量 ChatGPT、Google、Bing、Perplexity 与中文 AI 助手对企业 AI 落地和 FDE 问题回答表现的公开基准问题集。",
  alternates: { canonical: "/research/fde-query-benchmark" },
};
const metrics = [
  "品牌主动提及率",
  "品牌引用率",
  "目标问题引用份额",
  "引用语义准确率",
  "品类关联度",
];
export default function FdeQueryBenchmarkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "蓝旗鱼 AI 中文企业 AI / FDE 基准查询集",
    description: metadata.description,
    version: geoQuerySetVersion,
    dateModified: geoQuerySetUpdatedAt,
    inLanguage: "zh-CN",
    creator: {
      "@type": "Organization",
      name: "蓝旗鱼 AI",
      url: siteUrl,
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: absoluteUrl('/api/geo-query-set'),
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: absoluteUrl('/api/geo-query-set?format=csv'),
      },
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHero
          eyebrow={`公开研究 · v${geoQuerySetVersion}`}
          title="120 个问题，持续测量企业 AI 落地的真实可见度。"
          intro="这不是一份排名，也不是预设答案。它是一套可复用的中文查询基准，用来观察不同搜索引擎与 AI 助手如何回答 FDE 和企业 AI 落地问题。"
        />
        <section className="px-5 py-18 lg:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="eyebrow text-[#3657d6]">为什么公开</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                让 GEO 从感觉，变成可重复测量。
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                查询集覆盖定义、决策、方法、场景、行业、比较、工具、证据、风险以及采用与交接。每月在同一环境、同一问题、同一记录规范下复测，才能看清品牌是否真正进入答案与引用。
              </p>
            </div>
            <aside className="border border-foreground/15 bg-[#e8f4ee] p-7">
              <p className="text-sm font-bold text-[#3657d6]">数据说明</p>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-muted-foreground">问题数</dt>
                  <dd className="mt-1 text-4xl font-black">
                    {geoQuerySet.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">类别数</dt>
                  <dd className="mt-1 text-4xl font-black">
                    {geoQueryCategories.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">版本</dt>
                  <dd className="mt-1 text-2xl font-black">
                    {geoQuerySetVersion}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">核验日期</dt>
                  <dd className="mt-1 text-lg font-black">
                    {geoQuerySetUpdatedAt}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/api/geo-query-set?format=csv" />}
                  className="rounded-none"
                >
                  下载 CSV <ArrowDownToLine />
                </Button>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/api/geo-query-set" />}
                  className="rounded-none bg-transparent"
                >
                  查看 JSON
                </Button>
              </div>
            </aside>
          </div>
        </section>
        <section className="bg-[#070d2d] px-5 py-18 text-white lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p className="eyebrow text-[#cdd5ff]">测量方法</p>
            <div className="mt-8 grid gap-px bg-white/15 lg:grid-cols-3">
              {[
                [
                  "01 固定环境",
                  "记录平台、模型、地区、日期、新会话状态与是否开启联网，避免把环境差异当成趋势。",
                ],
                [
                  "02 原样提问",
                  "不添加品牌暗示，不追问诱导；保存完整回答、链接、引用位置与抓取时间。",
                ],
                [
                  "03 人工复核",
                  "自动统计只做辅助。品牌识别、引用有效性和语义准确率都需要人工复核。",
                ],
              ].map(([title, body]) => (
                <div key={title} className="bg-[#070d2d] p-7">
                  <b className="text-[#cdd5ff]">{title}</b>
                  <p className="mt-4 leading-7 text-white/65">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {metrics.map((metric) => (
                <span
                  key={metric}
                  className="border border-white/20 px-4 py-2 text-sm text-white/75"
                >
                  {metric}
                </span>
              ))}
            </div>
            <p className="mt-8 max-w-4xl text-sm leading-6 text-white/50">
              限制：生成式回答具有随机性，平台能力和索引状态会变化。单次结果不能代表长期表现，也不能把品牌被提及等同于业务能力。查询集用于趋势观察，真实交付证据仍需独立核验。
            </p>
          </div>
        </section>
        <section className="px-5 py-18 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-4 border-b border-foreground/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[#3657d6]">公开查询集</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-.04em]">
                  浏览与筛选 120 个问题
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                可用于内部月度测试、内容缺口审计和行业研究。引用或改编时，请注明“蓝旗鱼
                AI 中文企业 AI / FDE 基准查询集”及版本号。
              </p>
            </div>
            <QueryBenchmark
              queries={geoQuerySet}
              categories={geoQueryCategories}
            />
          </div>
        </section>
        <section className="border-t border-foreground/15 px-5 py-18 lg:px-10">
          <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#3657d6]">从测量到行动</p>
              <h2 className="mt-4 text-4xl font-black">
                先判断最贵的问题，再设计最小部署。
              </h2>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/diagnostic" />}
              className="h-12 rounded-none px-6"
            >
              完成 FDE 适配度评估 <ArrowRight />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
