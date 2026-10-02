'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { post } from './join-form';

export function RegisterForm() {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [basic, setBasic] = useState({ name: '', industry: '', city: '' });
  return (
    <form
      className="login-panel"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          if (password !== confirmPassword)
            throw new Error('两次输入的密码不一致，请重新确认');
          for (const [key, label] of [
            ['name', '姓名／昵称'],
            ['industry', '行业'],
            ['city', '城市'],
          ] as const) {
            if (!basic[key].trim()) throw new Error('请填写' + label);
          }
          await post('signup', { account, password, confirmPassword, basic });
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
      <h1>
        <span>从这里，</span>
        <span>开始探索。</span>
      </h1>
      <p>
        使用手机号注册，填写基本资料后，默认加入 AI 俱乐部。以下均为必填项。
      </p>
      <label className="question">
        手机号（账号）
        <input
          type="tel"
          inputMode="tel"
          autoComplete="username"
          required
          minLength={11}
          maxLength={11}
          pattern="1[3-9][0-9]{9}"
          title="请输入11位中国大陆手机号"
          placeholder="请输入11位手机号"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </label>
      {(
        [
          ['name', '姓名／昵称'],
          ['industry', '行业'],
          ['city', '城市'],
        ] as const
      ).map(([key, label]) => (
        <label className="question" key={key}>
          {label}
          <input
            required
            maxLength={120}
            value={basic[key]}
            onChange={(e) => setBasic({ ...basic, [key]: e.target.value })}
          />
        </label>
      ))}
      <label className="question">
        密码
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          placeholder="至少8个字符"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="question">
        确认密码
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          placeholder="请再次输入密码"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
