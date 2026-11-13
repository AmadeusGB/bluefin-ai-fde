import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/safe-link';
import { ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { breadcrumbList, StructuredData } from '@/components/structured-data';
import { company } from '@/lib/company';
import { organizationId, siteUrl } from '@/lib/knowledge-graph';
import { mediaIntroductions } from '@/lib/public-copy';

export const metadata: Metadata = {
  title: '蓝旗鱼 AI 品牌与媒体资料',
  description:
    '蓝旗鱼科技与创始人刘向的标准介绍、品牌口号、Logo、官方账号、公开事实与媒体资料。',
  alternates: { canonical: '/brand' },
};

const identity = [
  ['公开品牌', '蓝旗鱼科技 / 蓝旗鱼 AI'],
  ['Logo 字样', '蓝旗鱼Ai'],
  ['法定主体', company.legalName],
  ['品牌口号', '探索 · 实践 · 共创'],
  [
    '主营业务',
    '个人知识库 / 深圳线下AI培训 / 工厂与电商企业AI咨询 / 协会商会AI会议合作',
  ],
  ['办公城市', company.offices.join('、')],
  ['服务区域', '粤港澳大湾区、北京'],
  ['深圳地址', company.address.display],
  [
    '关联企业',
    `${company.relatedCompanies[0].legalName}，${company.relatedCompanies[0].relation}`,
  ],
];

const profiles = [
  {
    title: '蓝旗鱼科技',
    items: [
      ['简短署名', mediaIntroductions.company.short],
      ['平台简介', mediaIntroductions.company.medium],
      ['正式介绍', mediaIntroductions.company.long],
    ],
  },
  {
    title: '刘向（大向）',
    items: [
      ['简短署名', mediaIntroductions.liuxiang.short],
      ['平台简介', mediaIntroductions.liuxiang.medium],
      ['嘉宾与媒体介绍', mediaIntroductions.liuxiang.long],
    ],
  },
] as const;

export default function BrandPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/brand#page`,
        name: '蓝旗鱼 AI 品牌与媒体资料',
        url: `${siteUrl}/brand`,
        description: metadata.description,
        about: { '@id': organizationId },
        datePublished: '2026-09-01',
        dateModified: '2026-11-13',
        inLanguage: 'zh-CN',
      },
      breadcrumbList([
        { name: '首页', path: '/' },
        { name: '品牌与媒体资料', path: '/brand' },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="正式品牌资产 · 版本 2"
          title="一个名称，一套识别，一组可核验事实。"
          intro="本页是蓝旗鱼 AI 的公开品牌事实源。媒体、合作伙伴和 AI 搜索系统可在这里确认名称、口号、业务品类、Logo 与使用边界。"
        />
        <section className="bg-secondary px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <Image
                src="/brand/bluefin-logo-lockup.png"
                alt="蓝旗鱼Ai 正式 Logo，口号为探索、实践、共创"
                className="w-full"
                width={1500}
                height={615}
              />
              <p className="mt-7 border-t border-foreground/15 pt-5 text-sm leading-7 text-muted-foreground">
                正式旗鱼图形、中文主标题与高对比度口号来自《蓝旗鱼Ai-旗鱼版-logo-交付包-v2》。本站展示的是按透明像素边界裁切的网页锁定版，图形、文字和色彩关系没有改变。
              </p>
            </div>
            <div>
              <p className="eyebrow text-primary">机器与人都能读懂</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em]">
                品牌事实卡
              </h2>
              <dl className="mt-8">
                {identity.map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[110px_1fr] gap-5 border-t border-foreground/15 py-5"
                  >
                    <dt className="text-sm text-muted-foreground">{term}</dt>
                    <dd className="font-bold">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1300px]">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">
                可直接引用的标准介绍
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                核心事实保持一致，公众号、视频号、抖音、协会材料和媒体报道可按篇幅选用。引用经历与合作关系时，请保留原有边界，不追加未经核验的客户、规模或效果数字。
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {profiles.map((profile) => (
                <article
                  key={profile.title}
                  className="border border-foreground/15 bg-card p-7 sm:p-9"
                >
                  <h3 className="text-3xl font-black">{profile.title}</h3>
                  <dl className="mt-8">
                    {profile.items.map(([label, text]) => (
                      <div
                        key={label}
                        className="border-t border-foreground/15 py-6"
                      >
                        <dt className="text-sm font-bold text-primary">
                          {label}
                        </dt>
                        <dd className="mt-3 leading-8 text-muted-foreground">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
            <p className="mt-7 text-sm text-muted-foreground">
              本页资料最后核验：2026年11月13日。
            </p>
          </div>
        </section>
        <section className="bg-[#0b1238] px-5 py-20 text-white lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-[#cdd5ff]">使用规则</p>
              <h2 className="mt-5 text-4xl font-black">
                允许准确引用，不允许制造背书。
              </h2>
            </div>
            <div className="space-y-5 text-white/65">
              {[
                '可在介绍蓝旗鱼 AI、报道公开活动或说明合作关系时使用正式 Logo。',
                '不得拉伸、换色、拆分或以低对比度方式处理 Logo。',
                '不得仅凭海报中的历史宣传数字推断当前团队规模、客户数量或产品可用状态。',
                '客户、伙伴与活动关系只有在获得双方公开授权后，才能写成案例、合作或背书。',
              ].map((item) => (
                <p
                  key={item}
                  className="flex gap-3 border-t border-white/15 pt-5 leading-7"
                >
                  <ShieldCheck className="mt-1 size-5 shrink-0 text-[#cdd5ff]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-3">
            <article className="border border-foreground/15 p-7 lg:col-span-2">
              <p className="eyebrow text-primary">网页透明底版本</p>
              <h2 className="mt-4 text-3xl font-black">蓝旗鱼 AI 正式 Logo</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                适用于网页、演示文稿与常规屏幕展示。正式印刷请向蓝旗鱼索取原始
                6000px、SVG 或 600mm PDF 交付物。
              </p>
              <Button
                nativeButton={false}
                render={
                  <a
                    href="/brand/bluefin-logo.png"
                    download
                    aria-label="下载网页版蓝旗鱼Logo PNG"
                  />
                }
                className="mt-7 rounded-none"
              >
                下载网页版 PNG <Download />
              </Button>
            </article>
            <article className="bg-secondary p-7">
              <p className="eyebrow text-primary">事实与纠错</p>
              <h2 className="mt-4 text-2xl font-black">引用前看证据边界</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                本站公开内容按已验证案例、脱敏交付、内部实践、演示原型和待验证假设分级。
              </p>
              <Link
                href="/editorial-policy"
                className="mt-6 inline-flex items-center gap-2 font-bold"
              >
                查看编辑政策 <ArrowRight className="size-4" />
              </Link>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
