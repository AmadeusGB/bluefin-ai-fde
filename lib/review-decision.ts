export type ReviewDecision = "待完成" | "GO" | "ADJUST" | "HOLD" | "STOP";

export function reviewDecision({
  answered,
  total,
  criticalFailures,
  score,
  phase,
}: {
  answered: number;
  total: number;
  criticalFailures: number;
  score: number;
  phase: "30" | "60" | "90";
}): [ReviewDecision, string] {
  if (answered < total) return ["待完成", `完成 ${total} 项后生成阶段决策。`];
  if (criticalFailures >= 2 || score < 30)
    return ["STOP", "停止当前运行或扩展，恢复安全流程并重新定义方案。"];
  if (criticalFailures === 1 || score < 50)
    return ["HOLD", "暂停扩大范围，先处理关键红线并补齐最低证据。"];
  if (score < 75)
    return ["ADJUST", "继续受控运行，但必须收窄范围并完成明确整改。"];
  return [
    "GO",
    phase === "90"
      ? "证据支持维持或受控复制，下一场景仍需独立验收。"
      : "阶段条件成立，保持边界并进入下一次复查。",
  ];
}
