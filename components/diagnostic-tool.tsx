'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, Printer, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';

const groups = [
  { key:'value', label:'问题价值', questions:['问题造成持续、可观察的时间或收入损失','当前损失足以支持一项小范围部署','成功可以用一到两个业务指标核验'] },
  { key:'data', label:'数据条件', questions:['能提供真实数据、工作样本或历史记录','清楚数据来源、权限和敏感信息范围','能够为首轮验证准备代表性样本'] },
  { key:'owner', label:'组织条件', questions:['有业务负责人对结果负责并协调资源','一线使用者能参与诊断和验收','技术与业务双方能共同作出 GO / STOP 决策'] },
  { key:'adoption', label:'部署采用', questions:['愿意从一个可控范围开始','接受人工审核、回退机制和生产护栏','有人负责上线后的 30 / 60 / 90 天复查'] },
];
const flat = groups.flatMap((group) => group.questions.map((text) => ({ group:group.key, text })));

export function DiagnosticTool() {
  const [selected, setSelected] = useState<boolean[]>(flat.map(() => false));
  const checked = selected.filter(Boolean).length;
  const score = Math.round((checked / flat.length) * 100);
  const dimensions = groups.map((group) => { const indexes=flat.map((q,i)=>q.group===group.key?i:-1).filter(i=>i>=0); const yes=indexes.filter(i=>selected[i]).length; return {...group, score:Math.round((yes/indexes.length)*100)}; });
  const result = useMemo(() => score >= 80 ? ['GO', '具备进入 FDE 资格确认的主要条件。下一步是核验数据范围、问题基线和首个 MVD 边界。'] : score >= 50 ? ['ADJUST', '方向可能成立，但启动前应补齐得分最低的条件，避免项目在开发后期停滞。'] : ['HOLD', '暂不建议立即开发。先把问题价值、数据或组织责任说清楚。'], [score]);
  const weakest=[...dimensions].sort((a,b)=>a.score-b.score)[0];
  return <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
    <aside className="self-start bg-[#071817] p-8 text-white lg:sticky lg:top-24 lg:p-10 print:static">
      <p className="eyebrow text-[#bff5d1]">初步诊断报告</p><div className="mt-8 flex items-end gap-2"><strong className="text-7xl font-black text-[#bff5d1] lg:text-8xl">{score}</strong><span className="pb-3 text-2xl text-white/45">/ 100</span></div><p className="mt-6 text-3xl font-black">{result[0]}</p><p className="mt-4 leading-7 text-white/60">{result[1]}</p>
      <div className="mt-8 space-y-5 border-t border-white/15 pt-7">{dimensions.map(d=><Progress key={d.key} value={d.score} className="gap-2 text-white"><ProgressLabel>{d.label}</ProgressLabel><ProgressValue>{d.score}</ProgressValue></Progress>)}</div>
      <div className="mt-8 border-t border-white/15 pt-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#bff5d1]">优先补齐</p><p className="mt-2 font-bold">{weakest.label}</p><p className="mt-2 text-sm leading-6 text-white/50">优先确认该维度的缺口，再决定是否投入开发。</p></div>
    </aside>
    <div><div className="space-y-10">{groups.map((group,g)=><section key={group.key}><div className="mb-4 flex items-end justify-between"><div><span className="text-xs font-bold text-[#147e66]">0{g+1}</span><h2 className="mt-1 text-2xl font-black">{group.label}</h2></div><span className="text-sm text-muted-foreground">{dimensions[g].score}/100</span></div><div className="space-y-3">{group.questions.map((text,j)=>{const i=g*3+j;return <button key={text} aria-pressed={selected[i]} onClick={()=>setSelected(v=>v.map((x,k)=>k===i?!x:x))} className={`flex w-full gap-4 border p-5 text-left transition ${selected[i]?'border-[#147e66] bg-[#dff6e6]':'border-foreground/15 bg-white hover:border-foreground/35'}`}><span className={`mt-0.5 grid size-6 shrink-0 place-items-center border ${selected[i]?'border-[#147e66] bg-[#147e66] text-white':'border-foreground/30'}`}>{selected[i]&&<Check className="size-4"/>}</span><span className="leading-6">{text}</span></button>})}</div></section>)}</div>
      <div className="mt-10 border-t border-foreground/20 pt-7"><p className="text-sm text-muted-foreground">{checked} / {flat.length} 项条件已具备。此结果是资格初筛，不是项目承诺；正式结论需要核验流程、数据、风险与组织条件。</p><div className="mt-6 flex flex-wrap gap-3"><Button nativeButton={false} render={<a href={`/apply?score=${score}&decision=${result[0]}`} />} size="lg" className="h-12 rounded-none px-5">提交结果，申请资格确认 <ArrowRight/></Button><Button variant="outline" size="lg" className="h-12 rounded-none" onClick={()=>window.print()}><Printer/>打印报告</Button><Button variant="ghost" size="lg" className="h-12 rounded-none" onClick={()=>setSelected(flat.map(()=>false))}><RotateCcw/>重新评估</Button></div></div>
    </div>
  </div>;
}
