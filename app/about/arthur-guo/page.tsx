import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { breadcrumbList, StructuredData } from "@/components/structured-data";
export const metadata: Metadata = {
  title: "郭斌 Arthur",
  description:
    "郭斌 Arthur，企业 AI 系统设计与 FDE 落地实践者，北京航空航天大学计算机硕士。",
  alternates: { canonical: "/about/arthur-guo" },
};
const experience = [
  [
    "Deeper Network 前高级工程师",
    "参与全球化网络安全产品核心研发与企业 AI 转型。",
  ],
  ["国家电网重大专项项目负责人", "协调总部需求、第三方团队与跨省节点部署。"],
  [
    "国家重大专项“核高基”验收项目组长",
    "参与操作系统、芯片测试、证据审查与正式验收。",
  ],
  ["大数据 / AI 车联网平台项目负责人", "负责 Matrix 平台研发组织与项目交付。"],
  [
    "北航软件可信性工程研究中心测试负责人",
    "管理多个测试团队，参与研发与长期客户现场工作。",
  ],
];
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://bluefin-ai.cn/about/arthur-guo#person",
        name: "郭斌",
        alternateName: "Arthur Guo",
        url: "https://bluefin-ai.cn/about/arthur-guo",
        jobTitle: "企业 AI 系统设计与 FDE 落地实践者",
        affiliation: { "@id": "https://bluefin-ai.cn/#organization" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "北京航空航天大学" },
        knowsAbout: [
          "Forward Deployed Engineering",
          "企业 AI 落地",
          "复杂系统交付",
          "软件可信性工程",
        ],
      },
      breadcrumbList([
        { name: "首页", path: "/" },
        { name: "郭斌 Arthur", path: "/about/arthur-guo" },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="关于创始实践者"
          title="郭斌 Arthur"
          intro="企业 AI 系统设计与 FDE 落地实践者。以复杂系统工程、正式验收和长期客户现场经验为基础，帮助企业把模糊经营问题转化为可部署、可控制、可交接的生产系统。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <Image
                src="/arthur-guo.png"
                width={900}
                height={900}
                alt="郭斌 Arthur"
                className="aspect-square w-full object-cover"
                priority
              />
              <div className="bg-[#dff6e6] p-6">
                <p className="font-black">北京航空航天大学</p>
                <p className="mt-1 text-muted-foreground">计算机专业硕士</p>
              </div>
            </div>
            <div>
              <p className="eyebrow text-[#147e66]">可核验经历摘要</p>
              <div className="mt-5">
                {experience.map(([title, detail]) => (
                  <article
                    key={title}
                    className="border-t border-foreground/20 py-5"
                  >
                    <h2 className="text-xl font-black">{title}</h2>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      {detail}
                    </p>
                  </article>
                ))}
              </div>
              <Button
                nativeButton={false}
                render={
                  <Link href="/evidence/production-proof/deeper-network" />
                }
                variant="outline"
                className="mt-7 rounded-none"
              >
                查看 Deeper Network 生产实践 <ArrowRight />
              </Button>
              <div className="mt-10 bg-[#071817] p-8 text-white">
                <p className="eyebrow text-[#bff5d1]">方法立场</p>
                <p className="mt-4 text-3xl font-black leading-tight">
                  不卖一个 Demo，
                  <br />
                  把结果做到生产。
                </p>
                <p className="mt-4 leading-7 text-white/55">
                  从模糊问题到真实采用，对边界、风险、验收与交接负责。
                </p>
              </div>
            </div>
          </div>
          <StructuredData data={schema} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
