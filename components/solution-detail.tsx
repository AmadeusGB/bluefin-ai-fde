import Link from "@/components/safe-link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ServiceStructuredData } from "@/components/structured-data";

type SolutionDetailProps = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  directTitle: string;
  directAnswer: string;
  problems: string[];
  mvd: Array<[string, string]>;
  boundaries: string[];
  notFit: string[];
  evidence: string;
};

export function SolutionDetail({
  slug,
  eyebrow,
  title,
  intro,
  directTitle,
  directAnswer,
  problems,
  mvd,
  boundaries,
  notFit,
  evidence,
}: SolutionDetailProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceStructuredData
          title={title}
          description={intro}
          path={`/solutions/${slug}`}
        />
        <PageHero eyebrow={eyebrow} title={title} intro={intro} />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-[#3657d6]">直接回答</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                {directTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {directAnswer}
              </p>
            </div>
            <div>
              {problems.map((problem) => (
                <p
                  key={problem}
                  className="flex gap-3 border-t border-foreground/15 py-5 text-lg"
                >
                  <Check className="shrink-0 text-[#3657d6]" />
                  {problem}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#cdd5ff]">建议的最小可行部署</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.04em] lg:text-6xl">
              先跑通一个可验收闭环。
            </h2>
            <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-4">
              {mvd.map(([name, detail], index) => (
                <article key={name} className="bg-[#0b1238] p-7">
                  <span className="text-xs text-[#cdd5ff]">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-black">{name}</h3>
                  <p className="mt-4 leading-7 text-white/60">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#3657d6]">系统与人工边界</p>
              <h2 className="mt-4 text-4xl font-black">
                AI 协助判断，人保留责任。
              </h2>
              <div className="mt-8 space-y-3">
                {boundaries.map((item) => (
                  <p
                    key={item}
                    className="border-l-2 border-[#3657d6] pl-4 leading-7"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-[#f1eee5] p-8">
              <p className="eyebrow text-[#8b4a38]">暂不适合</p>
              <div className="mt-6 space-y-4">
                {notFit.map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 leading-7 text-muted-foreground"
                  >
                    <X className="mt-1 size-4 shrink-0 text-[#8b4a38]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#e7eaff] px-5 py-18 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#3657d6]">证据说明</p>
              <h2 className="mt-4 text-4xl font-black">
                不把行业假设包装成客户成绩。
              </h2>
            </div>
            <div>
              <p className="leading-8 text-muted-foreground">{evidence}</p>
              <Button
                nativeButton={false}
                render={<Link href="/apply" />}
                size="lg"
                className="mt-7 h-12 rounded-none"
              >
                提交真实业务问题 <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
