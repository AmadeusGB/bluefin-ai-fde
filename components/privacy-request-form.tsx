"use client";
import { SyntheticEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
type State = "idle" | "submitting" | "success" | "error";
export function PrivacyRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      contact: data.get("contact"),
      problem: data.get("request"),
      company: "隐私权利请求",
      role: "数据主体或授权代表",
      industry: "隐私与数据处理",
      source: "privacy-request",
      consent: data.get("consent") === "on",
    };
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
      <div className="bg-[#e7eaff] p-8">
        <CheckCircle2 className="size-10 text-[#3657d6]" />
        <h2 className="mt-5 text-2xl font-black">请求已收到</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          蓝旗鱼会先核验请求人与相关记录的关系，再处理访问、更正或删除请求。为保护数据，不会在无法确认身份时披露记录。
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-6">
      <div>
        <label htmlFor="privacy-name" className="text-sm font-bold">
          姓名 *
        </label>
        <Input
          id="privacy-name"
          name="name"
          required
          maxLength={80}
          className="mt-2 h-12 rounded-none bg-white"
        />
      </div>
      <div>
        <label htmlFor="privacy-contact" className="text-sm font-bold">
          提交申请时使用的联系方式 *
        </label>
        <Input
          id="privacy-contact"
          name="contact"
          required
          maxLength={160}
          className="mt-2 h-12 rounded-none bg-white"
          placeholder="用于定位记录和回复请求"
        />
      </div>
      <div>
        <label htmlFor="privacy-request" className="text-sm font-bold">
          访问、更正或删除请求 *
        </label>
        <Textarea
          id="privacy-request"
          name="request"
          required
          minLength={20}
          maxLength={2000}
          className="mt-2 min-h-32 rounded-none bg-white"
          placeholder="请说明请求类型、可能的提交时间与相关企业；不要提交身份证件、密码或额外敏感信息。"
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 accent-[#3657d6]"
        />
        <span>
          我同意蓝旗鱼保存本次请求和联系方式，用于身份核验、处理请求与留存处理记录。
        </span>
      </label>
      <Button
        type="submit"
        disabled={state === "submitting"}
        className="h-12 rounded-none justify-self-start"
      >
        {state === "submitting" ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ArrowRight />
        )}
        {state === "submitting" ? "正在提交" : "提交隐私请求"}
      </Button>
      {state === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}
    </form>
  );
}
