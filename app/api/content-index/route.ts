import { siteContent, siteContentUpdatedAt } from "@/lib/site-content";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const items = kind
    ? siteContent.filter((item) => item.kind === kind)
    : siteContent;
  return Response.json(
    {
      name: "蓝旗鱼 AI 内容目录",
      description:
        "企业 AI 落地、FDE、诊断工具、行业方案、交付证据与公开研究的机器可读目录。",
      language: "zh-CN",
      updatedAt: siteContentUpdatedAt,
      publisher: {
        name: "蓝旗鱼 AI",
        id: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization",
        url: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about",
      },
      author: {
        name: "郭斌 Arthur",
        id: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about/arthur-guo#person",
        url: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about/arthur-guo",
      },
      license: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/editorial-policy",
      knowledgeGraph: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/api/knowledge-graph",
      count: items.length,
      items: items.map((item) => ({
        ...item,
        id: `https://bluefin-ai-fde.liuxiangth.chatgpt.site${item.path === "/" ? "" : item.path}#content`,
        url: `https://bluefin-ai-fde.liuxiangth.chatgpt.site${item.path === "/" ? "" : item.path}`,
        language: "zh-CN",
        dateModified: siteContentUpdatedAt,
        publisherId: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization",
        authorId: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about/arthur-guo#person",
      })),
    },
    { headers: { "cache-control": "public, max-age=3600" } },
  );
}
