import type { MetadataRoute } from 'next';
const paths=['','/fde','/solutions','/evidence','/diagnostic','/knowledge','/knowledge/poc-vs-mvd','/knowledge/why-ai-projects-fail'];
export default function sitemap(): MetadataRoute.Sitemap { return paths.map((path,i)=>({url:`https://bluefin-ai.cn${path}`,lastModified:new Date('2026-09-01'),changeFrequency:i===0?'weekly':'monthly',priority:i===0?1:.8})); }
