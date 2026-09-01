import type { Metadata } from 'next';
import Link from '@/components/safe-link';
import { ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { breadcrumbList, StructuredData } from '@/components/structured-data';
import { organizationId, siteUrl } from '@/lib/knowledge-graph';

export const metadata: Metadata = {
  title: '蓝旗鱼 AI 品牌与媒体资料',
  description:
    '蓝旗鱼 AI 的正式名称、品牌口号、Logo、实体说明、公开资料使用边界与下载入口。',
  alternates: { canonical: '/brand' },
};

const identity = [
  ['公开品牌', '蓝旗鱼 AI'],
  ['Logo 字样', '蓝旗鱼Ai'],
  ['法定主体', '深圳市蓝旗鱼科技有限公司'],
  ['品牌口号', '探索 · 实践 · 共创'],
  ['核心品类', '企业 AI 落地 / Forward Deployed Engineering'],
];

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
        dateModified: '2026-09-01',
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
        <section className="bg-[#e7eaff] px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <img
                src="/brand/bluefin-logo-lockup.png"
                alt="蓝旗鱼Ai 正式 Logo，口号为探索、实践、共创"
                className="w-full"
              />
              <p className="mt-7 border-t border-foreground/15 pt-5 text-sm leading-7 text-muted-foreground">
                正式旗鱼图形、中文主标题与高对比度口号来自《蓝旗鱼Ai-旗鱼版-logo-交付包-v2》。本站展示的是按透明像素边界裁切的网页锁定版，图形、文字和色彩关系没有改变。
              </p>
            </div>
            <div>
              <p className="eyebrow text-[#3657d6]">机器与人都能读懂</p>
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
              <p className="eyebrow text-[#3657d6]">网页透明底版本</p>
              <h2 className="mt-4 text-3xl font-black">蓝旗鱼 AI 正式 Logo</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                适用于网页、演示文稿与常规屏幕展示。正式印刷请向蓝旗鱼索取原始
                6000px、SVG 或 600mm PDF 交付物。
              </p>
              <Button
                nativeButton={false}
                render={<a href="/brand/bluefin-logo.png" download />}
                className="mt-7 rounded-none"
              >
                下载网页版 PNG <Download />
              </Button>
            </article>
            <article className="bg-[#e7eaff] p-7">
              <p className="eyebrow text-[#3657d6]">事实与纠错</p>
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
