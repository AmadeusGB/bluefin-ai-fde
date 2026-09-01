import { siteContent, siteContentUpdatedAt } from "@/lib/site-content";

export const siteUrl = "https://bluefin-ai.cn";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const authorId = `${siteUrl}/about/arthur-guo#person`;
export const fdeTermId = `${siteUrl}/fde#term`;
export const fdeMethodId = `${siteUrl}/fde#method`;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function buildKnowledgeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: "蓝旗鱼 AI",
        url: siteUrl,
        description:
          "面向中国企业的 Forward Deployed Engineering 落地团队：从业务诊断、MVD 到生产部署、采用与交接。",
        founder: { "@id": authorId },
        areaServed: { "@type": "Country", name: "中国" },
        knowsAbout: [
          { "@id": fdeTermId },
          "企业 AI 落地",
          "最小可行部署 MVD",
          "企业 AI 现场诊断",
          "生产部署与采用",
        ],
        publishingPrinciples: `${siteUrl}/editorial-policy`,
      },
      {
        "@type": "Person",
        "@id": authorId,
        name: "郭斌",
        alternateName: "Arthur Guo",
        url: `${siteUrl}/about/arthur-guo`,
        jobTitle: "企业 AI 系统设计与 FDE 落地实践者",
        affiliation: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "蓝旗鱼 AI",
        url: siteUrl,
        inLanguage: "zh-CN",
        publisher: { "@id": organizationId },
        dateModified: siteContentUpdatedAt,
        mainEntity: [{ "@id": fdeTermId }, { "@id": fdeMethodId }],
      },
      {
        "@type": "DefinedTerm",
        "@id": fdeTermId,
        name: "Forward Deployed Engineering",
        alternateName: ["FDE", "前线部署工程", "前向部署工程"],
        description:
          "由工程师直接进入客户真实业务现场，与业务人员共同发现问题、接触数据、构建系统并推动采用，并以可核验业务结果为交付证据的工作方式。",
        inDefinedTermSet: `${siteUrl}/knowledge`,
        url: `${siteUrl}/fde`,
      },
      {
        "@type": "HowTo",
        "@id": fdeMethodId,
        name: "蓝旗鱼 FDE 五阶段交付方法",
        description: "诊断、MVD、生产部署、采用、复制。",
        inLanguage: "zh-CN",
        url: `${siteUrl}/fde`,
        author: { "@id": authorId },
        publisher: { "@id": organizationId },
        step: ["诊断", "MVD", "生产部署", "采用", "复制"].map(
          (name, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name,
          }),
        ),
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/services#service`,
        name: "企业 AI 落地 / Forward Deployed Engineering",
        serviceType: "企业 AI 落地 / Forward Deployed Engineering",
        url: `${siteUrl}/services`,
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: "中国" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "有真实数据、真实流程、负责人和结果压力的企业",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/api/content-index#catalog`,
        name: "蓝旗鱼 AI 内容目录",
        url: `${siteUrl}/api/content-index`,
        inLanguage: "zh-CN",
        dateModified: siteContentUpdatedAt,
        publisher: { "@id": organizationId },
        hasPart: siteContent.map((item) => ({
          "@type": "CreativeWork",
          "@id": `${absoluteUrl(item.path)}#content`,
          name: item.title,
          abstract: item.summary,
          url: absoluteUrl(item.path),
          genre: item.kind,
          inLanguage: "zh-CN",
          dateModified: siteContentUpdatedAt,
          author: { "@id": authorId },
          publisher: { "@id": organizationId },
        })),
      },
    ],
  };
}
