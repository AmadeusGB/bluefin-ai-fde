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
import { Textarea } from "@/components/ui/textarea";
import { fiveMaps } from "@/lib/five-maps";

const fields = fiveMaps.flatMap((map) =>
  map.fields.map((field) => ({
    ...field,
    mapKey: map.key,
    mapTitle: map.title,
  })),
);
const emptyValues = () =>
  Object.fromEntries(
    fields.map((field) => [`${field.mapKey}.${field.key}`, ""]),
  );

export function FiveMapsDesigner() {
  const [active, setActive] = useState(fiveMaps[0].key);
  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [project, setProject] = useState("");
  const [copied, setCopied] = useState(false);
  const completed = fields.filter((field) =>
    values[`${field.mapKey}.${field.key}`]?.trim(),
  ).length;
  const criticalGaps = fields.filter(
    (field) =>
      field.critical && !values[`${field.mapKey}.${field.key}`]?.trim(),
  );
  const mapProgress = fiveMaps.map((map) => ({
    ...map,
    completed: map.fields.filter((field) =>
      values[`${map.key}.${field.key}`]?.trim(),
    ).length,
  }));
  const readiness = criticalGaps.length
    ? {
        label: "HOLD",
        detail: `先补齐 ${criticalGaps.length} 个关键地图入口。`,
      }
    : completed < 10
      ? {
          label: "ADJUST",
          detail: "五张地图已建立入口，但证据密度不足，先完成至少 10 项。",
        }
      : completed < fields.length
        ? {
            label: "MVD 待核验",
            detail: "已具备 MVD 讨论最低条件；现场仍需核验未完成项与原始证据。",
          }
        : {
            label: "MVD 可讨论",
            detail: "15 项均有草案，可以进入 MVD 边界、基线与停止条件讨论。",
          };
  const report = useMemo(
    () =>
      `蓝旗鱼 AI 企业 AI 诊断五张地图\n\n项目：${project || "未填写"}\n完整度：${completed}/${fields.length}\n当前判断：${readiness.label}｜${readiness.detail}\n\n${fiveMaps
        .map(
          (map, mapIndex) =>
            `${mapIndex + 1}. ${map.title}\n${map.fields
              .map(
                (field) =>
                  `- ${field.label}\n${values[`${map.key}.${field.key}`] || "待填写"}`,
              )
              .join("\n")}`,
        )
        .join(
          "\n\n",
        )}\n\n说明：本草案用于现场诊断准备，不替代原始数据核验、安全与合规审查或正式项目决定。`,
    [completed, project, readiness.detail, readiness.label, values],
  );
  const currentMap = fiveMaps.find(
    (map) => map.key === active,
  ) as (typeof fiveMaps)[number];
  async function copyReport() {
    await navigator.clipboard.writeText(report);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
      <aside className="self-start bg-[#071817] p-8 text-white lg:sticky lg:top-24 print:static">
        <p className="eyebrow text-[#bff5d1]">实时诊断草案</p>
        <label
          htmlFor="five-maps-project"
          className="mt-6 block text-xs font-bold text-white/60"
        >
          项目 / 问题名称（可选）
        </label>
        <Input
          id="five-maps-project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
          maxLength={120}
          placeholder="例如：高价值询盘跟进"
          className="mt-2 rounded-none border-white/25 bg-white/5 text-white placeholder:text-white/30"
        />
        <div className="mt-8 flex items-end gap-2">
          <strong className="text-7xl font-black text-[#bff5d1]">
            {completed}
          </strong>
          <span className="pb-3 text-white/45">/ {fields.length}</span>
        </div>
        <p className="mt-5 text-3xl font-black">{readiness.label}</p>
        <p className="mt-3 leading-7 text-white/60">{readiness.detail}</p>
        <div className="mt-7 space-y-3 border-t border-white/15 pt-6">
          {mapProgress.map((map) => (
            <button
              key={map.key}
              type="button"
              onClick={() => setActive(map.key)}
              className="flex w-full items-center justify-between border-b border-white/10 pb-3 text-left"
            >
              <span className="font-bold">{map.title}</span>
              <span
                className={
                  map.completed === map.fields.length
                    ? "text-[#bff5d1]"
                    : "text-white/45"
                }
              >
                {map.completed}/{map.fields.length}
              </span>
            </button>
          ))}
        </div>
        {criticalGaps.length > 0 && (
          <div className="mt-7 border border-[#ff9b8a]/40 p-4 text-sm text-[#ffb4a8]">
            <p className="flex items-center gap-2 font-bold">
              <TriangleAlert className="size-4" />
              关键缺口
            </p>
            {criticalGaps.map((gap) => (
              <p key={`${gap.mapKey}.${gap.key}`} className="mt-2">
                {gap.mapTitle}：{gap.label}
              </p>
            ))}
          </div>
        )}
      </aside>
      <div>
        <div className="grid gap-px bg-foreground/15 sm:grid-cols-5 print:hidden">
          {fiveMaps.map((map, index) => (
            <button
              key={map.key}
              type="button"
              aria-pressed={active === map.key}
              onClick={() => setActive(map.key)}
              className={`p-4 text-left ${active === map.key ? "bg-[#dff6e6] ring-2 ring-inset ring-[#147e66]" : "bg-white hover:bg-[#f1eee5]"}`}
            >
              <span className="text-xs font-bold text-[#147e66]">
                0{index + 1}
              </span>
              <span className="mt-2 block font-black">{map.title}</span>
            </button>
          ))}
        </div>
        <section className="mt-9">
          <p className="eyebrow text-[#147e66]">{currentMap.title}</p>
          <h2 className="mt-3 text-3xl font-black">{currentMap.question}</h2>
          <div className="mt-8 space-y-7">
            {currentMap.fields.map((field, index) => {
              const key = `${currentMap.key}.${field.key}`;
              return (
                <label key={key} className="block">
                  <span className="text-xs font-bold text-[#147e66]">
                    0{index + 1}
                  </span>
                  <span className="mt-1 block text-xl font-black">
                    {field.label}
                    {field.critical && (
                      <span className="ml-2 text-xs text-[#a34532]">
                        关键入口
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {field.prompt}
                  </span>
                  <Textarea
                    value={values[key]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    maxLength={2000}
                    placeholder={field.placeholder}
                    className="mt-3 min-h-28 rounded-none bg-white"
                  />
                </label>
              );
            })}
          </div>
        </section>
        <div className="mt-9 border-t border-foreground/20 pt-7">
          <p className="text-sm leading-6 text-muted-foreground">
            所有内容只保存在当前页面内存中，不会自动上传。复制或打印后，请在企业批准的存储位置继续核验原始证据。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <Button onClick={copyReport} className="h-12 rounded-none">
              {copied ? <Check /> : <Copy />}
              {copied ? "已复制" : "复制五地图草案"}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="h-12 rounded-none"
            >
              <Printer /> 打印保存
            </Button>
            {completed >= 10 && criticalGaps.length === 0 && (
              <Button
                nativeButton={false}
                render={<Link href="/tools/mvd-designer" />}
                variant="outline"
                className="h-12 rounded-none"
              >
                进入 MVD 设计器 <ArrowRight />
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setValues(emptyValues())}
              className="h-12 rounded-none"
            >
              <RotateCcw /> 清空草案
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
