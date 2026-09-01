import Link from 'next/link';
import { ArrowRight, Check, MoveDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteFooter, SiteHeader } from '@/components/site-shell';

const steps = [
  ['01', '诊断', '进入真实业务现场，找出最贵的问题。'],
  ['02', 'MVD', '用真实数据跑通最小可行部署。'],
  ['03', '生产部署', '接入系统，建立评估与生产护栏。'],
  ['04', '采用', '让一线真正使用，明确人机边界。'],
  ['05', '复制', '完成交接，沉淀可复用资产。'],
];

export default function Home() {
  return (
    <><SiteHeader/><main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1500px] grid-cols-1 gap-16 px-5 pb-10 pt-16 lg:grid-cols-[1.35fr_.65fr] lg:items-center lg:px-10">
        <div><p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em]"><span className="size-2 rounded-full bg-[#17856c] shadow-[0_0_0_6px_rgba(23,133,108,.12)]" />企业 AI 落地 · Forward Deployed Engineering</p><h1 className="max-w-5xl text-[clamp(3.7rem,8vw,8.7rem)] font-black leading-[.92] tracking-[-.075em]">别再做<br/><em className="not-italic text-[#147e66]">“看起来能用”</em><br/>的 AI。</h1><p className="mt-9 max-w-3xl text-lg leading-8 text-muted-foreground lg:text-xl">蓝旗鱼进入真实业务现场，找到最贵的问题，用真实数据跑通最小可行部署，并把结果沉淀成企业能够长期使用的系统与能力。</p><div className="mt-10 flex flex-wrap items-center gap-6"><Button render={<Link href="/diagnostic" />} size="lg" className="h-13 rounded-none px-6 text-base font-bold">申请业务诊断 <ArrowRight /></Button><Link href="/fde" className="group flex items-center gap-2 font-bold">先了解 FDE <MoveDownRight className="transition-transform group-hover:translate-x-1" /></Link></div></div>
        <div className="self-end lg:pb-16"><div className="border border-foreground/15 p-7"><p className="text-xs uppercase tracking-[.18em] text-muted-foreground">我们交付的不是</p><div className="mt-5 flex flex-col gap-2 text-2xl font-extrabold"><span className="decoration-[#ff735d] line-through decoration-2">Demo</span><span className="decoration-[#ff735d] line-through decoration-2">泛泛培训</span><span className="decoration-[#ff735d] line-through decoration-2">无边界外包</span></div></div><div className="bg-[#bff5d1] p-7 text-[#071817]"><p className="text-xs uppercase tracking-[.18em] opacity-60">而是一条可验证路径</p><p className="mt-4 text-2xl font-black leading-snug">问题 → 真实数据 → MVD → 生产采用</p></div></div>
      </section>
      <section id="method" className="bg-[#071817] px-5 py-24 text-white lg:px-10 lg:py-30"><div className="mx-auto max-w-[1500px]"><p className="eyebrow text-[#bff5d1]">蓝旗鱼方法</p><h2 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.055em] lg:text-7xl">从现场到系统，五步闭环</h2><p className="mt-5 text-lg text-white/60">每一步都有进入条件、证据、决策门和清晰的人工边界。</p><div className="mt-16 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-5">{steps.map(([n,t,d]) => <article key={n} className="min-h-64 border-b border-white/20 py-7 sm:border-r lg:border-b-0 lg:px-6 first:pl-0"><span className="text-xs text-[#bff5d1]">{n}</span><h3 className="mt-16 text-2xl font-bold">{t}</h3><p className="mt-3 leading-7 text-white/55">{d}</p></article>)}</div></div></section>
      <section className="bg-[#dff6e6] px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-2"><div><p className="eyebrow text-[#147e66]">合作边界</p><h2 className="mt-5 text-5xl font-black tracking-[-.055em] lg:text-7xl">先证明值得做，<br/>再开始开发。</h2></div><div className="space-y-4 text-lg font-semibold">{['有真实数据、真实流程和明确负责人','允许工程师进入现场，让一线参与验证','愿意从一个高价值问题开始','接受人工审核、风险护栏与结果复查'].map(x => <p key={x} className="flex gap-4 border-t border-foreground/20 py-4"><Check className="text-[#147e66]" />{x}</p>)}<Button render={<Link href="/diagnostic" />} size="lg" className="mt-5 h-13 rounded-none bg-[#ff735d] px-6 text-[#071817] hover:bg-[#ff826f]">5 分钟适配度自检 <ArrowRight /></Button></div></div></section>
    </main><SiteFooter/></>
  );
}
