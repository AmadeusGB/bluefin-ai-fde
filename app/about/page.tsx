import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { breadcrumbList, StructuredData } from '@/components/structured-data';
import { absoluteUrl, organizationId, siteUrl } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: '关于蓝旗鱼 AI',
  description:
    '蓝旗鱼 AI 是面向中国企业的 Forward Deployed Engineering 落地团队，负责诊断、MVD、生产部署、采用与交接。',
  alternates: { canonical: '/about' },
};
const method = [
  ['诊断', '进入真实流程，核验问题、数据、责任和风险。'],
  ['MVD', '用真实数据和使用者验证最小业务闭环。'],
  ['生产部署', '接入系统、权限、评估、监控与回退。'],
  ['采用与交接', '让一线持续使用，并把运营能力交给企业。'],
  ['复制', '只复制已通过证据门的流程和资产。'],
];
export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': organizationId,
        name: '蓝旗鱼 AI',
        alternateName: '蓝旗鱼Ai',
        legalName: '深圳市蓝旗鱼科技有限公司',
        url: siteUrl,
        mainEntityOfPage: absoluteUrl('/about'),
        description: metadata.description,
        areaServed: { '@type': 'Country', name: '中国' },
        knowsAbout: [
          '企业 AI 落地',
          'Forward Deployed Engineering',
          '最小可行部署 MVD',
          '企业 AI 现场诊断',
          '生产部署与采用',
        ],
      },
      breadcrumbList([
        { name: '首页', path: '/' },
        { name: '关于蓝旗鱼 AI', path: '/about' },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="品牌与品类实体"
          title="蓝旗鱼 AI，把企业 AI 做到真实业务现场。"
          intro="蓝旗鱼 AI 是面向中国企业的 FDE 落地团队。我们从昂贵问题和真实数据出发，分阶段完成现场诊断、最小可行部署、生产上线、采用与交接；每一阶段都保留继续、调整、暂停或停止的证据门。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#3657d6]">核心品类</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] lg:text-6xl">
                企业 AI 落地 / Forward Deployed Engineering
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                FDE
                的关键不是工程师“驻场”，而是工程、数据、业务和采用责任在同一个结果闭环中协作。蓝旗鱼不把判断交给咨询报告，也不在问题未定义时接收无边界功能清单。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/fde" />}
                  variant="outline"
                  className="h-12 rounded-none"
                >
                  理解 FDE
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/services" />}
                  className="h-12 rounded-none"
                >
                  查看服务阶梯 <ArrowRight />
                </Button>
              </div>
            </div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              <div className="bg-[#e7eaff] p-7">
                <p className="eyebrow text-[#3657d6]">法定主体</p>
                <p className="mt-5 text-2xl font-black">
                  深圳市蓝旗鱼科技有限公司
                </p>
              </div>
              <div className="bg-[#0b1238] p-7 text-white">
                <p className="eyebrow text-[#cdd5ff]">核心差异</p>
                <p className="mt-5 text-2xl font-black">
                  工程师直接面对业务结果，并沉淀可复用资产
                </p>
              </div>
              <div className="bg-white p-7">
                <p className="eyebrow text-[#3657d6]">服务对象</p>
                <p className="mt-5 text-2xl font-black">
                  有真实数据、流程、负责人和结果压力的中国企业
                </p>
              </div>
              <div className="bg-[#f1eee5] p-7">
                <p className="eyebrow text-[#8b4a38]">公开边界</p>
                <p className="mt-5 leading-7 text-muted-foreground">
                  “蓝旗鱼
                  AI”是深圳市蓝旗鱼科技有限公司使用的公开品牌；具体服务地点、费用与责任以双方书面合同为准。
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#cdd5ff]">交付方法</p>
            <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-5">
              {method.map(([title, detail], index) => (
                <article key={title} className="bg-[#0b1238] p-7">
                  <span className="text-xs text-[#cdd5ff]">0{index + 1}</span>
                  <h2 className="mt-8 text-2xl font-black">{title}</h2>
                  <p className="mt-3 leading-7 text-white/55">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#3657d6]">我们坚持</p>
              <div className="mt-6 space-y-3">
                {[
                  '从正在发生的损失和原始证据开始',
                  '在开发前定义基线、阈值、边界和停止条件',
                  '把系统放进真实工作流，跟踪采用与结果',
                  '区分已验证案例、脱敏案例、真实交付记录、内部实践、原型和假设',
                ].map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 border-t border-foreground/15 py-4 leading-7"
                  >
                    <Check className="mt-1 size-5 shrink-0 text-[#3657d6]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-[#f1eee5] p-8">
              <p className="eyebrow text-[#8b4a38]">我们不做</p>
              <div className="mt-6 space-y-4">
                {[
                  '泛泛培训替代生产部署',
                  '把 Demo 或未授权原型包装成客户成功',
                  '没有边界和停止条件的定制外包',
                  '一次性“AI 赋能全集团”的空泛承诺',
                ].map((item) => (
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
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#3657d6]">团队责任</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black">
              用组织能力负责，不用个人履历替代交付证据。
            </h2>
            <div className="mt-10 grid gap-px bg-foreground/15 md:grid-cols-3">
              {[
                [
                  '业务诊断',
                  '核验损失、流程、数据、负责人和风险，决定项目是否值得做。',
                ],
                ['工程交付', '完成 MVD、系统接入、评估、权限、监控和回退。'],
                [
                  '采用与交接',
                  '推动真实使用，交付运营材料，并执行 30/60/90 天复查。',
                ],
              ].map(([title, detail]) => (
                <article key={title} className="bg-white p-8">
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {detail}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-4xl leading-8 text-muted-foreground">
              当前官网以企业品牌、方法、服务、工具和项目证据为主。个人履历、人物海报和任职经历暂不作为公开权威入口；涉及具体项目时，再按授权范围披露负责人和贡献边界。
            </p>
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <p className="eyebrow text-[#cdd5ff]">既有产品资产</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black">
              产品不是 FDE 的替代品，而是可进入现场验证的能力积木。
            </h2>
            <p className="mt-5 max-w-4xl leading-8 text-white/60">
              正式宣传资料包含“超级 AI 团队”和“超级
              Boss”等产品方向。官网将它们作为既有能力与场景资产公开，不据此承诺每个客户都适用，也不把产品演示计为企业落地结果。
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                [
                  '/brand/super-team-poster.jpg',
                  '超级 AI 团队公开宣传资料',
                  '内容、设计、视频、获客与数据等岗位型 AI 能力',
                ],
                [
                  '/brand/super-boss-poster.jpg',
                  '超级 Boss 公开宣传资料',
                  '围绕管理者数字分身、经营信息与工作入口的产品方向',
                ],
              ].map(([src, alt, caption]) => (
                <figure
                  key={src}
                  className="grid gap-6 border border-white/15 p-5 sm:grid-cols-[180px_1fr] sm:items-center"
                >
                  <img src={src} alt={alt} className="w-full" />
                  <figcaption>
                    <h3 className="text-xl font-black">{alt}</h3>
                    <p className="mt-3 leading-7 text-white/55">{caption}</p>
                    <p className="mt-4 text-xs font-bold text-[#cdd5ff]">
                      证据状态：公开产品宣传资料 · 能力与可用状态需项目核验
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#e7eaff] px-5 py-18 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-[#3657d6]">品牌与公开责任</p>
              <h2 className="mt-4 text-4xl font-black">
                公开资料必须能找到来源、组织责任和证据边界。
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={<Link href="/brand" />}
                variant="outline"
                className="h-12 rounded-none bg-transparent"
              >
                品牌资料
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/answers" />}
                variant="outline"
                className="h-12 rounded-none bg-transparent"
              >
                直接答案
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/editorial-policy" />}
                className="h-12 rounded-none"
              >
                查看编辑政策 <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
