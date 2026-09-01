"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { captureFirstTouch } from "@/lib/attribution";
import Link from "next/link";

type State = "idle" | "submitting" | "success" | "error";
export function ApplicationForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [diagnostic, setDiagnostic] = useState({
    score: "",
    decision: "",
    profile: "",
    source: "website",
  });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const timer = window.setTimeout(
      () =>
        setDiagnostic({
          score: p.get("score") || "",
          decision: p.get("decision") || "",
          profile: /^[0-9a-f]{1,3}$/i.test(p.get("profile") || "")
            ? p.get("profile") || ""
            : "",
          source: p.get("source") || "website",
        }),
      0,
    );
    captureFirstTouch();
    return () => window.clearTimeout(timer);
  }, []);
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries()) as Record<
      string,
      unknown
    >;
    payload.consent = data.get("consent") === "on";
    payload.diagnosticScore = diagnostic.score;
    payload.decision = diagnostic.decision;
    payload.diagnosticProfile = diagnostic.profile;
    payload.source = diagnostic.source;
    Object.assign(payload, captureFirstTouch());
    try {
      const response = await fetch("/api/diagnostic-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "提交失败");
      setState("success");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "提交失败，请稍后重试。",
      );
    }
  }
  if (state === "success")
    return (
      <div className="bg-[#dff6e6] p-10">
        <CheckCircle2 className="size-12 text-[#147e66]" />
        <h2 className="mt-6 text-3xl font-black">申请已收到</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          蓝旗鱼会先核验问题价值、数据与负责人条件。符合资格时，再联系确认 30
          分钟沟通；不适合启动的项目，也会明确说明主要缺口。
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-2">
      <div>
        <label className="text-sm font-bold" htmlFor="name">
          姓名 *
        </label>
        <Input
          id="name"
          name="name"
          required
          maxLength={80}
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="company">
          企业 / 组织 *
        </label>
        <Input
          id="company"
          name="company"
          required
          maxLength={120}
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="contact">
          联系方式 *
        </label>
        <Input
          id="contact"
          name="contact"
          required
          maxLength={160}
          placeholder="手机号、邮箱或微信（任选一种）"
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="role">
          你的角色 *
        </label>
        <Input
          id="role"
          name="role"
          required
          maxLength={80}
          placeholder="例如：业务负责人、总经理、数字化负责人"
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div className="lg:col-span-2">
        <label className="text-sm font-bold" htmlFor="industry">
          行业 / 业务场景 *
        </label>
        <Input
          id="industry"
          name="industry"
          required
          maxLength={80}
          placeholder="例如：跨境电商高价值询盘、制造异常处理、协会会员服务"
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div className="lg:col-span-2">
        <label className="text-sm font-bold" htmlFor="problem">
          最想解决的业务问题 *
        </label>
        <Textarea
          id="problem"
          name="problem"
          required
          minLength={20}
          maxLength={2000}
          placeholder="请说明当前流程、主要损失、发生频率，以及谁对结果负责。不要在这里提交密码、客户名单或其他敏感数据。"
          className="mt-2 min-h-36 rounded-none bg-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="problemFrequency">
          问题发生频率 *
        </label>
        <select
          id="problemFrequency"
          name="problemFrequency"
          required
          defaultValue=""
          className="mt-2 h-12 w-full border bg-white px-3 text-sm"
        >
          <option value="" disabled>
            请选择
          </option>
          <option value="daily">每天或持续发生</option>
          <option value="weekly">每周发生</option>
          <option value="monthly">每月发生</option>
          <option value="occasional">偶发或尚未确认</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="annualLossRange">
          估算年度损失 / 机会规模 *
        </label>
        <select
          id="annualLossRange"
          name="annualLossRange"
          required
          defaultValue=""
          className="mt-2 h-12 w-full border bg-white px-3 text-sm"
        >
          <option value="" disabled>
            请选择
          </option>
          <option value="over_200w">超过 200 万元</option>
          <option value="50w_200w">50–200 万元</option>
          <option value="10w_50w">10–50 万元</option>
          <option value="under_10w">低于 10 万元</option>
          <option value="unknown">尚未测算</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="dataReadiness">
          真实数据准备度 *
        </label>
        <select
          id="dataReadiness"
          name="dataReadiness"
          required
          defaultValue=""
          className="mt-2 h-12 w-full border bg-white px-3 text-sm"
        >
          <option value="" disabled>
            请选择
          </option>
          <option value="ready">可提供脱敏样本并明确权限</option>
          <option value="partial">有数据，仍需整理或审批</option>
          <option value="unknown">不确定数据位置或质量</option>
          <option value="unavailable">当前无法提供真实数据</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="ownerReadiness">
          业务负责人投入度 *
        </label>
        <select
          id="ownerReadiness"
          name="ownerReadiness"
          required
          defaultValue=""
          className="mt-2 h-12 w-full border bg-white px-3 text-sm"
        >
          <option value="" disabled>
            请选择
          </option>
          <option value="committed">负责人可参与诊断、验收与决策</option>
          <option value="identified">已明确负责人，投入待确认</option>
          <option value="candidate">只有候选负责人</option>
          <option value="none">尚无业务负责人</option>
        </select>
      </div>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="lg:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 size-4 accent-[#147e66]"
          />
          <span>
            我已阅读并同意
            <Link
              href="/privacy"
              className="font-bold text-[#147e66] underline underline-offset-4"
            >
              《隐私与数据处理政策》
            </Link>
            。蓝旗鱼保存以上信息、首次落地页、外部引荐来源及活动参数，仅用于项目资格判断、后续联系与渠道效果分析；表单会记录同意时间和政策版本。
          </span>
        </label>
        {diagnostic.score && (
          <p className="mt-4 text-sm text-[#147e66]">
            已附带诊断结果：{diagnostic.decision} · {diagnostic.score}/100
          </p>
        )}
      </div>
      <div className="lg:col-span-2">
        <Button
          type="submit"
          size="lg"
          disabled={state === "submitting"}
          className="h-12 rounded-none px-6"
        >
          {state === "submitting" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ArrowRight />
          )}
          {state === "submitting" ? "正在提交" : "提交诊断申请"}
        </Button>
        {state === "error" && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {message}
          </p>
        )}
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          提交不代表项目被接受，也不会自动进入销售流程。请勿提交密码、未授权客户数据或商业机密；你可以通过隐私政策页面请求访问、更正或删除记录。
        </p>
      </div>
    </form>
  );
}
