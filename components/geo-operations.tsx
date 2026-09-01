'use client';
import { useEffect, useMemo, useState } from 'react';
import { FileUp, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OperationsNav } from '@/components/operations-nav';
type Metric = {
  dimension: string;
  observations: number;
  brandMentionRate: number;
  citationRate: number;
  citationShare: number;
  semanticAccuracy: number;
  fdeAssociation: number;
};
type Payload = {
  user: { email: string };
  overall: Metric;
  platforms: Metric[];
  categories: Metric[];
  dates: Metric[];
};
const percent = (value: number) => `${(value * 100).toFixed(1)}%`;
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = '',
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else cell += char;
  }
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  const headers = (rows.shift() || []).map((header) =>
    header.replace(/^\uFEFF/, ''),
  );
  return rows.map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index] || '']),
    ),
  );
}
export function GeoOperations() {
  const [data, setData] = useState<Payload | null>(null),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [loading, setLoading] = useState(true),
    [uploading, setUploading] = useState(false),
    [date, setDate] = useState('全部');
  async function load(targetDate = date) {
    setLoading(true);
    setError('');
    try {
      const suffix =
          targetDate === '全部'
            ? ''
            : `?date=${encodeURIComponent(targetDate)}`,
        response = await fetch(`/api/operations/geo-measurements${suffix}`, {
          cache: 'no-store',
        }),
        body = (await response.json()) as Payload & { error?: string };
      if (!response.ok) throw new Error(body.error || '读取失败');
      setData(body);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '读取失败');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);
  async function upload(file: File) {
    setUploading(true);
    setError('');
    setMessage('');
    try {
      const rows = parseCsv(await file.text());
      const response = await fetch('/api/operations/geo-measurements', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ rows }),
        }),
        body = (await response.json()) as {
          error?: string;
          accepted?: number;
          skipped?: number;
        };
      if (!response.ok) throw new Error(body.error || '导入失败');
      setMessage(
        `已写入或更新 ${body.accepted} 条观测，跳过 ${body.skipped} 条空白或无效记录。`,
      );
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '导入失败');
    } finally {
      setUploading(false);
    }
  }
  const selected = useMemo(() => data?.overall, [data]);
  if (loading && !data)
    return (
      <div className="grid min-h-64 place-items-center">
        <Loader2 className="size-8 animate-spin text-[#3657d6]" />
      </div>
    );
  const cards = [
    ['有效观测', String(selected?.observations || 0)],
    ['品牌主动提及率', percent(selected?.brandMentionRate || 0)],
    ['品牌引用率', percent(selected?.citationRate || 0)],
    ['目标问题引用份额', percent(selected?.citationShare || 0)],
    ['引用语义准确率', percent(selected?.semanticAccuracy || 0)],
    ['品类关联度', percent(selected?.fdeAssociation || 0)],
  ];
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">
      <OperationsNav />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[#3657d6]">GEO 持续衡量</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.04em] lg:text-6xl">
            引用与品类关联看板
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            当前登录：{data?.user.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => void load()}
            className="rounded-none"
          >
            <RefreshCw />
            刷新
          </Button>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 bg-foreground px-4 text-sm font-bold text-background">
            <FileUp />
            {uploading ? '正在导入' : '导入测量 CSV'}
            <input
              type="file"
              accept=".csv,text/csv"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
                event.target.value = '';
              }}
              className="sr-only"
            />
          </label>
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-6 border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {message && (
        <p className="mt-6 border border-[#3657d6]/30 bg-[#e7eaff] p-4 text-sm text-[#3657d6]">
          {message}
        </p>
      )}
      <div className="mt-8 flex items-center gap-3">
        <label htmlFor="geo-date" className="text-sm font-bold">
          测量日期
        </label>
        <select
          id="geo-date"
          value={date}
          onChange={(event) => {
            const value = event.target.value;
            setDate(value);
            void load(value);
          }}
          className="h-10 border bg-background px-3 text-sm"
        >
          <option>全部</option>
          {data?.dates.map((item) => (
            <option key={item.dimension}>{item.dimension}</option>
          ))}
        </select>
      </div>
      <div className="mt-8 grid gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-6">
        {cards.map(([label, value]) => (
          <article key={label} className="bg-background p-5">
            <strong className="text-3xl font-black">{value}</strong>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {label}
            </p>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="text-3xl font-black">平台表现</h2>
        <div className="mt-6 overflow-x-auto border border-foreground/15 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#0b1238] text-white">
              <tr>
                {[
                  '平台',
                  '样本',
                  '主动提及',
                  '引用率',
                  '引用份额',
                  '语义准确',
                  '品类关联',
                ].map((title) => (
                  <th key={title} className="p-4">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.platforms.map((item) => (
                <tr
                  key={item.dimension}
                  className="border-t border-foreground/10"
                >
                  <th className="p-4 font-black">{item.dimension}</th>
                  <td className="p-4">{item.observations}</td>
                  <td className="p-4">{percent(item.brandMentionRate)}</td>
                  <td className="p-4">{percent(item.citationRate)}</td>
                  <td className="p-4">{percent(item.citationShare)}</td>
                  <td className="p-4">{percent(item.semanticAccuracy)}</td>
                  <td className="p-4">{percent(item.fdeAssociation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data?.platforms.length && (
            <p className="p-10 text-center text-muted-foreground">
              尚未导入测量结果。先下载公开模板、完成测试，再导入 CSV。
            </p>
          )}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-black">类别覆盖</h2>
        <div className="mt-6 grid gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-5">
          {data?.categories.map((item) => (
            <article key={item.dimension} className="bg-background p-5">
              <h3 className="font-black">{item.dimension}</h3>
              <p className="mt-4 text-2xl font-black text-[#3657d6]">
                {percent(item.citationRate)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                引用率 · {item.observations} 条
              </p>
            </article>
          ))}
        </div>
      </section>
      <p className="mt-10 text-xs leading-5 text-muted-foreground">
        指标只基于已导入且通过字段校验的观测。重复导入同一问题、平台、日期、模式和地区时更新原记录，不重复计数。
      </p>
    </div>
  );
}
