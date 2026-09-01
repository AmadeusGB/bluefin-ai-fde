import Link from 'next/link';

export function ArticleMeta({ title, description, path, date='2026-09-01', status='方法文章' }: { title:string; description:string; path:string; date?:string; status?:string }){
  const schema={'@context':'https://schema.org','@type':'Article',headline:title,description,datePublished:date,dateModified:date,inLanguage:'zh-CN',mainEntityOfPage:`https://bluefin-ai.cn${path}`,author:{'@type':'Person',name:'郭斌 Arthur',url:'https://bluefin-ai.cn/about/arthur-guo'},publisher:{'@type':'Organization',name:'蓝旗鱼 AI',url:'https://bluefin-ai.cn'}};
  return <><div className="border-y border-foreground/10 bg-white px-5 py-4 text-sm lg:px-10"><div className="mx-auto flex max-w-[1500px] flex-wrap gap-x-8 gap-y-2 text-muted-foreground"><span>作者：<Link href="/about/arthur-guo" className="font-semibold text-foreground">郭斌 Arthur</Link></span><span>事实核验：{date}</span><span>证据状态：{status}</span></div></div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
