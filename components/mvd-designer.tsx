"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fields = [
  {
    key: "problem",
    label: "最贵的问题",
    hint: "哪一个流程正在持续损失时间、收入或客户？",
    placeholder: "例如：高价值询盘平均 48 小时后才被首次回复",
  },
  {
    key: "baseline",
    label: "当前基线",
    hint: "现在的时间、成本、错误率或转化率是多少？",
    placeholder: "例如：首次响应中位数 48 小时，30% 询盘无人跟进",
  },
  {
    key: "data",
    label: "真实数据",
    hint: "第一轮验证可以使用哪些真实样本？",
    placeholder: "例如：最近 90 天 500 条询盘、CRM 跟进记录和成交结果",
  },
  {
    key: "boundary",
    label: "人机边界",
    hint: "AI 做什么，人保留什么判断？",
    placeholder: "例如：AI 分类和生成答复草稿；销售确认报价、承诺和发送",
  },
  {
    key: "success",
    label: "成功条件",
    hint: "什么结果足以支持继续部署？",
    placeholder: "例如：首次响应降至 4 小时内，漏跟进率低于 5%",
  },
];

export function MvdDesigner() {
  const [values, setValues] = useState<Record<string, string>>({
    problem: "",
    baseline: "",
    data: "",
    boundary: "",
    success: "",
  });
  const [copied, setCopied] = useState(false);
  const complete = Object.values(values).filter((v) => v.trim()).length;
  const summary = useMemo(
    () =>
      `蓝旗鱼 MVD 设计草案\n\n1. 最贵的问题\n${values.problem || "待填写"}\n\n2. 当前基线\n${values.baseline || "待填写"}\n\n3. 真实数据\n${values.data || "待填写"}\n\n4. 人机边界\n${values.boundary || "待填写"}\n\n5. 成功条件\n${values.success || "待填写"}\n\n完整度：${complete}/5`,
    [values, complete],
  );
  async function copy() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div className="space-y-8">
        {fields.map((f, i) => (
          <label key={f.key} className="block">
            <span className="text-xs font-bold text-[#147e66]">0{i + 1}</span>
            <span className="mt-1 block text-xl font-black">{f.label}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {f.hint}
            </span>
            {i === 0 ? (
              <Input
                value={values[f.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                className="mt-3 h-12 rounded-none bg-white"
              />
            ) : (
              <Textarea
                value={values[f.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                className="mt-3 min-h-24 rounded-none bg-white"
              />
            )}
          </label>
        ))}
      </div>
      <aside className="self-start bg-[#071817] p-8 text-white lg:sticky lg:top-24">
        <p className="eyebrow text-[#bff5d1]">实时草案 · {complete}/5</p>
        <pre className="mt-7 whitespace-pre-wrap font-sans text-sm leading-7 text-white/70">
          {summary}
        </pre>
        <div className="mt-7 flex flex-wrap gap-3 border-t border-white/15 pt-6">
          <Button
            onClick={copy}
            className="rounded-none bg-[#bff5d1] text-[#071817] hover:bg-[#d4f9e1]"
          >
            {copied ? <Check /> : <Copy />}
            {copied ? "已复制" : "复制草案"}
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/apply?source=mvd" />}
            variant="outline"
            className="rounded-none border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            申请讨论 <ArrowRight />
          </Button>
        </div>
      </aside>
    </div>
  );
}
