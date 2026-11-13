import { siteContent, siteContentUpdatedAt } from '@/lib/site-content';
import { companyDescription } from '@/lib/public-copy';
import { company, reports } from '@/lib/company';

const defaultSiteUrl = 'https://lqy-ai.com';

function configuredSiteUrl() {
  const candidate = process.env.SITE_URL?.trim() || defaultSiteUrl;
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) return defaultSiteUrl;
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export const siteUrl = configuredSiteUrl();
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const authorId = organizationId;
export const fdeTermId = `${siteUrl}/fde#term`;
export const fdeMethodId = `${siteUrl}/fde#method`;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === '/' ? '' : path}`;
}

const coreEntities = [
  {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': organizationId,
    name: '蓝旗鱼科技',
    alternateName: ['蓝旗鱼 AI', '蓝旗鱼Ai', '蓝旗鱼AI科技'],
    legalName: company.legalName,
    foundingDate: company.foundedISO,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/bluefin-logo-lockup.png`,
      caption: '蓝旗鱼Ai｜探索 · 实践 · 共创',
    },
    slogan: '探索 · 实践 · 共创',
    description: companyDescription,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.streetAddress,
      addressLocality: company.address.addressLocality,
      addressRegion: company.address.addressRegion,
      addressCountry: company.address.addressCountry,
    },
    founder: { '@id': absoluteUrl('/founders/liuxiang#person') },
    subjectOf: reports.map((report) => ({
      '@id': absoluteUrl(`/news/${report.slug}#page`),
    })),
    location: company.offices.map((name) => ({ '@type': 'Place', name })),
    areaServed: company.regions.map((name) => ({ '@type': 'Place', name })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      email: company.email,
      contactType: '个人AI知识库、深圳线下培训、企业AI咨询与协会商会会议合作',
      availableLanguage: 'zh-CN',
      url: `${siteUrl}/contact`,
    },
    knowsAbout: [
      { '@id': fdeTermId },
      'Codex+Obsidian个人知识库成长系统',
      'AI初学者入门',
      'AI图片创作',
      '深圳线下AI实战培训',
      '工厂AI业务梳理',
      '电商AI业务梳理',
      '协会商会AI会议合作',
      '企业 AI 落地',
      '企业AI内训',
      '最小可行部署 MVD',
      '企业 AI 现场诊断',
      '生产部署与采用',
    ],
    publishingPrinciples: `${siteUrl}/editorial-policy`,
  },
  {
    '@type': 'WebSite',
    '@id': websiteId,
    name: '蓝旗鱼科技',
    url: siteUrl,
    inLanguage: 'zh-CN',
    publisher: { '@id': organizationId },
    dateModified: siteContentUpdatedAt,
    mainEntity: [
      { '@id': `${siteUrl}/services/personal-knowledge#service` },
      { '@id': `${siteUrl}/training#service` },
      { '@id': `${siteUrl}/services#consulting` },
      { '@id': `${siteUrl}/partners#service` },
      { '@id': fdeTermId },
      { '@id': fdeMethodId },
    ],
  },
  {
    '@type': 'DefinedTerm',
    '@id': fdeTermId,
    name: 'Forward Deployed Engineering',
    alternateName: ['FDE', '前线部署工程', '前向部署工程'],
    description:
      '由工程师直接进入客户真实业务现场，与业务人员共同发现问题、接触数据、构建系统并推动采用，并以可核验业务结果为交付证据的工作方式。',
    inDefinedTermSet: `${siteUrl}/knowledge`,
    url: `${siteUrl}/fde`,
  },
  {
    '@type': 'HowTo',
    '@id': fdeMethodId,
    name: '蓝旗鱼 FDE 五阶段交付方法',
    description: '诊断、MVD、生产部署、采用、复制。',
    inLanguage: 'zh-CN',
    url: `${siteUrl}/fde`,
    author: { '@id': authorId },
    publisher: { '@id': organizationId },
    step: ['诊断', 'MVD', '生产部署', '采用', '复制'].map((name, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name,
    })),
  },
  {
    '@type': 'Service',
    '@id': `${siteUrl}/services/personal-knowledge#service`,
    name: 'Codex+Obsidian个人知识库成长系统',
    serviceType: '个人AI知识库安装配置与成长辅导',
    description:
      '面向AI初学者提供Codex与Obsidian安装配置、个人知识库结构、常用Skills、AI出图、资料整理、经历梳理以及目标和未来行动规划；不提供人生预测。',
    url: `${siteUrl}/services/personal-knowledge`,
    provider: { '@id': organizationId },
    areaServed: company.regions.map((name) => ({ '@type': 'Place', name })),
    audience: {
      '@type': 'Audience',
      audienceType: 'AI初学者、内容创作者、管理者与个体经营者',
    },
  },
  {
    '@type': 'Service',
    '@id': `${siteUrl}/training#service`,
    name: '深圳线下AI实战培训',
    serviceType: '深圳线下AI实战培训',
    description:
      '面向AI初学者、企业管理者与业务骨干，围绕AI基础、Codex、个人知识库、AI出图、常用Skills和业务场景开展现场实操；具体课程范围与产出以公开课程资料或确认方案为准。',
    url: `${siteUrl}/training`,
    provider: { '@id': organizationId },
    audience: {
      '@type': 'Audience',
      audienceType: 'AI初学者、企业管理者与业务骨干',
    },
  },
  {
    '@type': 'Service',
    '@id': `${siteUrl}/services#consulting`,
    name: '工厂与电商企业AI业务梳理咨询',
    serviceType: '企业AI业务梳理咨询',
    description:
      '面向工厂与电商企业，先盘点现有系统、表格和资料，再梳理流程、问题、数据、责任与优先级；适合继续的场景可进入企业内训、FDE现场诊断、最小可行部署、生产采用与交接。',
    url: `${siteUrl}/services`,
    provider: { '@id': organizationId },
    areaServed: company.regions.map((name) => ({ '@type': 'Place', name })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: '有真实业务流程、负责人和改善目标的工厂与电商企业',
    },
  },
  {
    '@type': 'Service',
    '@id': `${siteUrl}/partners#service`,
    name: '协会商会AI会议合作',
    serviceType: '协会商会AI会议与培训合作',
    description:
      '面向协会、商会与园区沟通AI主题演讲、专题培训、圆桌交流、共创工作坊和企业走访；具体议题、形式、时间和交付以双方确认方案为准。',
    url: `${siteUrl}/partners`,
    provider: { '@id': organizationId },
    areaServed: company.regions.map((name) => ({ '@type': 'Place', name })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: '协会、商会、园区及其会员企业',
    },
  },
  {
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/api/content-index#catalog`,
    name: '蓝旗鱼科技内容目录',
    url: `${siteUrl}/api/content-index`,
    inLanguage: 'zh-CN',
    dateModified: siteContentUpdatedAt,
    publisher: { '@id': organizationId },
    hasPart: siteContent.map((item) => ({
      '@type': 'CreativeWork',
      '@id': `${absoluteUrl(item.path)}#content`,
      name: item.title,
      abstract: item.summary,
      url: absoluteUrl(item.path),
      genre: item.kind,
      inLanguage: 'zh-CN',
      dateModified: siteContentUpdatedAt,
      author: { '@id': authorId },
      publisher: { '@id': organizationId },
    })),
  },
];

export function buildSiteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': coreEntities.slice(0, 8),
  };
}

export function buildKnowledgeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': coreEntities,
  };
}
