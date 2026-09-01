'use client';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { FilePlus2, Loader2, RefreshCw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OperationsNav } from '@/components/operations-nav';
import {
  evidenceLevels,
  evidenceSections,
  evidenceStatuses,
} from '@/lib/evidence';
type EvidenceRecord = {
  id: string;
  created_at: number;
  updated_at: number;
  title: string;
  client_label: string;
  industry: string;
  project_period: string | null;
  evidence_level: string;
  publication_status: string;
  client_authorized: number;
  client_background: string | null;
  original_process: string | null;
  quantified_loss: string | null;
  data_scope: string | null;
  why_ordinary_failed: string | null;
  diagnosis: string | null;
  mvd_scope: string | null;
  human_system_boundary: string | null;
  baseline_results: string | null;
  risks_limitations: string | null;
  handover: string | null;
  reusable_assets: string | null;
  source_references: string | null;
  reviewer: string | null;
  completeness: number;
};
type Payload = { user: { email: string }; records: EvidenceRecord[] };
const empty = () =>
  ({
    id: '',
    title: '',
    clientLabel: '',
    industry: '',
    projectPeriod: '',
    evidenceLevel: 'anonymized',
    publicationStatus: 'draft',
    clientAuthorized: false,
    sourceReferences: '',
    reviewer: '',
    ...Object.fromEntries(evidenceSections.map((section) => [section.key, ''])),
  }) as Record<string, string | boolean>;
