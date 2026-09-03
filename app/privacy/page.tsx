import type { Metadata } from 'next';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
import { PrivacyRequestForm } from '@/components/privacy-request-form';
import { breadcrumbList, StructuredData } from '@/components/structured-data';
import { absoluteUrl, organizationId } from '@/lib/knowledge-graph';
export const metadata: Metadata = {
  title: '隐私与数据处理政策',
  description:
    '蓝旗鱼 AI 对诊断申请、资格判断、匿名漏斗计数与首次来源数据的收集、使用、保存和权利请求规则。',
  alternates: { canonical: '/privacy' },
};
const sections = [
  [
    '收集哪些信息',
    '申请表收集姓名、企业或组织、联系方式、角色、行业或场景、业务问题、问题频率、年度损失或机会区间、数据准备度和负责人投入度，并由后四项生成 A/B/C 资格优先级；如果从适配度评估进入，还会保存分数、决定和 12 项是/否编码。资格优先级只用于人工审查排序，不会自动接受或拒绝项目。',
  ],
  [
    '为什么处理',
    '仅用于项目资格判断、联系申请人、安排诊断或服务沟通、记录处理进展，以及以汇总方式分析渠道效果。提交申请不代表项目被接受。',
  ],
  [
    '首次来源信息',
    '浏览器会在当前会话的 sessionStorage 中保存首次落地路径、外部引荐 URL 和 UTM 活动参数，用于识别直接访问、搜索、AI 引荐或活动来源；用户主动提交表单时，这些首次来源字段会与申请一并保存。',
  ],
  [
    '匿名漏斗计数',
    '为计算内容访问、AI 引荐及诊断转化，本站按日期、来源和页面路径汇总记录页面访问、诊断开始、携带报告申请、申请页打开和申请成功次数。应用数据库不为这些汇总计数保存访客 ID、IP、设备信息、Cookie、完整引荐 URL或可还原个人访问序列的记录；浏览器只在当前会话中保存去重标记。',
  ],
  [
    '不应提交什么',
    '请勿在公开表单中提交账号密码、身份证件、支付信息、未授权客户名单、个人敏感信息、源代码、密钥或商业机密。正式项目资料应在双方确认安全方式和权限后提供。',
  ],
  [
    '保存在哪里与谁可访问',
    '申请记录保存在站点使用的结构化数据库中；站点托管和基础设施服务商会为运行系统处理必要数据。运营后台受登录和管理员邮箱限制，当前仅授权站点所有者访问。',
  ],
  [
    '保存期限',
    '未进入合作的申请在最后有效活动后按年度复核；原则上不再具有资格判断、沟通、争议处理或合规必要性的记录应删除或去标识。合同、项目与法定义务涉及的记录按合同和适用要求保存。',
  ],
  [
    '共享与公开',
    '蓝旗鱼不会出售申请信息，也不会把申请内容公开为案例。客户名称、证言、结果或合作关系只有在取得明确授权并完成证据核验后才公开。',
  ],
  [
    '访问、更正与删除',
    '申请人可以请求确认是否存在相关记录、访问其提交内容、更正错误或删除不再需要的记录。蓝旗鱼会先核验请求人与记录的关系；法律、合同或争议处理要求保留时会说明限制。',
  ],
  [
    '安全与限制',
    '采用字段长度限制、服务端校验、登录保护和最小化后台访问，但任何网络系统都不能承诺绝对安全。发现异常时将限制访问、核查影响并采取必要措施。',
  ],
  [
    '政策版本',
    '当前版本：2026-09-01-v1.2。表单会记录同意时间和政策版本。收集目的、字段或共享方式实质变化时，将更新本页和版本号。',
  ],
];
export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl('/privacy')}#policy`,
        name: '蓝旗鱼 AI 隐私与数据处理政策',
        description: metadata.description,
        url: absoluteUrl('/privacy'),
        datePublished: '2026-09-01',
        dateModified: '2026-09-01',
        inLanguage: 'zh-CN',
        publisher: {
          '@id': organizationId,
        },
        about: '隐私与个人信息处理',
      },
      breadcrumbList([
        { name: '首页', path: '/' },
        { name: '隐私与数据处理政策', path: '/privacy' },
      ]),
    ],
  };
  return (
    <>
      <SiteHeader />
      <main>
        <StructuredData data={schema} />
        <PageHero
          eyebrow="数据治理 · 版本 2026-09-01-v1.2"
          title="只收集资格判断真正需要的数据。"
          intro="本政策说明蓝旗鱼在适配度评估、诊断申请、隐私请求和后续沟通中处理哪些信息、为什么处理、保存在哪里、谁能访问，以及申请人如何请求访问、更正或删除。"
        />
        <section className="px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            {sections.map(([title, detail], index) => (
              <article
                key={title}
                className="grid gap-5 border-t border-foreground/20 py-8 md:grid-cols-[70px_1fr_2fr]"
              >
                <span className="text-[#3657d6]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-[#e7eaff] px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#3657d6]">数据权利请求</p>
              <h2 className="mt-4 text-4xl font-black">
                访问、更正或删除已提交的信息。
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                请使用提交申请时的联系方式。不要附加身份证件或新的敏感信息；只有在必要时，蓝旗鱼才会另行确认安全的核验方式。
              </p>
            </div>
            <PrivacyRequestForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
