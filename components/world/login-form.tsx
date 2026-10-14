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
          await post('login', { account: phone, password });
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
        手机号
        <input
          type="text"
          placeholder="请输入注册手机号"
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
      <div className="auth-links">
        <Link href="/register">注册账号</Link>
        <Link href="/guest">游客访问 →</Link>
      </div>
      <p className="quiet">忘记密码请联系管理员。</p>
    </form>
  );
}
