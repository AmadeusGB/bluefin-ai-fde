import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { ArticleMeta } from '@/components/article-meta';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { Button } from '@/components/ui/button';
type Section = { title: string; detail: string; output?: string };
type Related = { label: string; href: string };
export function MethodKnowledgePage({
  eyebrow,
  title,
  intro,
  description,
  path,
  sections,
  good,
  bad,
  verification,
  related,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  path: string;
  sections: Section[];
  good: string[];
  bad: string[];
  verification: string[];
  related: Related[];
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero eyebrow={eyebrow} title={title} intro={intro} />
        <ArticleMeta title={title} description={description} path={path} />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow text-[#147e66]">方法步骤</p>
            <div className="mt-8">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  className="grid gap-4 border-t border-foreground/20 py-8 md:grid-cols-[70px_1fr_2fr]"
                >
                  <span className="text-[#147e66]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl font-black">{section.title}</h2>
                  <div>
                    <p className="text-lg leading-8 text-muted-foreground">
                      {section.detail}
                    </p>
                    {section.output && (
                      <p className="mt-4 border-l-2 border-[#147e66] pl-4 text-sm font-bold leading-6">
                        可核验产出：{section.output}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#dff6e6] px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#147e66]">适用边界</p>
              <h2 className="mt-4 text-4xl font-black">什么时候应该使用？</h2>
              <div className="mt-7 space-y-3">
                {good.map((item) => (
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
            <div>
              <p className="eyebrow text-[#a63e2d]">不适用边界</p>
              <h2 className="mt-4 text-4xl font-black">什么时候先不要用？</h2>
              <div className="mt-7 space-y-3">
                {bad.map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 border-t border-foreground/15 py-4 leading-7"
                  >
                    <X className="mt-1 size-5 shrink-0 text-[#ff735d]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#071817] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow text-[#bff5d1]">完成标准</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.04em] lg:text-6xl">
              产出必须能被检查，而不是只有一张漂亮图。
            </h2>
            <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-3">
              {verification.map((item, index) => (
                <article key={item} className="bg-[#071817] p-7">
                  <span className="text-xs text-[#bff5d1]">0{index + 1}</span>
                  <p className="mt-5 font-bold leading-7">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-16 lg:px-10">
          <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-[#147e66]">继续推进</p>
              <h2 className="mt-3 text-3xl font-black">
                从方法进入真实项目判断。
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {related.map((item, index) => (
                <Button
                  key={item.href}
                  nativeButton={false}
                  render={<Link href={item.href} />}
                  variant={index ? 'outline' : 'default'}
                  className="h-11 rounded-none"
                >
                  {item.label}
                  <ArrowRight />
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
