import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 font-black tracking-tight"
        >
          <span className="grid size-10 place-items-center rounded-full bg-foreground text-xs text-[#bff5d1]">
            BF
          </span>
          <span className="text-lg">
            蓝旗鱼 <b className="text-[#147e66]">AI</b>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          <Link href="/fde">什么是 FDE</Link>
          <Link href="/#method">交付方法</Link>
          <Link href="/solutions">行业场景</Link>
          <Link href="/services">FDE 服务</Link>
          <Link href="/evidence">案例与证据</Link>
          <Link href="/tools">工具</Link>
          <Link href="/knowledge">知识库</Link>
          <Link href="/research">研究</Link>
        </nav>
        <Button
          nativeButton={false}
          render={<Link href="/apply" />}
          className="h-10 rounded-none px-4 font-bold"
        >
          申请资格确认 <ArrowRight />
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#061311] px-5 pb-8 pt-18 text-white lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-black"
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#bff5d1] text-xs text-[#071817]">
                BF
              </span>
              蓝旗鱼 AI
            </Link>
            <p className="mt-4 text-white/55">面向中国企业的 FDE 落地团队</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/60">
              <Link href="/about">关于蓝旗鱼 AI</Link>
              <Link href="/about/arthur-guo">关于郭斌 Arthur</Link>
              <Link href="/editorial-policy">内容、证据与纠错政策</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <b className="text-[#bff5d1]">开始判断</b>
            <Link href="/diagnostic">FDE 适配度评估</Link>
            <Link href="/services">FDE 服务阶梯</Link>
            <Link href="/field-diagnostic">付费现场诊断</Link>
            <Link href="/services/mvd">MVD 服务</Link>
            <Link href="/tools/mvd-designer">MVD 设计器</Link>
            <Link href="/apply">申请资格确认</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <b className="text-[#bff5d1]">方法与证据</b>
            <Link href="/fde">FDE 方法</Link>
            <Link href="/training">Codex / 企业 AI 培训</Link>
            <Link href="/partners">合作伙伴与城市 FDE</Link>
            <Link href="/tools">工具与模板</Link>
            <Link href="/evidence">案例与证据</Link>
            <Link href="/knowledge">FDE 知识库</Link>
            <Link href="/research/fde-query-benchmark">120 题 GEO 基准集</Link>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/35">
          <span>© 2026 蓝旗鱼 AI</span>
          <span>内容核验日期：2026-09-01</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-foreground/10 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow text-[#147e66]">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-.06em] lg:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">
          {intro}
        </p>
      </div>
    </section>
  );
}
