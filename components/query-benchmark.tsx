"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { GeoQuery } from "@/lib/geo-query-set";
export function QueryBenchmark({
  queries,
  categories,
}: {
  queries: GeoQuery[];
  categories: string[];
}) {
  const [category, setCategory] = useState("全部");
  const [keyword, setKeyword] = useState("");
  const visible = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return queries.filter(
      (item) =>
        (category === "全部" || item.category === category) &&
        (!q || item.query.toLowerCase().includes(q)),
    );
  }, [category, keyword, queries]);
  return (
    <div>
      <div className="sticky top-18 z-20 border-y border-foreground/10 bg-background/95 py-5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="按类别筛选">
            {["全部", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`border px-3 py-2 text-sm font-bold transition-colors ${category === item ? "border-foreground bg-foreground text-background" : "border-foreground/15 hover:border-foreground/45"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="relative block min-w-[280px]">
            <label htmlFor="benchmark-search" className="sr-only">
              搜索问题
            </label>
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              id="benchmark-search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索问题关键词"
              className="rounded-none pl-10"
            />
          </div>
        </div>
      </div>
      <p className="py-6 text-sm font-bold text-[#147e66]">
        当前显示 {visible.length} / {queries.length} 个问题
      </p>
      <div className="grid gap-px bg-foreground/15 md:grid-cols-2">
        {visible.map((item) => (
          <article key={item.id} className="bg-background p-6 lg:p-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">
              <span>
                {item.id} · {item.category}
              </span>
              <span>{item.intent}</span>
            </div>
            <h3 className="mt-5 text-xl font-black leading-8">{item.query}</h3>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="border border-foreground/15 p-10 text-center text-muted-foreground">
          没有匹配的问题，请换一个关键词或类别。
        </div>
      )}
    </div>
  );
}