export function EvidenceOperations() {
  const [data, setData] = useState<Payload | null>(null),
    [form, setForm] = useState(empty),
    [loading, setLoading] = useState(true),
    [saving, setSaving] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [filter, setFilter] = useState('all');
  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/operations/evidence', {
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
  const visible = useMemo(
    () =>
      (data?.records || []).filter(
        (record) => filter === 'all' || record.publication_status === filter,
      ),
    [data, filter],
  );
  const set = (key: string, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));
  function edit(record: EvidenceRecord) {
    const next = empty();
    Object.assign(next, {
      id: record.id,
      title: record.title,
      clientLabel: record.client_label,
      industry: record.industry,
      projectPeriod: record.project_period || '',
      evidenceLevel: record.evidence_level,
      publicationStatus: record.publication_status,
      clientAuthorized: Boolean(record.client_authorized),
      sourceReferences: record.source_references || '',
      reviewer: record.reviewer || '',
    });
    for (const section of evidenceSections)
      next[section.key] = record[section.column] || '';
    setForm(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/operations/evidence', {
          method: form.id ? 'PATCH' : 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(form),
        }),
        body = (await response.json()) as {
          error?: string;
          completeness?: number;
        };
      if (!response.ok) throw new Error(body.error || '保存失败');
      setMessage(`证据记录已保存，12 项结构完整度 ${body.completeness}%。`);
      setForm(empty());
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '保存失败');
    } finally {
      setSaving(false);
    }
  }
  if (loading && !data)
    return (
      <div className="grid min-h-64 place-items-center">
        <Loader2 className="size-8 animate-spin text-[#3657d6]" />
      </div>
    );
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">
      <OperationsNav />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[#3657d6]">交付资产系统</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.04em] lg:text-6xl">
            案例证据工作台
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            当前登录：{data?.user.email}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void load()}
          className="rounded-none"
        >
          <RefreshCw />
          刷新
        </Button>
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
      <form
        onSubmit={submit}
        className="mt-10 border border-foreground/15 bg-white p-6 lg:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-[#3657d6]">
              {form.id ? '编辑记录' : '新建记录'}
            </p>
            <h2 className="mt-2 text-3xl font-black">先保留证据，再写案例。</h2>
          </div>
          {form.id && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setForm(empty())}
            >
              <FilePlus2 />
              新建
            </Button>
          )}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Field label="案例标题" id="title">
            <Input
              id="title"
              value={String(form.title)}
              onChange={(event) => set('title', event.target.value)}
              required
              maxLength={160}
              className="mt-2 rounded-none"
            />
          </Field>
          <Field label="客户标识（可脱敏）" id="clientLabel">
            <Input
              id="clientLabel"
              value={String(form.clientLabel)}
              onChange={(event) => set('clientLabel', event.target.value)}
              required
              maxLength={160}
              className="mt-2 rounded-none"
            />
          </Field>
          <Field label="行业" id="industry">
            <Input
              id="industry"
              value={String(form.industry)}
              onChange={(event) => set('industry', event.target.value)}
              required
              maxLength={100}
              className="mt-2 rounded-none"
            />
          </Field>
          <Field label="项目周期" id="projectPeriod">
            <Input
              id="projectPeriod"
              value={String(form.projectPeriod)}
              onChange={(event) => set('projectPeriod', event.target.value)}
              maxLength={80}
              placeholder="例如：2026.03—2026.05"
              className="mt-2 rounded-none"
            />
          </Field>
          <Field label="证据等级" id="evidenceLevel">
            <select
              id="evidenceLevel"
              value={String(form.evidenceLevel)}
              onChange={(event) => set('evidenceLevel', event.target.value)}
              className="mt-2 h-10 w-full border bg-background px-3 text-sm"
            >
              {evidenceLevels.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="发布状态" id="publicationStatus">
            <select
              id="publicationStatus"
              value={String(form.publicationStatus)}
              onChange={(event) => set('publicationStatus', event.target.value)}
              className="mt-2 h-10 w-full border bg-background px-3 text-sm"
            >
              {evidenceStatuses.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <label
          htmlFor="clientAuthorized"
          aria-label="已取得客户公开授权"
          className="mt-6 flex items-start gap-3 text-sm leading-6"
        >
          <input
            id="clientAuthorized"
            type="checkbox"
            checked={Boolean(form.clientAuthorized)}
            onChange={(event) => set('clientAuthorized', event.target.checked)}
            className="mt-1 size-4 accent-[#3657d6]"
          />
          <span>
            <b>已取得客户公开授权</b>
            <br />
            <span className="text-muted-foreground">
              仅勾选已有可追溯授权的项目；脱敏不等于授权。
            </span>
          </span>
        </label>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {evidenceSections.map((section, index) => (
            <Field
              key={section.key}
              label={`${String(index + 1).padStart(2, '0')} · ${section.label}`}
              id={section.key}
            >
              <Textarea
                id={section.key}
                value={String(form[section.key])}
                onChange={(event) => set(section.key, event.target.value)}
                maxLength={5000}
                placeholder={section.hint}
                className="mt-2 min-h-32 rounded-none"
              />
            </Field>
          ))}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Field label="原始证据位置" id="sourceReferences">
            <Textarea
              id="sourceReferences"
              value={String(form.sourceReferences)}
              onChange={(event) => set('sourceReferences', event.target.value)}
              maxLength={4000}
              placeholder="内部文件、数据表、访谈记录、授权材料或可核验 URL；不要粘贴密码。"
              className="mt-2 min-h-28 rounded-none"
            />
          </Field>
          <Field label="复核人" id="reviewer">
            <Input
              id="reviewer"
              value={String(form.reviewer)}
              onChange={(event) => set('reviewer', event.target.value)}
              maxLength={120}
              className="mt-2 rounded-none"
            />
          </Field>
        </div>
        <Button
          type="submit"
          disabled={saving}
          className="mt-8 h-12 rounded-none px-6"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          {form.id ? '保存修改' : '保存证据草稿'}
        </Button>
      </form>
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-black">证据记录</h2>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="筛选发布状态"
            className="h-10 border bg-background px-3 text-sm"
          >
            <option value="all">全部状态</option>
            {evidenceStatuses.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visible.map((record) => (
            <button
              key={record.id}
              onClick={() => edit(record)}
              className="border border-foreground/15 bg-white p-6 text-left hover:border-[#3657d6]"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-[#e7eaff] px-2 py-1 font-bold text-[#3657d6]">
                  {
                    evidenceLevels.find(
                      ([key]) => key === record.evidence_level,
                    )?.[1]
                  }
                </span>
                <span className="border px-2 py-1">
                  {
                    evidenceStatuses.find(
                      ([key]) => key === record.publication_status,
                    )?.[1]
                  }
                </span>
                {record.client_authorized === 1 && (
                  <span className="border px-2 py-1">已授权</span>
                )}
              </div>
              <h3 className="mt-4 text-2xl font-black">{record.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {record.client_label} · {record.industry} ·{' '}
                {record.project_period || '周期未填'}
              </p>
              <div className="mt-5 h-2 bg-foreground/10">
                <span
                  className="block h-full bg-[#3657d6]"
                  style={{ width: `${record.completeness}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold">
                12 项结构完整度 {record.completeness}%
              </p>
            </button>
          ))}
          {!visible.length && (
            <div className="border border-dashed p-12 text-center text-muted-foreground lg:col-span-2">
              当前没有证据记录。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block text-sm font-bold">
      {label}
      {children}
    </label>
  );
}
