import type { Metadata } from 'next';
import { ApplicationForm } from '@/components/application-form';
import { PageHero, SiteFooter, SiteHeader } from '@/components/site-shell';
export const metadata:Metadata={title:'申请企业 AI 业务诊断',description:'提交结构化企业 AI 业务诊断申请，说明行业、业务问题、负责人和联系方式。',alternates:{canonical:'/apply'}};
export default function Page(){return <><SiteHeader/><main><PageHero eyebrow="商业漏斗 · 资格确认" title="提交一个真实问题，而不是一份功能清单。" intro="请用几分钟说明问题发生在哪里、造成什么损失、谁负责结果。蓝旗鱼会先做资格判断；只有问题、数据和组织条件匹配，才进入下一步沟通。"/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1000px]"><ApplicationForm/></div></section></main><SiteFooter/></>}
