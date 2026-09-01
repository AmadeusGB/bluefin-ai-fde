import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { breadcrumbList, StructuredData } from "@/components/structured-data";
export const metadata: Metadata = {
  title: "蓝旗鱼 FDE 服务",
  description:
    "从付费现场诊断、最小可行部署 MVD 到生产部署、采用与交接的分阶段企业 AI 落地服务。",
  alternates: { canonical: "/services" },
};
const services = [
  [
    "01",
    "付费现场诊断",
    "证明问题值得做，并核验流程、数据、责任和风险。",
    "五张地图、业务基线、MVD 决策包",
    "/field-diagnostic",
  ],
  [
    "02",
    "最小可行部署 MVD",
    "用真实数据、真实使用者和生产边界跑通一个最小闭环。",
    "工作系统、评估集、基线对比、阶段决定",
    "/services/mvd",
  ],
  [
    "03",
    "生产部署与采用",
    "把已验证闭环接入权限、系统、监控、工作流和企业运营责任。",
    "生产系统、护栏、运营资产、30/60/90 天复查",
    "/services/production-adoption",
  ],
];
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://bluefin-ai.cn/services#collection",
        name: "蓝旗鱼 FDE 服务",
        description: metadata.description,
        url: "https://bluefin-ai.cn/services",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item[1],
            url: `https://bluefin-ai.cn${item[4]}`,
          })),
        },
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        { name: "FDE 服务", path: "/services" },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="FDE 商业服务"
          title="每一阶段，先用证据决定是否继续。"
          intro="蓝旗鱼不把诊断、原型和生产上线打包成一个无法停止的大项目。现场诊断证明问题与条件，MVD 证明最小闭环值得部署，生产阶段证明系统能够安全运行、被一线采用并由企业接管。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            {services.map(([n, title, detail, output, href]) => (
              <Link
                key={href}
                href={href}
                className="group grid gap-5 border-t border-foreground/20 py-9 lg:grid-cols-[70px_1fr_1.5fr_1.5fr_30px]"
              >
                <span className="text-[#147e66]">{n}</span>
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="leading-7 text-muted-foreground">{detail}</p>
                <p className="font-semibold leading-7">交付：{output}</p>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
            <div className="mt-14 grid gap-8 bg-[#071817] p-8 text-white lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow text-[#bff5d1]">共同规则</p>
                <h2 className="mt-4 text-3xl font-black">
                  阶段报价、阶段验收、阶段停止。
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-white/55">
                  任何阶段都不承诺自动进入下一阶段。前一阶段输出属于客户决策资产；继续合作时再确认新的范围、责任、周期、费用和验收标准。
                </p>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/diagnostic" />}
                className="h-12 rounded-none bg-[#bff5d1] text-[#071817] hover:bg-[#d4f9e1]"
              >
                先做适配度评估 <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
