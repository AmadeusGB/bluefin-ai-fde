'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
  ['问题价值', '存在一个明确、持续且代价高昂的业务问题。'],
  ['真实数据', '能够提供真实数据、工作样本或历史记录。'],
  ['结果负责人', '有一位业务负责人对结果负责并能协调资源。'],
  ['一线参与', '实际使用者能参与诊断、验证与采用。'],
  ['小步部署', '愿意从一个可控范围开始，而非一次覆盖全集团。'],
  ['成功基线', '能够定义当前基线和可被核验的改进指标。'],
];

export function DiagnosticTool() {
  const [selected, setSelected] = useState<boolean[]>(questions.map(() => false));
  const score = selected.filter(Boolean).length;
  const result = useMemo(() => score >= 5 ? ['GO', '具备启动现场诊断的主要条件。下一步是确认数据范围、业务负责人和首个 MVD 边界。'] : score >= 3 ? ['ADJUST', '方向可能成立，但启动前仍需补齐负责人、数据或成功基线。'] : ['HOLD', '暂不建议立即开发。先把业务问题、损失和责任边界说清楚。'], [score]);
  return <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><aside className="bg-[#071817] p-8 text-white lg:p-10"><p className="eyebrow text-[#bff5d1]">即时结果</p><div className="mt-8 flex items-end gap-2"><strong className="text-8xl font-black text-[#bff5d1]">{score}</strong><span className="pb-3 text-2xl text-white/45">/ 6</span></div><p className="mt-8 text-3xl font-black">{result[0]}</p><p className="mt-4 leading-7 text-white/60">{result[1]}</p><p className="mt-8 border-t border-white/15 pt-6 text-sm leading-6 text-white/45">这是资格初筛，不是项目承诺。正式结论需要核验流程、数据、风险与组织条件。</p></aside><div><div className="space-y-3">{questions.map(([label, text], i) => <button key={label} aria-pressed={selected[i]} onClick={() => setSelected(v => v.map((x,j) => j === i ? !x : x))} className={`flex w-full gap-4 border p-5 text-left transition ${selected[i] ? 'border-[#147e66] bg-[#dff6e6]' : 'border-foreground/15 bg-white hover:border-foreground/35'}`}><span className={`mt-0.5 grid size-6 shrink-0 place-items-center border ${selected[i] ? 'border-[#147e66] bg-[#147e66] text-white' : 'border-foreground/30'}`}>{selected[i] && <Check className="size-4" />}</span><span><b>{label}</b><span className="mt-1 block leading-6 text-muted-foreground">{text}</span></span></button>)}</div><div className="mt-6 flex flex-wrap gap-3"><Button nativeButton={false} render={<a href={`mailto:hello@bluefin-ai.cn?subject=申请FDE资格确认（${result[0]} ${score}/6）`} />} size="lg" className="h-12 rounded-none px-5">申请 30 分钟资格确认 <ArrowRight /></Button><Button variant="outline" size="lg" className="h-12 rounded-none" onClick={() => setSelected(questions.map(() => false))}><RotateCcw />重新评估</Button></div></div></div>;
}
