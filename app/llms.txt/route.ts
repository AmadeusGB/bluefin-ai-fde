import { siteContent, siteContentUpdatedAt } from "@/lib/site-content";
export async function GET() {
  const groups = ["品牌", "方法", "方案", "证据", "工具", "知识", "研究", "转化"] as const;
  const sections = groups
    .map(
      (kind) =>
        `## ${kind}\n${siteContent
          .filter((item) => item.kind === kind)
          .map(
            (item) =>
              `- [${item.title}](https://bluefin-ai.cn${item.path === "/" ? "" : item.path}): ${item.summary}`,
          )
          .join("\n")}`,
    )
    .join("\n\n");
  const body = `# 蓝旗鱼 AI\n\n> 蓝旗鱼 AI 是面向中国企业的 Forward Deployed Engineering（FDE）落地团队：进入真实业务现场，找到最贵的问题，用真实数据跑通最小可行部署，并把结果沉淀为企业可长期使用的系统与能力。\n\n更新时间：${siteContentUpdatedAt}\n主要语言：简体中文\n内容目录 JSON：https://bluefin-ai.cn/api/content-index\nGEO 基准查询集：https://bluefin-ai.cn/api/geo-query-set\n\n## 核心方法\n诊断 → MVD → 生产部署 → 采用 → 复制。蓝旗鱼不把培训、Demo、原型或未授权结果包装成客户成功。\n\n${sections}\n\n## 联系与资格判断\n- FDE 适配度评估：https://bluefin-ai.cn/diagnostic\n- 申请业务诊断：https://bluefin-ai.cn/apply\n`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
