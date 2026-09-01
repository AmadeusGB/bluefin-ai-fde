'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type State='idle'|'submitting'|'success'|'error';
export function ApplicationForm(){
  const [state,setState]=useState<State>('idle');
  const [message,setMessage]=useState('');
  const [diagnostic,setDiagnostic]=useState({score:'',decision:'',source:'website'});
  useEffect(()=>{const p=new URLSearchParams(window.location.search);setDiagnostic({score:p.get('score')||'',decision:p.get('decision')||'',source:p.get('source')||'website'})},[]);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setState('submitting');setMessage('');
    const data=new FormData(event.currentTarget);const payload=Object.fromEntries(data.entries()) as Record<string,unknown>;payload.consent=data.get('consent')==='on';payload.diagnosticScore=diagnostic.score;payload.decision=diagnostic.decision;payload.source=diagnostic.source;
    try{const response=await fetch('/api/diagnostic-applications',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const result=await response.json() as {error?:string};if(!response.ok) throw new Error(result.error||'提交失败');setState('success')}catch(error){setState('error');setMessage(error instanceof Error?error.message:'提交失败，请稍后重试。')}
  }
  if(state==='success') return <div className="bg-[#dff6e6] p-10"><CheckCircle2 className="size-12 text-[#147e66]"/><h2 className="mt-6 text-3xl font-black">申请已收到</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">蓝旗鱼会先核验问题价值、数据与负责人条件。符合资格时，再联系确认 30 分钟沟通；不适合启动的项目，也会明确说明主要缺口。</p></div>;
  return <form onSubmit={submit} className="grid gap-8 lg:grid-cols-2"><div><label className="text-sm font-bold" htmlFor="name">姓名 *</label><Input id="name" name="name" required maxLength={80} className="mt-2 h-12 rounded-none bg-white"/></div><div><label className="text-sm font-bold" htmlFor="company">企业 / 组织 *</label><Input id="company" name="company" required maxLength={120} className="mt-2 h-12 rounded-none bg-white"/></div><div><label className="text-sm font-bold" htmlFor="contact">联系方式 *</label><Input id="contact" name="contact" required maxLength={160} placeholder="手机号、邮箱或微信（任选一种）" className="mt-2 h-12 rounded-none bg-white"/></div><div><label className="text-sm font-bold" htmlFor="role">你的角色 *</label><Input id="role" name="role" required maxLength={80} placeholder="例如：业务负责人、总经理、数字化负责人" className="mt-2 h-12 rounded-none bg-white"/></div><div className="lg:col-span-2"><label className="text-sm font-bold" htmlFor="industry">行业 / 业务场景 *</label><Input id="industry" name="industry" required maxLength={80} placeholder="例如：跨境电商高价值询盘、制造异常处理、协会会员服务" className="mt-2 h-12 rounded-none bg-white"/></div><div className="lg:col-span-2"><label className="text-sm font-bold" htmlFor="problem">最想解决的业务问题 *</label><Textarea id="problem" name="problem" required minLength={20} maxLength={2000} placeholder="请说明当前流程、主要损失、发生频率，以及谁对结果负责。不要在这里提交密码、客户名单或其他敏感数据。" className="mt-2 min-h-36 rounded-none bg-white"/></div><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/><div className="lg:col-span-2"><label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="consent" required className="mt-1 size-4 accent-[#147e66]"/><span>我同意蓝旗鱼保存以上信息，仅用于项目资格判断与后续联系。我不会在表单中提交账号密码、未授权客户数据或商业机密。</span></label>{diagnostic.score&&<p className="mt-4 text-sm text-[#147e66]">已附带诊断结果：{diagnostic.decision} · {diagnostic.score}/100</p>}</div><div className="lg:col-span-2"><Button type="submit" size="lg" disabled={state==='submitting'} className="h-12 rounded-none px-6">{state==='submitting'?<Loader2 className="animate-spin"/>:<ArrowRight/>}{state==='submitting'?'正在提交':'提交诊断申请'}</Button>{state==='error'&&<p role="alert" className="mt-3 text-sm text-destructive">{message}</p>}<p className="mt-4 text-xs leading-5 text-muted-foreground">提交不代表项目被接受，也不会自动进入销售流程。蓝旗鱼会先判断是否具备 FDE 条件。</p></div></form>;
}
