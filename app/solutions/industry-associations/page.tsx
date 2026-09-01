import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ServiceStructuredData } from "@/components/structured-data";
export const metadata: Metadata = {
  title: "产业协会与园区 AI 落地",
  description:
    "产业协会如何用 FDE 建设知识库、内容获客、会员服务和运营执行闭环，并明确人工审核边界。",
  alternates: { canonical: "/solutions/industry-associations" },
};
const roles = [
  [
    "AI 内容获客专员",
    "把活动、走访和采访素材转化为公众号、海报、朋友圈与短视频文案。",
  ],
  [
    "AI 协会知识秘书",
    "治理历史资料，提供带来源问答、会议纪要、决议提取和知识更新。",
  ],
  [
    "AI 运营执行助手",
    "支持会员档案、续费提醒、任务跟进和运营报告，但不代替协会决策。",
  ],
];
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceStructuredData
          title="产业协会与园区 AI 落地"
          description="用 FDE 建设知识库、内容获客、会员服务和运营执行闭环，并明确人工审核边界。"
          path="/solutions/industry-associations"
        />
        <PageHero
          eyebrow="行业支柱页 · 产业协会"
          title="协会 AI 落地，先把内容做快、服务做稳。"
          intro="协会不适合一开始就建设大而全的系统。更合理的路径是：先选择每天发生、短期可见、风险可控的工作，用统一知识底座跑通内容、问答和会员服务，再逐步增加自动化。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-[#3657d6]">直接回答</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                  协会最先应该做什么？
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  "统一协会介绍、会员服务、历史活动、行业政策和常见问题",
                  "让会长和秘书处能够查询带来源的知识",
                  "用一次真实活动跑通“一份素材，多种内容”",
                  "所有正式答复、政策解读和对外内容保留人工审核",
                ].map((x) => (
                  <p
                    key={x}
                    className="flex gap-3 border-t border-foreground/15 py-4 text-lg"
                  >
                    <Check className="shrink-0 text-[#3657d6]" />
                    {x}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-20 grid md:grid-cols-3">
              {roles.map(([t, d], i) => (
                <article
                  key={t}
                  className="border-t border-foreground/20 py-7 md:border-r md:px-7 first:pl-0"
                >
                  <span className="text-xs text-[#3657d6]">0{i + 1}</span>
                  <h3 className="mt-9 text-2xl font-black">{t}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#e7eaff] px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#3657d6]">证据状态</p>
              <h2 className="mt-4 text-4xl font-black">
                真实交付方案，不是成功案例。
              </h2>
            </div>
            <div>
              <p className="leading-8 text-muted-foreground">
                本页方法来自蓝旗鱼面向广东省燕窝产业协会形成的真实 FDE
                合作方案，包含 3—8
                周周期、资料量上限、知识测试题与真实场景验收。当前公开材料证明方案设计与边界能力，不宣称客户已部署或取得经营结果。
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/apply" />}
                size="lg"
                className="mt-6 h-12 rounded-none"
              >
                提交协会真实问题 <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
