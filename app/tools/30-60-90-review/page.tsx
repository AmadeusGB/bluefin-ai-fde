import type { Metadata } from "next";
import { Review306090 } from "@/components/review-30-60-90";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { breadcrumbList, StructuredData } from "@/components/structured-data";
import { reviewPhases } from "@/lib/review-phases";
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: "企业 AI 项目 30/60/90 天复查工具",
  description:
    "按上线 30、60、90 天检查真实采用、业务结果、生产风险、运营交接与复制条件，生成 GO、ADJUST、HOLD 或 STOP 阶段报告。",
  alternates: { canonical: "/tools/30-60-90-review" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${absoluteUrl('/tools/30-60-90-review')}#app`,
        name: "蓝旗鱼企业 AI 项目 30/60/90 天复查工具",
        description: metadata.description,
        url: absoluteUrl('/tools/30-60-90-review'),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "zh-CN",
        provider: { "@id": organizationId },
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        { name: "FDE 工具与模板", path: "/tools" },
        { name: "30/60/90 天复查工具", path: "/tools/30-60-90-review" },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="采用与交接工具 · 18 项证据检查"
          title="上线不是终点。第 30、60、90 天都要重新决定。"
          intro="按真实采用、任务质量、业务结果、风险护栏和客户接管证据复查项目。每个阶段都生成 GO、ADJUST、HOLD 或 STOP，不用上线状态掩盖无人使用或无法交接。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <Review306090 />
          </div>
        </section>
        <section className="bg-[#f1eee5] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#3657d6]">
              静态证据清单 · 无需运行工具
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.04em] lg:text-6xl">
              每个判断都必须指向原始记录。
            </h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {reviewPhases.map((phase) => (
                <article key={phase.key} className="bg-white p-7">
                  <p className="text-xs font-bold text-[#3657d6]">
                    第 {phase.key} 天
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{phase.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {phase.focus}
                  </p>
                  <ol className="mt-6 space-y-5">
                    {phase.questions.map((question, index) => (
                      <li
                        key={question.text}
                        className="border-t border-foreground/15 pt-4"
                      >
                        <p className="font-bold leading-6">
                          {index + 1}. {question.text}
                          {question.critical && (
                            <span className="ml-2 text-xs text-[#a34532]">
                              关键红线
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          需要证据：{question.evidence}
                        </p>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
