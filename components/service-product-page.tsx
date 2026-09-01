import Link from "@/components/safe-link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ServiceStructuredData } from "@/components/structured-data";

type Item = { title: string; detail: string };
export function ServiceProductPage({
  title,
  eyebrow,
  intro,
  description,
  path,
  entry,
  outputs,
  steps,
  customerInputs,
  exclusions,
  decision,
  source,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  description: string;
  path: string;
  entry: string[];
  outputs: Item[];
  steps: Item[];
  customerInputs: string[];
  exclusions: string[];
  decision: string;
  source: string;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceStructuredData
          title={title}
          description={description}
          path={path}
          parent={{ name: "FDE 服务", path: "/services" }}
        />
        <PageHero eyebrow={eyebrow} title={title} intro={intro} />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#147e66]">进入条件</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                上一阶段的证据必须先通过。
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                每一项进入条件都需要原始记录、负责人确认或可复查结果。条件不足时先调整或暂停，不用后续开发掩盖前期证据缺口。
              </p>
            </div>
            <div>
              {entry.map((item) => (
                <p
                  key={item}
                  className="flex gap-3 border-t border-foreground/15 py-5 text-lg"
                >
                  <Check className="mt-1 size-5 shrink-0 text-[#147e66]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#dff6e6] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#147e66]">合同目标与交付物</p>
            <div className="mt-10 grid md:grid-cols-4">
              {outputs.map((item, index) => (
                <article
                  key={item.title}
                  className="border-t border-foreground/20 py-7 md:border-r md:px-6 first:pl-0"
                >
                  <span className="text-xs text-[#147e66]">0{index + 1}</span>
                  <h2 className="mt-8 text-2xl font-black">{item.title}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#071817] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#bff5d1]">交付步骤</p>
            <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-4">
              {steps.map((item, index) => (
                <article key={item.title} className="bg-[#071817] p-7">
                  <span className="text-xs text-[#bff5d1]">0{index + 1}</span>
                  <h2 className="mt-8 text-2xl font-black">{item.title}</h2>
                  <p className="mt-3 leading-7 text-white/55">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#147e66]">企业需要投入</p>
              <div className="mt-6 space-y-3">
                {customerInputs.map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 border-t border-foreground/15 py-4 leading-7"
                  >
                    <Check className="mt-1 size-5 shrink-0 text-[#147e66]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-[#f1eee5] p-8">
              <p className="eyebrow text-[#8b4a38]">明确不包含</p>
              <div className="mt-6 space-y-4">
                {exclusions.map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 leading-7 text-muted-foreground"
                  >
                    <X className="mt-1 size-5 shrink-0 text-[#8b4a38]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#dff6e6] px-5 py-18 lg:px-10">
          <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#147e66]">阶段决策门</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black">{decision}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                范围、周期和费用在资格与证据核验后书面确认，不用统一套餐替代真实项目边界。
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href={`/apply?source=${source}`} />}
              className="h-13 rounded-none px-6"
            >
              提交真实业务问题 <ArrowRight />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
