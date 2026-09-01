'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, RefreshCw, Save, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { diagnosticDimensionScores } from '@/lib/diagnostic';

type Lead = {
  id: string;
  created_at: number;
  updated_at: number | null;
  name: string;
  company: string;
  contact: string;
  role: string;
  industry: string;
  problem: string;
  diagnostic_score: number | null;
  decision: string | null;
  diagnostic_profile: string | null;
  source: string;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  acquisition_channel: string;
  status: string;
  owner_notes: string | null;
  next_action_at: number | null;
};
type Payload = {
  user: { email: string };
  summary: Record<string, number>;
  leads: Lead[];
};
const stages = [
  ['new', '新申请'],
  ['reviewing', '审查中'],
  ['qualified', '符合资格'],
  ['diagnostic_paid', '付费诊断'],
  ['mvd', 'MVD'],
  ['won', '已成交'],
  ['not_fit', '不适合'],
  ['closed', '已关闭'],
];
const formatDate = (value: number | null) =>
  value
    ? new Intl.DateTimeFormat('zh-CN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(value)
    : '—';
const inputDate = (value: number | null) =>
  value
    ? new Date(value - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    : '';

export function LeadOperations() {
  const [data, setData] = useState<Payload | null>(null),
    [error, setError] = useState(''),
    [loading, setLoading] = useState(true),
    [query, setQuery] = useState(''),
    [filter, setFilter] = useState('open'),
    [saving, setSaving] = useState('');
  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/operations/leads', {
        cache: 'no-store',
      });
      const body = (await response.json()) as Payload & { error?: string };
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
  const leads = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (data?.leads || []).filter(
      (lead) =>
        (filter === 'all' ||
          (filter === 'open' && !['closed', 'not_fit'].includes(lead.status)) ||
          lead.status === filter) &&
        (!needle ||
          [
            lead.name,
            lead.company,
            lead.contact,
            lead.industry,
            lead.problem,
            lead.source,
            lead.acquisition_channel,
          ].some((value) => value?.toLowerCase().includes(needle))),
    );
  }, [data, filter, query]);
  async function save(lead: Lead) {
    setSaving(lead.id);
    setError('');
    try {
      const response = await fetch('/api/operations/leads', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          status: lead.status,
          ownerNotes: lead.owner_notes || '',
          nextActionAt: lead.next_action_at,
        }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error || '保存失败');
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '保存失败');
    } finally {
      setSaving('');
    }
  }
  function update(id: string, changes: Partial<Lead>) {
    setData((current) =>
      current
        ? {
            ...current,
            leads: current.leads.map((lead) =>
              lead.id === id ? { ...lead, ...changes } : lead,
            ),
          }
        : current,
    );
  }
  if (loading && !data)
    return (
      <div className="grid min-h-64 place-items-center">
        <Loader2 className="size-8 animate-spin text-[#147e66]" />
      </div>
    );
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-12 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[#147e66]">商业转化运营</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.04em] lg:text-6xl">
            线索资格与推进
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            当前登录：{data?.user.email}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => void load()}
            className="rounded-none"
          >
            <RefreshCw />
            刷新
          </Button>
          <Button
            onClick={() =>
              window.location.assign('/api/operations/leads?format=csv')
            }
            className="rounded-none"
          >
            <Download />
            导出 CSV
          </Button>
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
      <div className="mt-10 grid gap-px bg-foreground/15 sm:grid-cols-4 lg:grid-cols-8">
        {stages.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`bg-background p-5 text-left hover:bg-[#dff6e6] ${filter === key ? 'ring-2 ring-inset ring-[#147e66]' : ''}`}
          >
            <span className="text-3xl font-black">
              {data?.summary[key] || 0}
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <div className="relative min-w-72 flex-1">
          <label htmlFor="lead-search" className="sr-only">
            搜索线索
          </label>
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <Input
            value={query}
            id="lead-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索企业、联系人、问题或来源"
            className="h-11 rounded-none pl-11"
          />
        </div>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="筛选线索阶段"
          className="h-11 border bg-background px-4 text-sm"
        >
          <option value="open">全部待推进</option>
          <option value="all">全部线索</option>
          {stages.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        显示 {leads.length} 条；看板最多读取最近 500 条申请。
      </p>
      <div className="mt-6 space-y-4">
        {leads.map((lead) => (
          <article
            key={lead.id}
            className="border border-foreground/15 bg-white p-5 lg:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.6fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black">{lead.company}</h2>
                  <span className="bg-[#dff6e6] px-2 py-1 text-xs font-bold text-[#147e66]">
                    {lead.acquisition_channel}
                  </span>
                </div>
                <p className="mt-2 text-sm">
                  <b>{lead.name}</b> · {lead.role}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lead.contact}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  申请：{formatDate(lead.created_at)}
                  <br />
                  站内来源：{lead.source} · 行业：{lead.industry}
                </p>
              </div>
              <div>
                <p className="leading-7">{lead.problem}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {lead.decision && (
                    <span>
                      诊断：{lead.decision} · {lead.diagnostic_score}/100
                      {lead.diagnostic_profile
                        ? ` · #${lead.diagnostic_profile.toUpperCase()}`
                        : ''}
                    </span>
                  )}
                  {lead.diagnostic_profile &&
                    diagnosticDimensionScores(lead.diagnostic_profile).map(
                      (dimension) => (
                        <span key={dimension.key}>
                          {dimension.label} {dimension.score}
                        </span>
                      ),
                    )}
                  {lead.utm_campaign && <span>活动：{lead.utm_campaign}</span>}
                  {lead.landing_path && (
                    <span className="break-all">
                      落地页：{lead.landing_path}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <select
                  value={lead.status}
                  onChange={(event) =>
                    update(lead.id, { status: event.target.value })
                  }
                  aria-label={`${lead.company} 的线索阶段`}
                  className="h-11 w-full border bg-background px-3 text-sm"
                >
                  {stages.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor={`next-${lead.id}`}
                  className="block text-xs font-bold"
                >
                  下次行动
                  <Input
                    type="datetime-local"
                    id={`next-${lead.id}`}
                    value={inputDate(lead.next_action_at)}
                    onChange={(event) =>
                      update(lead.id, {
                        next_action_at: event.target.value
                          ? new Date(event.target.value).getTime()
                          : null,
                      })
                    }
                    className="mt-1 rounded-none"
                  />
                </label>
                <label
                  htmlFor={`notes-${lead.id}`}
                  className="block text-xs font-bold"
                >
                  负责人备注
                  <Textarea
                    value={lead.owner_notes || ''}
                    id={`notes-${lead.id}`}
                    onChange={(event) =>
                      update(lead.id, { owner_notes: event.target.value })
                    }
                    maxLength={4000}
                    className="mt-1 min-h-24 rounded-none"
                  />
                </label>
                <Button
                  onClick={() => void save(lead)}
                  disabled={saving === lead.id}
                  className="w-full rounded-none"
                >
                  {saving === lead.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save />
                  )}
                  保存推进状态
                </Button>
                {lead.updated_at && (
                  <p className="text-xs text-muted-foreground">
                    更新：{formatDate(lead.updated_at)}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
        {!leads.length && !loading && (
          <div className="border border-dashed p-16 text-center text-muted-foreground">
            当前筛选条件下没有线索。
          </div>
        )}
      </div>
    </div>
  );
}
