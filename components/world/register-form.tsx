'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { post } from './join-form';

export function RegisterForm() {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return (
    <form
      className="login-panel"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          await post('signup', { account, password });
          router.push('/members');
          router.refresh();
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="micro accent">JOIN BLUEFIN</p>
      <h1>从这里，开始探索。</h1>
      <p>账号与密码即可注册，默认加入 AI 俱乐部。</p>
      <label className="question">
        账号
        <input
          autoComplete="username"
          required
          minLength={4}
          maxLength={64}
          pattern="[A-Za-z0-9_.@\-]+"
          placeholder="手机号或自定义账号"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </label>
      <label className="question">
        密码
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          maxLength={128}
          placeholder="至少10个字符"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p className="quiet">
        账号默认不展示给其他会员。注册信息处理方式见
        <Link href="/privacy">隐私说明</Link>。
      </p>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <button className="primary-button" disabled={busy}>
        {busy ? '注册中…' : '注册并进入'}
      </button>
      <div className="auth-links">
        <Link href="/login">已有账号？登录</Link>
        <Link href="/guest">游客访问 →</Link>
      </div>
    </form>
  );
}
