import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:'*',allow:'/'},{userAgent:'Googlebot',allow:'/'},{userAgent:'Bingbot',allow:'/'},{userAgent:'OAI-SearchBot',allow:'/'},{userAgent:'ChatGPT-User',allow:'/'}],sitemap:'https://bluefin-ai.cn/sitemap.xml',host:'https://bluefin-ai.cn'};}
