'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import {
  commonFields,
  roleFields,
  sections,
  type Section,
  type Field,
} from '@/lib/community-fields';
export async function post(action: string, body: unknown) {
  const res = await fetch('/api/community/' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求未完成');
  return data;
}
export function JoinForm({ section }: { section: Section }) {
  const router = useRouter(),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<Record<string, string | string[]>>({}),
    [code, setCode] = useState(''),
    [password, setPassword] = useState(''),
    [visible, setVisible] = useState(false),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [saved, setSaved] = useState(''),
    [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const s = sessionStorage.getItem('bluefin-draft-' + section);
        if (s) {
          setAnswers(JSON.parse(s));
          setSaved('已恢复本次浏览的草稿');
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, [section]);
  function change(k: string, v: string | string[]) {
    setAnswers((a) => ({ ...a, [k]: v }));
  }
  function saveDraft() {
    sessionStorage.setItem('bluefin-draft-' + section, JSON.stringify(answers));
    setSaved('草稿已保存在本次浏览会话中，不保存密码');
  }
  function validate(fields: Field[]) {
    for (const f of fields) {
      const v = answers[f.key];
      if (!f.optional && (!v || (Array.isArray(v) && !v.length)))
        throw new Error('请填写：' + f.label);
      if (f.key === 'pains' && Array.isArray(v) && v.length > 3)
        throw new Error('优先问题最多选择3项');
    }
  }
  async function next() {
    setError('');
    setBusy(true);
    try {
      if (step === 0) {
        await post('invite', { code, section });
      }
      if (step === 1) validate(commonFields);
      if (step === 2) validate(roleFields[section]);
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    setError('');
    setBusy(true);
    try {
      await post('register', {
        section,
        answers,
        code,
        password,
        visible,
        consent,
      });
      sessionStorage.removeItem('bluefin-draft-' + section);
      if (file) {
        const fd = new FormData();
        fd.set('file', file);
        const res = await fetch('/api/community/upload', {
          method: 'POST',
          body: fd,
        });
        if (!res.ok) {
          router.push('/members?upload=retry');
          return;
        }
      }
      router.push('/members');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function field(f: Field) {
    const value = answers[f.key] || '';
    return (
      <fieldset
        key={f.key}
        className={`question ${f.options ? 'full-question' : ''}`}
      >
        <legend>
          {f.label} {f.optional && <small>选填</small>}
          {f.multi && <small>多选</small>}
        </legend>
        {f.help && <p className="field-help">{f.help}</p>}
        {f.options ? (
          <div className="choices">
            {f.options.map((o) => (
              <label
                className={`choice ${(Array.isArray(value) ? value.includes(o) : value === o) ? 'selected' : ''}`}
                key={o}
              >
                <input
                  type={f.multi ? 'checkbox' : 'radio'}
                  name={f.key}
                  value={o}
                  checked={
                    Array.isArray(value) ? value.includes(o) : value === o
                  }
                  onChange={() =>
                    change(
                      f.key,
                      f.multi
                        ? Array.isArray(value) && value.includes(o)
                          ? value.filter((x) => x !== o)
                          : [...(Array.isArray(value) ? value : []), o]
                        : o,
                    )
                  }
                />
                <span>{o}</span>
                <Check size={14} />
              </label>
            ))}
          </div>
        ) : f.type === 'textarea' ? (
          <textarea
            aria-label={f.label}
            value={String(value)}
            maxLength={2000}
            rows={4}
            onChange={(e) => change(f.key, e.target.value)}
          />
        ) : (
          <input
            aria-label={f.label}
            type={f.type || 'text'}
            value={String(value)}
            maxLength={120}
            onChange={(e) => change(f.key, e.target.value)}
          />
        )}
      </fieldset>
    );
  }
  return (
    <div className="join-layout">
      <aside className="join-aside">
        <p className="micro accent">JOIN THE COMMUNITY</p>
        <h1>
          加入
          <br />
          {sections[section].name}
        </h1>
        <p>{sections[section].line}</p>
        <ol className="step-list">
          {['验证邀请码', '认识你', '了解你的方向', '确认并加入'].map(
            (s, i) => (
              <li
                key={s}
                className={step === i ? 'current' : step > i ? 'complete' : ''}
              >
                <span>{step > i ? <Check size={14} /> : i + 1}</span>
                {s}
              </li>
            ),
          )}
        </ol>
        <div className="privacy-note">
          <ShieldCheck size={20} />
          <p>
            你的电话、经营信息和项目意向仅本人及管理员可见。会员展示卡片由你决定是否展示。
          </p>
        </div>
      </aside>
      <section className="form-panel">
        <div className="form-panel-heading">
          <span className="micro">STEP {step + 1} / 4</span>
          <button className="text-link" onClick={saveDraft} type="button">
            保存草稿
          </button>
        </div>
        {saved && <output className="quiet">{saved}</output>}
        {step === 0 && (
          <>
            <h2>一个邀请码，开启连接。</h2>
            <p>请填写属于{sections[section].name}的邀请码。</p>
            <label className="question">
              邀请码
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
                placeholder="输入邀请码"
                autoComplete="off"
              />
            </label>
            <p className="quiet">
              没有邀请码？请联系蓝旗鱼团队或活动组织者获取。
            </p>
            <Link href="/world" className="text-link">
              重新选择加入的板块
            </Link>
          </>
        )}
        {step === 1 && (
          <>
            <h2>先认识一下你。</h2>
            <p>帮助我们提供更合适的学习与交流机会。</p>
            <div className="questions-grid">{commonFields.map(field)}</div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>
              {section === 'enterprise'
                ? '了解你的企业。'
                : section === 'fde'
                  ? '让你的能力被看见。'
                  : '找到你的探索方向。'}
            </h2>
            <p>
              {section === 'enterprise'
                ? '这些回答将用于生成你的免费初步诊断。'
                : '多数问题可直接选择，补充资料可以稍后完善。'}
            </p>
            <div className="questions-grid">
              {roleFields[section].map(field)}
            </div>
            {section === 'fde' && (
              <label className="upload-zone">
                过往案例 / 智能体截图（选填）
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <small>
                  PNG /
                  JPEG，最大5MB。请先去除客户隐私和密钥，仅本人及管理员可见。
                </small>
              </label>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <h2>准备好，开启下一程。</h2>
            <div className="profile-preview">
              <span className="member-avatar">
                {String(answers.displayName || '你').slice(0, 1)}
              </span>
              <div>
                <h3>{answers.displayName}</h3>
                <p>
                  {answers.industry} · {answers.city}
                </p>
                <span>{answers.role}</span>
              </div>
            </div>
            <label className="check-line">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
              />
              在所属板块会员空间展示这张卡片
            </label>
            <label className="question">
              设置登录密码
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                minLength={10}
                maxLength={128}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少10个字符"
              />
            </label>
            <p className="quiet">
              以后使用联系电话与此密码登录。目前不提供短信认证。
            </p>
            <label className="check-line">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                我已阅读
                <Link href="/privacy" target="_blank">
                  隐私说明
                </Link>
                ，同意为会员管理、活动联系及所选服务处理上述资料。
              </span>
            </label>
            {section === 'enterprise' && (
              <p className="notice">
                提交后将自动生成基于问卷的免费初步诊断，实际方案需进一步核实。
              </p>
            )}
          </>
        )}
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <div className="form-actions">
          {step > 0 && (
            <button
              className="secondary-button"
              disabled={busy}
              onClick={() => {
                setStep(step - 1);
                setError('');
              }}
            >
              <ArrowLeft size={17} />
              上一步
            </button>
          )}
          <button
            className="primary-button"
            disabled={busy}
            onClick={step === 3 ? submit : next}
          >
            {busy ? '正在处理…' : step === 3 ? '确认加入' : '继续'}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
