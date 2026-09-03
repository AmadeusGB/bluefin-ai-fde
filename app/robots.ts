import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/knowledge-graph';
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:'*',allow:'/'},{userAgent:'Baiduspider',allow:'/'},{userAgent:'Bytespider',allow:'/'},{userAgent:'Sogou web spider',allow:'/'},{userAgent:'360Spider',allow:'/'},{userAgent:'YisouSpider',allow:'/'},{userAgent:'Googlebot',allow:'/'},{userAgent:'Bingbot',allow:'/'},{userAgent:'OAI-SearchBot',allow:'/'},{userAgent:'ChatGPT-User',allow:'/'}],sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl};}
