const siteUrl = "https://bluefin-ai.cn";

type Breadcrumb = { name: string; path: string };

export function breadcrumbList(items: Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceStructuredData({
  title,
  description,
  path,
  parent = { name: "行业与业务场景", path: "/solutions" },
}: {
  title: string;
  description: string;
  path: string;
  parent?: Breadcrumb;
}) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${path}#service`,
        name: title,
        description,
        url: `${siteUrl}${path}`,
        serviceType: "企业 AI 落地 / Forward Deployed Engineering",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "Country", name: "中国" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "有真实数据、真实流程和结果责任人的中国企业",
        },
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        parent,
        { name: title, path },
      ]),
    ],
  };
  return <StructuredData data={data} />;
}
