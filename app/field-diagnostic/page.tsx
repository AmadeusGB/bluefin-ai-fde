import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ServiceStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "企业 AI 付费现场诊断",
  description:
    "蓝旗鱼企业 AI 现场诊断：核验真实问题、流程、数据、责任与风险，交付五张地图、业务基线和 MVD 决策建议。",
  alternates: { canonical: "/field-diagnostic" },
};
const outputs = [
  ["问题地图", "损失如何发生、当前基线、结果单位与优先级。"],
  ["流程地图", "触发、角色、系统、等待、判断、返工与结果写回。"],
  ["数据地图", "真实样本、来源、权限、字段责任、质量与缺口。"],
  ["责任与风险地图", "业务负责人、人机边界、审批、拒绝、升级和红线。"],
  [
    "MVD 决策包",
    "最小范围、评估集、成功阈值、TTV 假设与 GO / ADJUST / HOLD / STOP 建议。",
  ],
];
const customerInputs = [
  "指定一名能够对结果作决定的业务负责人",
  "允许访谈真实执行者并观察当前流程",
  "提供可脱敏的真实任务、记录或数据样本",
  "如实说明权限、合规、系统接口与组织限制",
];
const exclusions = [
  "不承诺诊断后一定进入开发或 MVD",
  "不交付“大而全”的集团 AI 蓝图",
  "不把访谈意见直接当成事实或量化结果",
  "不在没有数据和负责人的情况下给出 ROI 承诺",
];
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceStructuredData
          title="企业 AI 付费现场诊断"
          description={metadata.description as string}
          path="/field-diagnostic"
          parent={{ name: "客户诊断系统", path: "/diagnostic" }}
        />
        <PageHero
          eyebrow="客户诊断系统 · 付费阶段"
          title="开发之前，先把最贵的问题查清楚。"
          intro="蓝旗鱼现场诊断不是一次泛泛的 AI 咨询会。工程师进入真实流程，核验问题、数据、责任和风险，形成能够决定是否进入 MVD 的证据包。诊断结论可以是继续，也可以是调整、暂停或停止。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#147e66]">进入条件</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                先通过 30 分钟资格确认。
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                资格确认用于判断问题、数据和负责人是否达到现场诊断的最低条件，不提供完整方案。通过后，双方确认诊断范围、参与人、资料边界、周期和报价，再开始付费诊断。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/diagnostic" />}
                  variant="outline"
                  className="h-12 rounded-none"
                >
                  先做 5 分钟自测
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/apply?source=field-diagnostic" />}
                  className="h-12 rounded-none"
                >
                  申请资格确认 <ArrowRight />
                </Button>
              </div>
            </div>
            <div className="bg-[#071817] p-8 text-white lg:p-10">
              <p className="eyebrow text-[#bff5d1]">标准诊断范围</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-white/45">问题范围</span>
                  <b className="mt-1 block text-xl">一个高价值业务问题</b>
                </div>
                <div>
                  <span className="text-sm text-white/45">流程范围</span>
                  <b className="mt-1 block text-xl">一个端到端闭环</b>
                </div>
                <div>
                  <span className="text-sm text-white/45">证据范围</span>
                  <b className="mt-1 block text-xl">真实样本与现场访谈</b>
                </div>
                <div>
                  <span className="text-sm text-white/45">最终决定</span>
                  <b className="mt-1 block text-xl">
                    GO / ADJUST / HOLD / STOP
                  </b>
                </div>
              </div>
              <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-6 text-white/55">
                实际周期和费用由流程复杂度、访谈对象、数据样本及现场安排决定，在资格确认后书面报价；官网不使用一个虚构的统一价格覆盖不同企业。
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#dff6e6] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#147e66]">交付物</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.04em] lg:text-6xl">
              不是一份 PPT，而是一组可进入决策的证据。
            </h2>
            <div className="mt-12 grid md:grid-cols-5">
              {outputs.map(([title, detail], index) => (
                <article
                  key={title}
                  className="border-t border-foreground/20 py-7 md:border-r md:px-5 first:pl-0"
                >
                  <span className="text-xs text-[#147e66]">0{index + 1}</span>
                  <h3 className="mt-8 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <div className="grid gap-px bg-foreground/15 md:grid-cols-4">
              {[
                [
                  "01",
                  "资格确认",
                  "核验问题价值、真实数据、负责人和现场条件。",
                ],
                [
                  "02",
                  "范围与报价",
                  "书面确认访谈、样本、边界、周期、费用和保密要求。",
                ],
                [
                  "03",
                  "现场核验",
                  "访谈、观察、取样、还原流程并验证关键假设。",
                ],
                ["04", "决策评审", "交付证据包，决定继续、调整、暂停或停止。"],
              ].map(([n, t, d]) => (
                <article key={n} className="bg-background p-7">
                  <span className="text-xs text-[#147e66]">{n}</span>
                  <h3 className="mt-8 text-2xl font-black">{t}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{d}</p>
                </article>
              ))}
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-[#147e66]">企业需要投入</p>
                <div className="mt-6 space-y-3">
                  {customerInputs.map((item) => (
                    <p
                      key={item}
                      className="flex gap-3 border-t border-foreground/15 py-4 leading-7"
                    >
                      <Check className="mt-1 size-5 shrink-0 text-[#147e66]" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="bg-[#f1eee5] p-8">
                <p className="eyebrow text-[#8b4a38]">明确不包含</p>
                <div className="mt-6 space-y-4">
                  {exclusions.map((item) => (
                    <p
                      key={item}
                      className="flex gap-3 leading-7 text-muted-foreground"
                    >
                      <X className="mt-1 size-5 shrink-0 text-[#8b4a38]" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#071817] px-5 py-18 text-white lg:px-10">
          <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#bff5d1]">开始之前</p>
              <h2 className="mt-4 text-4xl font-black">带着一个真实问题来。</h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/55">
                先完成适配度评估，或直接提交问题、损失、负责人和数据条件。资格确认不会承诺项目一定启动。
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/apply?source=field-diagnostic" />}
              className="h-13 rounded-none bg-[#bff5d1] px-6 text-[#071817] hover:bg-[#d4f9e1]"
            >
              申请 30 分钟资格确认 <ArrowRight />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
