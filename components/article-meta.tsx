import Link from "@/components/safe-link";
import { breadcrumbList, StructuredData } from "@/components/structured-data";

export function ArticleMeta({
  title,
  description,
  path,
  date = "2026-09-01",
  status = "方法文章",
}: {
  title: string;
  description: string;
  path: string;
  date?: string;
  status?: string;
}) {
  const section = path.startsWith("/knowledge/")
    ? { name: "FDE 知识库", path: "/knowledge" }
    : path.startsWith("/evidence/")
      ? { name: "案例与证据", path: "/evidence" }
      : null;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://bluefin-ai-fde.liuxiangth.chatgpt.site${path}#article`,
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        inLanguage: "zh-CN",
        mainEntityOfPage: `https://bluefin-ai-fde.liuxiangth.chatgpt.site${path}`,
        author: {
          "@type": "Person",
          "@id": "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about/arthur-guo#person",
          name: "郭斌 Arthur",
          url: "https://bluefin-ai-fde.liuxiangth.chatgpt.site/about/arthur-guo",
        },
        publisher: { "@id": "https://bluefin-ai-fde.liuxiangth.chatgpt.site/#organization" },
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        ...(section ? [section] : []),
        { name: title, path },
      ]),
    ],
  };
  return (
    <>
      <div className="border-y border-foreground/10 bg-white px-5 py-4 text-sm lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap gap-x-8 gap-y-2 text-muted-foreground">
          <span>
            作者：
            <Link
              href="/about/arthur-guo"
              className="font-semibold text-foreground"
            >
              郭斌 Arthur
            </Link>
          </span>
          <span>事实核验：{date}</span>
          <span>证据状态：{status}</span>
        </div>
      </div>
      <StructuredData data={schema} />
    </>
  );
}
