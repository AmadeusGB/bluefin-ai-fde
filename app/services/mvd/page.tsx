import type { Metadata } from "next";
import { ServiceProductPage } from "@/components/service-product-page";
export const metadata: Metadata = {
  title: "企业 AI 最小可行部署 MVD 服务",
  description:
    "蓝旗鱼用真实数据、真实使用者和生产边界交付最小业务闭环，并以基线结果决定是否进入生产。",
  alternates: { canonical: "/services/mvd" },
};
export default function Page() {
  return (
    <ServiceProductPage
      title="企业 AI 最小可行部署 MVD"
      eyebrow="FDE 服务 · 第二阶段"
      intro="MVD 不是把 Demo 换个名字。它在一个受控真实流程中连接真实数据、真实使用者和结果写回，建立评估、人工边界与回退，并用部署前确定的基线和阈值决定是否进入生产。"
      description={metadata.description as string}
      path="/services/mvd"
      source="mvd-service"
      entry={[
        "付费现场诊断已确认一个高价值问题和最小闭环。",
        "真实数据样本可取得，来源、权限和已知缺口已说明。",
        "业务负责人和一线使用者能够参与评估与采用。",
        "基线、成功阈值、人机边界和 STOP 红线已书面确定。",
      ]}
      outputs={[
        {
          title: "最小工作系统",
          detail: "限定流程、角色和数据范围，可处理真实任务并写回结果。",
        },
        {
          title: "评估与基线对比",
          detail: "固定评估集、任务级结果、人工修改、错误分布和业务指标。",
        },
        {
          title: "生产边界",
          detail: "权限、证据、审批、拒绝、日志、监控与回退规则。",
        },
        {
          title: "阶段决策包",
          detail: "GO、ADJUST、HOLD 或 STOP 结论，以及生产阶段建议范围。",
        },
      ]}
      steps={[
        {
          title: "锁定范围",
          detail: "冻结首期问题、数据、使用者、指标、排除项和红线。",
        },
        {
          title: "连接闭环",
          detail: "构建最小系统，接入必要数据与结果写回，不先追求全量集成。",
        },
        {
          title: "真实运行",
          detail: "由真实使用者处理受控任务，记录 AI、人工和最终结果。",
        },
        {
          title: "对比决策",
          detail: "按预定口径比较基线，评审风险、采用、成本和下一步。",
        },
      ]}
      customerInputs={[
        "按约提供数据、系统权限与领域规则负责人",
        "安排真实使用者参与任务测试和反馈",
        "对价格、承诺、审批等高风险动作保留有权限的人工判断",
        "接受未达到阈值时调整、暂停或停止",
      ]}
      exclusions={[
        "不以演示数据或精心挑选样本替代真实任务",
        "不在 MVD 阶段承诺全组织覆盖和无限接口",
        "不把模型离线分数等同于业务结果",
        "不因为已经投入开发而自动判定 GO",
      ]}
      decision="只有最小闭环在结果、风险、采用和成本上同时通过，才进入生产部署。"
    />
  );
}
