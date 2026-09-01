import type { Metadata } from "next";
import { ServiceProductPage } from "@/components/service-product-page";
export const metadata: Metadata = {
  title: "企业 AI 生产部署、采用与交接服务",
  description:
    "将已验证 MVD 接入企业系统、权限、监控和工作流，推动一线采用并完成运营交接与复查。",
  alternates: { canonical: "/services/production-adoption" },
};
export default function Page() {
  return (
    <ServiceProductPage
      title="企业 AI 生产部署、采用与交接"
      eyebrow="FDE 服务 · 第三阶段"
      intro="生产部署不是把 MVD 放到服务器上。蓝旗鱼把已验证闭环接入企业身份、权限、数据、业务系统、监控与回退，让一线在真实工作流中使用，并把运营、评估和变更能力交给企业。"
      description={metadata.description as string}
      path="/services/production-adoption"
      source="production-adoption-service"
      entry={[
        "MVD 已用真实任务和固定口径达到阶段阈值。",
        "生产范围、用户、系统接口、数据权限和责任人已确认。",
        "高风险动作、人工审批、拒绝、回退与事故响应已设计。",
        "企业指定产品、业务、技术或运营负责人接管长期运行。",
      ]}
      outputs={[
        {
          title: "生产系统",
          detail: "企业身份、权限、数据源、接口、日志、监控、告警和回退。",
        },
        {
          title: "工作流采用",
          detail: "触发入口、审核、结果写回、用户训练、反馈和采用指标。",
        },
        {
          title: "运营资产",
          detail: "数据字典、评估集、规则、手册、变更记录和事故流程。",
        },
        {
          title: "复制建议",
          detail: "30/60/90 天复查结果、成本、风险与下一场景进入条件。",
        },
      ]}
      steps={[
        {
          title: "生产设计",
          detail: "确认架构、身份、权限、数据、接口、容量、风险和恢复目标。",
        },
        {
          title: "受控上线",
          detail: "分角色或范围发布，保留旧流程和人工回退，观察真实运行。",
        },
        {
          title: "采用运营",
          detail: "训练用户、处理反馈、维护知识与评估集，跟踪结果写回。",
        },
        {
          title: "交接复查",
          detail: "企业人员独立运营，并在 30/60/90 天决定优化、复制或停止。",
        },
      ]}
      customerInputs={[
        "提供生产环境、身份权限、接口与安全协作",
        "指定业务、技术、数据和运营责任人",
        "允许持续记录采用、错误、人工修改、成本和业务结果",
        "按变更与事故流程维护规则、知识和权限",
      ]}
      exclusions={[
        "不在 MVD 未通过时直接扩大到生产范围",
        "不承诺完全无人值守或替代最终责任人",
        "不交付只有代码、没有评估监控和运营责任的系统",
        "不把账号开通、培训签到或访问次数当作采用成功",
      ]}
      decision="企业能够安全运行、持续使用并独立接管后，才讨论复制到新的团队、区域或场景。"
    />
  );
}
