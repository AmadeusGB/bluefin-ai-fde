import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  geoMeasurementFields,
  geoMeasurementUpdatedAt,
  geoMeasurementVersion,
  geoPlatforms,
} from "@/lib/geo-measurement";
import { geoQuerySet } from "@/lib/geo-query-set";
export const metadata: Metadata = {
  title: "GEO 月度测量协议与空白模板",
  description:
    "使用 120 个固定问题，在 9 个搜索和 AI 平台上持续记录品牌提及、引用、语义准确率与品类关联。",
  alternates: { canonical: "/research/geo-measurement-protocol" },
};
const metrics = [
  [
    "品牌主动提及率",
    "未在问题中提示品牌时，回答主动提及蓝旗鱼的查询数 ÷ 有效查询数。",
  ],
  ["品牌引用率", "至少引用一个蓝旗鱼页面的查询数 ÷ 有效查询数。"],
  ["目标问题引用份额", "蓝旗鱼引用次数 ÷ 同批测试中全部可核验来源引用次数。"],
  [
    "引用语义准确率",
    "人工评分总分 ÷（有效引用数 × 2）；0 错误、1 部分准确、2 准确。",
  ],
  [
    "品类关联度",
    "正确将蓝旗鱼与企业 AI 落地或 FDE 关联的查询数 ÷ 品牌被提及查询数。",
  ],
];
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "蓝旗鱼 AI 企业 AI / FDE GEO 月度测量模板",
    version: geoMeasurementVersion,
    dateModified: geoMeasurementUpdatedAt,
    inLanguage: "zh-CN",
    creator: { "@type": "Organization", name: "蓝旗鱼 AI" },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl:
        "https://bluefin-ai-fde.liuxiangth.chatgpt.site/api/geo-measurement-template?format=csv",
    },
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
          eyebrow={`公开研究 · 测量协议 v${geoMeasurementVersion}`}
          title="120 个问题 × 9 个平台，一套可复查的月度记录。"
          intro="模板预生成 1080 行空白记录。它只定义测试环境、保存字段和评分方法，不包含任何品牌表现数据，也不预设蓝旗鱼应该被提及。"
        />
        <section className="px-5 py-18 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="eyebrow text-[#147e66]">覆盖平台</p>
              <div className="mt-7 grid gap-px bg-foreground/15 sm:grid-cols-3">
                {geoPlatforms.map((platform, index) => (
                  <div key={platform} className="bg-background p-5">
                    <span className="text-xs text-[#147e66]">0{index + 1}</span>
                    <p className="mt-4 font-black">{platform}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="bg-[#dff6e6] p-8">
              <p className="eyebrow text-[#147e66]">空白模板</p>
              <strong className="mt-6 block text-6xl font-black">
                {geoQuerySet.length * geoPlatforms.length}
              </strong>
              <p className="mt-2 text-muted-foreground">行问题 × 平台组合</p>
              <dl className="mt-7 grid grid-cols-2 gap-5">
                <div>
                  <dt className="text-xs text-muted-foreground">问题</dt>
                  <dd className="mt-1 text-2xl font-black">
                    {geoQuerySet.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">平台</dt>
                  <dd className="mt-1 text-2xl font-black">
                    {geoPlatforms.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">字段</dt>
                  <dd className="mt-1 text-2xl font-black">
                    {geoMeasurementFields.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">更新</dt>
                  <dd className="mt-1 font-black">{geoMeasurementUpdatedAt}</dd>
                </div>
              </dl>
              <Button
                nativeButton={false}
                render={<Link href="/api/geo-measurement-template?format=csv" />}
                className="mt-8 h-12 rounded-none"
              >
                下载 1080 行 CSV <ArrowDownToLine />
              </Button>
            </aside>
          </div>
        </section>
        <section className="bg-[#071817] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#bff5d1]">执行协议</p>
            <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-4">
              {[
                [
                  "01 固定环境",
                  "记录日期、地区、语言、模型或模式、联网状态和新会话状态。",
                ],
                [
                  "02 原样提问",
                  "不加入品牌暗示，不追问诱导；同一批次保持问题文本一致。",
                ],
                [
                  "03 保存原文",
                  "保存完整回答、引用 URL、位置和抓取时间，不只保留人工摘要。",
                ],
                [
                  "04 双重复核",
                  "一人记录，一人复核品牌、引用与语义评分；争议保留说明。",
                ],
              ].map(([title, detail]) => (
                <article key={title} className="bg-[#071817] p-7">
                  <h2 className="text-xl font-black text-[#bff5d1]">{title}</h2>
                  <p className="mt-4 leading-7 text-white/55">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#147e66]">核心指标定义</p>
            <div className="mt-8">
              {metrics.map(([title, detail]) => (
                <article
                  key={title}
                  className="grid gap-4 border-t border-foreground/15 py-6 md:grid-cols-[260px_1fr]"
                >
                  <h2 className="text-xl font-black">{title}</h2>
                  <p className="leading-7 text-muted-foreground">{detail}</p>
                </article>
              ))}
            </div>
            <div className="mt-12 bg-[#f1eee5] p-8">
              <h2 className="text-2xl font-black">限制与发布规则</h2>
              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
                生成式回答具有随机性，平台索引、地区和产品模式会变化。单次测试不能代表长期表现；品牌被提及也不等于交付能力。未来如发布月报，应同时说明有效样本、失败请求、环境变化、人工复核方法和原始回答存档范围。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/research/fde-query-benchmark" />}
                  variant="outline"
                  className="rounded-none bg-transparent"
                >
                  查看 120 题基准集 <ArrowRight />
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/api/geo-measurement-template" />}
                  variant="ghost"
                  className="rounded-none"
                >
                  查看字段 JSON
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
