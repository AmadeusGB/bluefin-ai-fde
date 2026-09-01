import type { Metadata } from "next";
import { MethodKnowledgePage } from "@/components/method-knowledge-page";
export const metadata: Metadata = {
  title: "企业 AI 项目如何推动采用与交接",
  description:
    "采用与交接需要工作流设计、负责人、培训、反馈、监控、文档和 30/60/90 天复查。",
  alternates: { canonical: "/knowledge/adoption-handover" },
};
const sections = [
  {
    title: "把 AI 放进真实工作流",
    detail:
      "明确用户在什么触发点使用系统、输入什么、如何审核、结果写回哪里；不要把新工具放在流程之外等待自发使用。",
    output: "新旧流程对比、入口、审核与结果写回。",
  },
  {
    title: "定义采用与业务指标",
    detail:
      "同时记录激活、持续使用、人工修改、拒绝、任务完成和业务结果；登录次数不能证明流程被改变。",
    output: "采用漏斗、业务基线和目标阈值。",
  },
  {
    title: "建立反馈闭环",
    detail:
      "让一线用户能标记错误、缺知识、流程阻塞和例外；为每类反馈指定处理人和响应周期。",
    output: "反馈分类、负责人和进入评估集的规则。",
  },
  {
    title: "交付可运营资产",
    detail:
      "交付权限、数据字典、提示与规则、评估集、日志、告警、回退、操作手册和变更记录，而不只是代码。",
    output: "企业能够独立维护的系统与文档清单。",
  },
  {
    title: "执行 30/60/90 天复查",
    detail:
      "30 天看可用性和错误，60 天看流程采用与负责人运转，90 天看业务结果、成本和是否复制。",
    output: "继续、调整、暂停或扩展的复查决策。",
  },
];
export default function Page() {
  return (
    <MethodKnowledgePage
      eyebrow="方法 · 采用与交接"
      title="上线不是完成。企业能够持续使用和接管，才算交付。"
      intro="企业 AI 项目的采用与交接，是把系统嵌入真实工作流、明确运营责任、建立反馈与复查，并交付企业可以自行维护的权限、数据、评估、监控和回退资产。"
      description={metadata.description as string}
      path="/knowledge/adoption-handover"
      sections={sections}
      good={[
        "系统需要一线人员改变工作方式，并持续提供反馈。",
        "项目目标包括长期使用、业务结果和企业自主维护。",
        "准备从一个成功场景复制到其他团队或流程。",
      ]}
      bad={[
        "把培训签到、账号开通或一次演示当作采用证据。",
        "交接只有代码和部署地址，没有评估、权限、监控和回退说明。",
        "项目结束后没有内部负责人，也没有复查时间和结果口径。",
      ]}
      verification={[
        "能够从触发点追踪到使用、审核、结果写回和业务结果。",
        "企业内部人员能独立处理常见运营、知识更新和回退。",
        "30/60/90 天复查使用相同口径，并记录继续、调整或停止的决定。",
      ]}
      related={[
        { label: "开始 30/60/90 天复查", href: "/tools/30-60-90-review" },
        { label: "查看 MVD 方法", href: "/knowledge/mvd-design" },
        { label: "查看案例交接标准", href: "/evidence/case-template" },
      ]}
    />
  );
}
