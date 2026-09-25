export { WorldHeader as SiteHeader, WorldFooter as SiteFooter } from '@/components/world/shell';
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-foreground/10 px-5 py-16 lg:px-10 lg:py-22">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-6 max-w-[1150px] text-[clamp(3rem,5.4vw,5.75rem)] font-black leading-[1.02] tracking-[-.055em] text-balance">
          {title}
        </h1>
        <p className="mt-8 max-w-4xl text-lg leading-8 text-muted-foreground text-pretty lg:text-xl lg:leading-9">
          {intro}
        </p>
      </div>
    </section>
  );
}
