import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowRight } from "lucide-react";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "企业 AI 现场诊断",
  description:
    "用 12 项条件初步判断企业是否适合启动 FDE，并获得 GO、ADJUST 或 HOLD 建议。",
  alternates: { canonical: "/diagnostic" },
};
export default function DiagnosticPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "蓝旗鱼 FDE 适配度评估",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "通过问题价值、数据条件、组织条件和部署采用四个维度，生成企业 FDE 项目初步诊断报告。",
  };
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="客户诊断系统 · 第一步"
          title="先判断，是否值得做。"
          intro="这不是“AI 成熟度测试”，而是一次项目资格初筛。回答 12 个与真实交付直接相关的问题，获得四维度得分和 GO、ADJUST 或 HOLD 初步报告。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <DiagnosticTool />
          </div>
        </section>
        <section className="bg-[#e7eaff] px-5 py-18 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-8 md:grid-cols-3">
            <div>
              <b className="text-2xl">GO</b>
              <p className="mt-2 text-muted-foreground">
                进入 30 分钟资格确认，核验问题、数据和负责人。
              </p>
            </div>
            <div>
              <b className="text-2xl">ADJUST</b>
              <p className="mt-2 text-muted-foreground">
                先补齐最低维度，再判断是否进入付费现场诊断。
              </p>
            </div>
            <div>
              <b className="text-2xl">HOLD</b>
              <p className="mt-2 text-muted-foreground">
                暂停开发，先把问题价值与组织条件说清楚。
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-16 text-white lg:px-10">
          <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#cdd5ff]">需要更严格的项目判断？</p>
              <h2 className="mt-4 text-3xl font-black">
                继续检查生产红线与 STOP 条件。
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={<Link href="/tools/project-decision-scorer" />}
                className="h-12 rounded-none bg-[#cdd5ff] text-[#0b1238] hover:bg-[#e4e8ff]"
              >
                进入项目决策评分器 <ArrowRight />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/field-diagnostic" />}
                variant="outline"
                className="h-12 rounded-none border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0b1238]"
              >
                查看付费现场诊断
              </Button>
            </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
