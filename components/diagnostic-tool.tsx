"use client";
import { useMemo, useState } from "react";
import Link from "@/components/safe-link";
import {
  ArrowRight,
  Check,
  Printer,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import {
  diagnosticGroups,
  diagnosticQuestions,
  diagnosticResult,
  encodeDiagnosticProfile,
} from "@/lib/diagnostic";
import { trackFunnelEvent } from "@/lib/funnel-events";
export function DiagnosticTool() {
  const [selected, setSelected] = useState<boolean[]>(
    diagnosticQuestions.map(() => false),
  );
  const checked = selected.filter(Boolean).length,
    score = Math.round((checked / diagnosticQuestions.length) * 100);
  const dimensions = diagnosticGroups.map((group) => {
    const indexes = diagnosticQuestions
        .map((question, index) => (question.group === group.key ? index : -1))
        .filter((index) => index >= 0),
      yes = indexes.filter((index) => selected[index]).length;
    return {
      ...group,
      score: Math.round((yes / indexes.length) * 100),
      missing: indexes
        .filter((index) => !selected[index])
        .map((index) => diagnosticQuestions[index].text),
    };
  });
  const result = useMemo(() => diagnosticResult(score), [score]),
    weakest = [...dimensions].sort((a, b) => a.score - b.score)[0],
    profile = encodeDiagnosticProfile(selected),
    applyUrl = `/apply?score=${score}&decision=${result.decision}&profile=${profile}&source=diagnostic`;
  return (
    <div className="space-y-14">
      <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
        <aside className="self-start bg-[#0b1238] p-8 text-white lg:sticky lg:top-24 lg:p-10 print:static">
          <p className="eyebrow text-[#cdd5ff]">初步诊断报告</p>
          <div className="mt-8 flex items-end gap-2">
            <strong className="text-7xl font-black text-[#cdd5ff] lg:text-8xl">
              {score}
            </strong>
            <span className="pb-3 text-2xl text-white/45">/ 100</span>
          </div>
          <p className="mt-6 text-3xl font-black">{result.decision}</p>
          <p className="mt-4 leading-7 text-white/60">{result.summary}</p>
          <div className="mt-8 space-y-5 border-t border-white/15 pt-7">
            {dimensions.map((dimension) => (
              <Progress
                key={dimension.key}
                value={dimension.score}
                className="gap-2 text-white"
              >
                <ProgressLabel>{dimension.label}</ProgressLabel>
                <span className="ml-auto text-sm tabular-nums text-white/60">
                  {dimension.score}
                </span>
              </Progress>
            ))}
          </div>
          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-[#cdd5ff]">
              优先补齐
            </p>
            <p className="mt-2 font-bold">{weakest.label}</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              {weakest.action}
            </p>
          </div>
        </aside>
        <div>
          <div className="space-y-10">
            {diagnosticGroups.map((group, groupIndex) => (
              <section key={group.key}>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#3657d6]">
                      0{groupIndex + 1}
                    </span>
                    <h2 className="mt-1 text-2xl font-black">{group.label}</h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {dimensions[groupIndex].score}/100
                  </span>
                </div>
                <div className="space-y-3">
                  {group.questions.map((text, questionIndex) => {
                    const index = groupIndex * 3 + questionIndex;
                    return (
                      <button
                        key={text}
                        type="button"
                        aria-pressed={selected[index]}
                        onClick={() => {
                          if (!selected.some(Boolean))
                            trackFunnelEvent(
                              "diagnostic_started",
                              "diagnostic",
                              "/diagnostic",
                            );
                          setSelected((values) =>
                            values.map((value, current) =>
                              current === index ? !value : value,
                            ),
                          );
                        }}
                        className={`flex w-full gap-4 border p-5 text-left transition ${selected[index] ? "border-[#3657d6] bg-[#e7eaff]" : "border-foreground/15 bg-white hover:border-foreground/35"}`}
                      >
                        <span
                          className={`mt-0.5 grid size-6 shrink-0 place-items-center border ${selected[index] ? "border-[#3657d6] bg-[#3657d6] text-white" : "border-foreground/30"}`}
                        >
                          {selected[index] && <Check className="size-4" />}
                        </span>
                        <span className="leading-6">{text}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <section className="border-y border-foreground/20 py-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-[#3657d6]">可执行结论</p>
            <h2 className="mt-3 text-3xl font-black">
              不是分数终点，而是下一步清单。
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {checked} / {diagnosticQuestions.length}{" "}
            项条件已具备。此结果是资格初筛，不是项目承诺；正式结论仍需核验流程、数据、风险与组织条件。
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {dimensions.map((dimension) => (
            <article
              key={dimension.key}
              className={`border p-6 ${dimension.missing.length ? "border-[#ff735d]/40 bg-[#fff3ef]" : "border-[#3657d6]/35 bg-[#e7eaff]"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">{dimension.label}</h3>
                <b>{dimension.score}/100</b>
              </div>
              {dimension.missing.length ? (
                <>
                  <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#a63e2d]">
                    <TriangleAlert className="size-4" />
                    还需核验 {dimension.missing.length} 项
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {dimension.missing.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-foreground/10 pt-4 text-sm font-semibold leading-6">
                    建议：{dimension.action}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#3657d6]">
                  三项初筛条件均已确认；现场诊断仍需核验原始证据。
                </p>
              )}
            </article>
          ))}
        </div>
        <div className="mt-5 bg-[#0b1238] p-7 text-white">
          <p className="eyebrow text-[#cdd5ff]">MVD 建议</p>
          <p className="mt-4 max-w-4xl text-lg font-bold leading-8">
            {result.mvd}
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3 print:hidden">
          <Button
            onClick={() => {
              trackFunnelEvent(
                "diagnostic_apply_clicked",
                "diagnostic",
                "/diagnostic",
              );
              window.location.assign(applyUrl);
            }}
            size="lg"
            className="h-12 rounded-none px-5"
          >
            附带报告，申请 30 分钟资格确认 <ArrowRight />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-none"
            onClick={() => window.print()}
          >
            <Printer />
            打印 / 保存 PDF
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 rounded-none"
            onClick={() => setSelected(diagnosticQuestions.map(() => false))}
          >
            <RotateCcw />
            重新评估
          </Button>
        </div>
        <p className="mt-5 text-sm text-muted-foreground print:hidden">
          资格确认通过后，才会书面确认付费现场诊断的范围、周期和报价。{" "}
          <Link
            href="/field-diagnostic"
            className="font-bold text-[#3657d6] underline underline-offset-4"
          >
            查看现场诊断交付物与边界
          </Link>
        </p>
        <p className="mt-5 text-xs text-muted-foreground">
          报告版本 1.0 · 诊断编号 {profile.toUpperCase()} · 编号只记录 12
          项是/否结果，不包含企业名称、联系人或业务描述。
        </p>
      </section>
    </div>
  );
}
