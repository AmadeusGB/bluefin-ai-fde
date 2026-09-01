"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Printer,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { reviewDecision } from "@/lib/review-decision";
import { reviewPhases, type ReviewPhase } from "@/lib/review-phases";

type Answer = 0 | 1 | 2;
const phases = reviewPhases;

const options: Array<{ value: Answer; label: string; detail: string }> = [
  { value: 2, label: "已证实", detail: "有原始记录并达到阶段条件" },
  { value: 1, label: "部分成立", detail: "有进展，但证据或结果不完整" },
  { value: 0, label: "未达标", detail: "没有证据、结果未达标或已失效" },
];

const blankAnswers = () =>
  Object.fromEntries(
    phases.map((phase) => [phase.key, phase.questions.map(() => null)]),
  ) as Record<ReviewPhase["key"], Array<Answer | null>>;

export function Review306090() {
  const [active, setActive] = useState<ReviewPhase["key"]>("30");
  const [answers, setAnswers] = useState(blankAnswers);
  const [project, setProject] = useState("");
  const [copied, setCopied] = useState(false);
  const phase = phases.find((item) => item.key === active) as ReviewPhase;
  const current = answers[active];
  const answered = current.filter((answer) => answer !== null).length;
  const score = Math.round(
    (current.reduce<number>((sum, answer) => sum + (answer ?? 0), 0) /
      (phase.questions.length * 2)) *
      100,
  );
  const criticalFailures = phase.questions.flatMap((question, index) =>
    question.critical && current[index] === 0 ? [question.text] : [],
  );
  const decision = useMemo(
    () =>
      reviewDecision({
        answered,
        total: phase.questions.length,
        criticalFailures: criticalFailures.length,
        score,
        phase: active,
      }),
    [active, answered, criticalFailures.length, phase.questions.length, score],
  );
  const phaseScores = phases.map((item) => {
    const values = answers[item.key];
    return {
      ...item,
      answered: values.filter((answer) => answer !== null).length,
      score: Math.round(
        (values.reduce<number>((sum, answer) => sum + (answer ?? 0), 0) /
          (item.questions.length * 2)) *
          100,
      ),
    };
  });
  const gaps = phase.questions.flatMap((question, index) =>
    current[index] !== 2 ? [question.text] : [],
  );
  const report = `蓝旗鱼 AI 30/60/90 天复查报告\n\n项目：${project || "未填写"}\n阶段：${phase.label}\n决策：${decision[0]}\n得分：${score}/100\n完成：${answered}/${phase.questions.length}\n关键红线：${criticalFailures.length ? criticalFailures.join("；") : "无"}\n\n优先补齐：\n${gaps.length ? gaps.map((item) => `- ${item}`).join("\n") : "- 当前阶段无未完成项"}\n\n说明：${decision[1]}\n\n本报告用于阶段复查，不替代安全、法律、财务或正式验收决定。`;
  async function copyReport() {
    await navigator.clipboard.writeText(report);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
      <aside className="self-start bg-[#071817] p-8 text-white lg:sticky lg:top-24 print:static">
        <p className="eyebrow text-[#bff5d1]">阶段复查报告</p>
        <label
          htmlFor="review-project"
          className="mt-6 block text-xs font-bold text-white/60"
        >
          项目名称（可选）
        </label>
        <Input
          id="review-project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
          maxLength={120}
          placeholder="例如：报价知识库 MVD"
          className="mt-2 rounded-none border-white/25 bg-white/5 text-white placeholder:text-white/30"
        />
        <div className="mt-8 flex items-end gap-2">
          <strong className="text-7xl font-black text-[#bff5d1]">
            {score}
          </strong>
          <span className="pb-3 text-white/45">/ 100</span>
        </div>
        <p className="mt-5 text-3xl font-black">{decision[0]}</p>
        <p className="mt-3 leading-7 text-white/60">{decision[1]}</p>
        <div className="mt-8 space-y-5 border-t border-white/15 pt-6">
          {phaseScores.map((item) => (
            <Progress
              key={item.key}
              value={item.score}
              className="gap-2 text-white"
            >
              <ProgressLabel>{item.label}</ProgressLabel>
              <span className="ml-auto text-sm tabular-nums text-white/60">
                {item.answered}/{item.questions.length} · {item.score}
              </span>
            </Progress>
          ))}
        </div>
        {criticalFailures.length > 0 && (
          <div className="mt-7 border border-[#ff9b8a]/40 p-4 text-sm text-[#ffb4a8]">
            <p className="flex items-center gap-2 font-bold">
              <TriangleAlert className="size-4" />
              关键红线 {criticalFailures.length} 项
            </p>
            {criticalFailures.map((item) => (
              <p key={item} className="mt-2 leading-6">
                {item}
              </p>
            ))}
          </div>
        )}
      </aside>
      <div>
        <div className="grid gap-px bg-foreground/15 sm:grid-cols-3 print:hidden">
          {phases.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={active === item.key}
              onClick={() => setActive(item.key)}
              className={`p-5 text-left ${active === item.key ? "bg-[#dff6e6] ring-2 ring-inset ring-[#147e66]" : "bg-white hover:bg-[#f1eee5]"}`}
            >
              <span className="text-xs font-bold text-[#147e66]">
                第 {item.key} 天
              </span>
              <span className="mt-2 block font-black">{item.label}</span>
            </button>
          ))}
        </div>
        <section className="mt-9">
          <p className="eyebrow text-[#147e66]">{phase.label} · 复查重点</p>
          <h2 className="mt-3 text-3xl font-black">{phase.focus}</h2>
          <div className="mt-8 space-y-5">
            {phase.questions.map((question, index) => (
              <fieldset
                key={question.text}
                className="border border-foreground/15 bg-white p-5"
              >
                <legend className="px-2 font-bold leading-7">
                  {question.text}
                  {question.critical && (
                    <span className="ml-2 text-xs text-[#a34532]">
                      关键红线
                    </span>
                  )}
                </legend>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  需要证据：{question.evidence}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={current[index] === option.value}
                      onClick={() =>
                        setAnswers((value) => ({
                          ...value,
                          [active]: value[active].map((answer, answerIndex) =>
                            answerIndex === index ? option.value : answer,
                          ),
                        }))
                      }
                      className={`border p-3 text-left ${current[index] === option.value ? "border-[#147e66] bg-[#dff6e6]" : "border-foreground/15 hover:border-foreground/40"}`}
                    >
                      <span className="flex items-center gap-2 font-bold">
                        {current[index] === option.value && (
                          <Check className="size-4 text-[#147e66]" />
                        )}
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
        <div className="mt-9 border-t border-foreground/20 pt-7">
          <p className="text-sm leading-6 text-muted-foreground">
            已完成 {answered}/{phase.questions.length} 项。已证实 2 分、部分成立
            1 分、未达标 0 分；关键红线失败会降低阶段决策。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            {answered === phase.questions.length && (
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={`/apply?score=${score}&decision=${decision[0]}&source=30-60-90-review`}
                  />
                }
                className="h-12 rounded-none"
              >
                带复查结果申请支持 <ArrowRight />
              </Button>
            )}
            <Button
              variant="outline"
              onClick={copyReport}
              className="h-12 rounded-none"
            >
              {copied ? <Check /> : <Copy />}
              {copied ? "已复制" : "复制阶段报告"}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="h-12 rounded-none"
            >
              <Printer /> 打印保存
            </Button>
            <Button
              variant="ghost"
              onClick={() => setAnswers(blankAnswers())}
              className="h-12 rounded-none"
            >
              <RotateCcw /> 清空全部阶段
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
