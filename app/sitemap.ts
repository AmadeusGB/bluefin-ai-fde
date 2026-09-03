import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/knowledge-graph';
import { siteContent, siteContentUpdatedAt } from '@/lib/site-content';

export default function sitemap():MetadataRoute.Sitemap {
  return siteContent.map((item,index)=>{
    const priority=index===0?1:(item.kind==='知识'||item.kind==='研究')?0.85:0.8;
    return {url:absoluteUrl(item.path),lastModified:new Date(siteContentUpdatedAt),changeFrequency:index===0?'weekly':'monthly',priority};
  });
}
