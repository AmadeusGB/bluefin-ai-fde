import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowRight } from "lucide-react";
import { FiveMapsDesigner } from "@/components/five-maps-designer";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { fiveMaps } from "@/lib/five-maps";
import { breadcrumbList, StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "企业 AI 诊断五张地图",
  description:
    "在线填写问题、流程、数据、责任与风险五张地图，识别关键缺口并生成企业 AI 项目诊断草案。",
  alternates: { canonical: "/tools/five-maps" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bluefin-ai-fde.liuxiangth.chatgpt.site/tools/five-maps#app",
        name: "蓝旗鱼 AI 企业 AI 诊断五张地图",
        description: metadata.description,
        url: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/tools/five-maps",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "zh-CN",
        offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
        provider: { "@id": "https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization" },
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        { name: "FDE 工具与模板", path: "/tools" },
        { name: "企业 AI 诊断五张地图", path: "/tools/five-maps" },
      ]),
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="现场诊断模板"
          title="五张地图，把模糊需求变成可判断的项目。"
          intro="蓝旗鱼不会从功能清单开始。先共同画出问题、流程、数据、责任与风险，才能判断一个 AI 项目应该 GO、ADJUST、HOLD 还是 STOP。"
        />
        <section
          className="px-5 py-20 lg:px-10"
          aria-label="五张地图交互工作台"
        >
          <div className="mx-auto max-w-[1300px]">
            <FiveMapsDesigner />
          </div>
        </section>
        <section className="bg-[#f1eee5] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow text-[#3657d6]">方法与核验口径</p>
              <h2 className="mt-3 text-4xl font-black">
                每张地图都必须留下可核验的内容。
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                在线草案用于暴露缺口，不代表项目已经通过。正式诊断仍需回到原始记录、真实流程和责任人现场核验。
              </p>
            </div>
            {fiveMaps.map((map, i) => (
              <article
                key={map.key}
                className="grid gap-5 border-t border-foreground/20 py-8 lg:grid-cols-[80px_1fr_1.5fr_1.5fr]"
              >
                <span className="text-[#3657d6]">0{i + 1}</span>
                <h3 className="text-2xl font-black">{map.title}</h3>
                <div>
                  <b className="text-sm text-[#3657d6]">核心问题</b>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {map.question}
                  </p>
                </div>
                <div>
                  <b className="text-sm text-[#3657d6]">必须产出</b>
                  <p className="mt-2 leading-7">{map.output}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {map.fields.map((field) => (
                      <li key={field.key}>
                        <strong className="text-foreground">
                          {field.label}：
                        </strong>
                        {field.prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <div className="mt-12 bg-[#e7eaff] p-8">
              <h2 className="text-3xl font-black">完成五张地图之后</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                只有当问题值得解决、数据可以验证、负责人能够决策、风险可控时，才进入
                MVD 设计。任何一张地图出现关键空白，都应先补齐而不是立刻开发。
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/tools/mvd-designer" />}
                size="lg"
                className="mt-6 h-12 rounded-none"
              >
                进入 MVD 设计器 <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
