import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { ApplicationForm } from "@/components/application-form";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "申请企业 AI 业务诊断",
  description:
    "提交结构化企业 AI 业务诊断申请，说明行业、业务问题、负责人和联系方式。",
  alternates: { canonical: "/apply" },
};
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="商业漏斗 · 资格确认"
          title="提交一个真实问题，而不是一份功能清单。"
          intro="请用几分钟说明问题发生在哪里、造成什么损失、谁负责结果。蓝旗鱼会先做资格判断；只有问题、数据和组织条件匹配，才进入下一步沟通。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-10 border-l-4 border-[#3657d6] bg-[#e7eaff] p-6 text-sm leading-7">
              提交后先进行资格判断；30 分钟资格确认不等于完整方案咨询。通过后再书面确认付费现场诊断的范围、周期与报价。{' '}
              <Link href="/field-diagnostic" className="font-bold underline underline-offset-4">
                查看交付物与合作边界
              </Link>
            </div>
            <ApplicationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
