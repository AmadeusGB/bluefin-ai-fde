'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { post } from './join-form';
export function LoginForm() {
  const [phone, setPhone] = useState(''),
    [password, setPassword] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    router = useRouter();
  return (
    <form
      className="login-panel"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          await post('login', { phone, password });
          router.push('/members');
          router.refresh();
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="micro accent">WELCOME BACK</p>
      <h1>欢迎回来。</h1>
      <p>登录，继续你的AI探索。</p>
      <label className="question">
        联系电话
        <input
          type="tel"
          autoComplete="username"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label className="question">
        密码
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <button className="primary-button" disabled={busy}>
        {busy ? '登录中…' : '进入会员空间'}
      </button>
      <p className="quiet">
        首次加入？<Link href="/world">选择你的板块</Link>
        。忘记密码请联系管理员。
      </p>
    </form>
  );
}
