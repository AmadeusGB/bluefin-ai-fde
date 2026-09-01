import type { Metadata } from "next";
import { AttributionCapture } from "@/components/attribution-capture";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bluefin-ai.cn"),
  title: {
    default: "蓝旗鱼 AI｜企业 AI 落地与 FDE",
    template: "%s｜蓝旗鱼 AI",
  },
  description:
    "蓝旗鱼 AI 是面向中国企业的 FDE 落地团队：进入真实业务现场，用真实数据完成最小可行部署。",
  alternates: {
    canonical: "/",
    types: {
      "application/json": "/api/content-index",
      "application/ld+json": "/api/knowledge-graph",
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    title: "蓝旗鱼 AI｜企业 AI 落地 · FDE",
    description: "让 AI 在真实业务里产生结果。",
    url: "/",
    siteName: "蓝旗鱼 AI",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "蓝旗鱼 AI｜企业 AI 落地 · FDE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "蓝旗鱼 AI｜企业 AI 落地 · FDE",
    description: "让 AI 在真实业务里产生结果。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bluefin-ai.cn/#organization",
        name: "蓝旗鱼 AI",
        url: "https://bluefin-ai.cn",
        mainEntityOfPage: "https://bluefin-ai.cn/about",
        description: "面向中国企业的 Forward Deployed Engineering 落地团队",
        founder: {
          "@type": "Person",
          "@id": "https://bluefin-ai.cn/about/arthur-guo#person",
          name: "郭斌 Arthur",
          url: "https://bluefin-ai.cn/about/arthur-guo",
        },
        knowsAbout: [
          "企业 AI 落地",
          "Forward Deployed Engineering",
          "最小可行部署",
          "企业 AI 现场诊断",
        ],
        publishingPrinciples: "https://bluefin-ai.cn/editorial-policy",
      },
      {
        "@type": "WebSite",
        "@id": "https://bluefin-ai.cn/#website",
        name: "蓝旗鱼 AI",
        url: "https://bluefin-ai.cn",
        inLanguage: "zh-CN",
        publisher: { "@id": "https://bluefin-ai.cn/#organization" },
      },
    ],
  };
  return (
    <html lang="zh-CN">
      <body>
        <AttributionCapture />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      </body>
    </html>
  );
}
