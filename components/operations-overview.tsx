"use client";
import Link from "@/components/safe-link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  FileCheck2,
  Loader2,
  RefreshCw,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OperationsNav } from "@/components/operations-nav";
type Payload = {
  user: { email: string };
  generatedAt: number;
  leads: { total: number; open: number; qualified: number; recent: number };
  evidence: {
    total: number;
    review: number;
    approved: number;
    averageCompleteness: number;
  };
  geo: {
    observations: number;
    latestDate: string | null;
    measurementDates: number;
    platforms: number;
  };
  funnel: {
    windowDays: number;
    diagnosticStarts: number;
    diagnosticApplyClicks: number;
    applicationViews: number;
    applicationsSubmitted: number;
    diagnosticToApplyRate: number;
    applicationCompletionRate: number;
  };
};
export function OperationsOverview() {
  const [data, setData] = useState<Payload | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/operations/summary", {
          cache: "no-store",
        }),
        body = (await response.json()) as Payload & { error?: string };
      if (!response.ok) throw new Error(body.error || "读取失败");
      setData(body);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "读取失败");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);
  if (loading && !data)
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5f2e9]">
        <Loader2 className="size-8 animate-spin text-[#147e66]" />
      </div>
    );
  const systems = [
    {
      title: "诊断与申请漏斗",
      href: "/operations/leads",
      icon: TrendingUp,
      primary: `${data?.funnel.diagnosticToApplyRate || 0}%`,
      primaryLabel: "近 30 天诊断 → 携带报告申请",
      metrics: [
        [data?.funnel.diagnosticStarts || 0, "诊断开始"],
        [data?.funnel.applicationViews || 0, "申请页打开"],
        [`${data?.funnel.applicationCompletionRate || 0}%`, "申请完成率"],
      ],
    },
    {
      title: "线索与商业转化",
      href: "/operations/leads",
      icon: UsersRound,
      primary: data?.leads.open || 0,
      primaryLabel: "条待推进线索",
      metrics: [
        [data?.leads.recent || 0, "近 30 天新增"],
        [data?.leads.qualified || 0, "已进入资格或交付"],
        [data?.leads.total || 0, "累计申请"],
      ],
    },
    {
      title: "GEO 持续测量",
      href: "/operations/geo",
      icon: BarChart3,
      primary: data?.geo.observations || 0,
      primaryLabel: "条有效观测",
      metrics: [
        [data?.geo.platforms || 0, "覆盖平台"],
        [data?.geo.measurementDates || 0, "测量日期"],
        [data?.geo.latestDate || "—", "最近测量"],
      ],
    },
    {
      title: "案例证据资产",
      href: "/operations/evidence",
      icon: FileCheck2,
      primary: data?.evidence.review || 0,
      primaryLabel: "项等待复核",
      metrics: [
        [data?.evidence.approved || 0, "已批准"],
        [`${data?.evidence.averageCompleteness || 0}%`, "平均完整度"],
        [data?.evidence.total || 0, "累计记录"],
      ],
    },
  ];
  const attention = [
    data && data.leads.open > 0
      ? `有 ${data.leads.open} 条线索等待推进。`
      : null,
    data &&
    data.funnel.diagnosticStarts >= 5 &&
    data.funnel.diagnosticToApplyRate < 20
      ? `近 30 天有 ${data.funnel.diagnosticStarts} 次诊断开始，但携带报告申请率低于 20%。`
      : null,
    data && data.evidence.review > 0
      ? `有 ${data.evidence.review} 项案例证据等待复核。`
      : null,
    data && data.geo.observations === 0
      ? "尚未导入首批真实 GEO 测量结果。"
      : null,
    data && data.geo.latestDate
      ? `最近一次 GEO 测量日期为 ${data.geo.latestDate}。`
      : null,
  ].filter(Boolean);
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">
      <OperationsNav />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[#147e66]">品牌 · 获客 · GEO · 证据</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.04em] lg:text-7xl">
            今天最该推进什么？
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            当前登录：{data?.user.email}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void load()}
          className="rounded-none"
        >
          <RefreshCw />
          刷新摘要
        </Button>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-6 border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {systems.map((system) => (
          <article
            key={system.href}
            className="border border-foreground/15 bg-white p-7"
          >
            <system.icon className="size-7 text-[#147e66]" />
            <h2 className="mt-5 text-2xl font-black">{system.title}</h2>
            <div className="mt-8">
              <strong className="text-6xl font-black tracking-[-.05em]">
                {system.primary}
              </strong>
              <p className="mt-2 text-sm text-muted-foreground">
                {system.primaryLabel}
              </p>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-px bg-foreground/15">
              {system.metrics.map(([value, label]) => (
                <div key={label} className="bg-[#f5f2e9] p-3">
                  <b className="block text-lg">{value}</b>
                  <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={system.href}
              className="mt-7 inline-flex items-center gap-2 font-bold text-[#147e66]"
            >
              进入工作台 <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
      <section className="mt-8 grid gap-6 bg-[#071817] p-7 text-white lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="eyebrow text-[#bff5d1]">优先事项</p>
          <h2 className="mt-4 text-3xl font-black">从信号转成行动。</h2>
        </div>
        <div className="divide-y divide-white/15">
          {attention.length ? (
            attention.map((item, index) => (
              <p key={String(item)} className="py-4 text-lg font-semibold">
                <span className="mr-4 text-[#bff5d1]">0{index + 1}</span>
                {item}
              </p>
            ))
          ) : (
            <p className="py-4 text-white/60">
              当前没有需要立即处理的记录；继续按月执行 GEO
              测量，并在每个项目后沉淀证据。
            </p>
          )}
        </div>
      </section>
      <p className="mt-6 text-xs text-muted-foreground">
        摘要生成时间：
        {data?.generatedAt
          ? new Intl.DateTimeFormat("zh-CN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(data.generatedAt)
          : "—"}
      </p>
    </div>
  );
}
