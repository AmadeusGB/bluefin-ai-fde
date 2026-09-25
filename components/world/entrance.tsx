'use client';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PortalScene } from './portal-scene';
export function Entrance() {
  const router = useRouter();
  const [entering, setEntering] = useState(false),
    [progress, setProgress] = useState(0);
  useEffect(() => {
    router.prefetch('/world');
  }, [router]);
  useEffect(() => {
    if (!entering) return;
    const start = Date.now(),
      duration = matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 150
        : 1600;
    const timer = setInterval(() => {
      const p = Math.min(
        100,
        Math.round(((Date.now() - start) / duration) * 100),
      );
      setProgress(p);
      if (p === 100) {
        clearInterval(timer);
        router.push('/world');
      }
    }, 30);
    return () => clearInterval(timer);
  }, [entering, router]);
  return (
    <main
      id="main-content"
      className={`entrance ${entering ? 'is-entering' : ''}`}
    >
      <div className="entrance-top">
        <span className="micro">BLUEFIN · AI WORLD</span>
        <Link href="/about">
          关于蓝旗鱼 <ArrowUpRight size={15} />
        </Link>
      </div>
      <PortalScene />
      <div className="entrance-center">
        <p className="entrance-kicker">探索 · 实践 · 共创</p>
        <button
          className="logo-trigger"
          onClick={() => setEntering(true)}
          disabled={entering}
          aria-label="进入蓝旗鱼的AI世界"
        >
          <Image
            src="/world/logo.png"
            alt="蓝旗鱼AI"
            width="500"
            height="205"
          />
          <span className="logo-caption">BLUEFIN TECHNOLOGY</span>
        </button>
        <h1 className="entrance-position">专注企业AI内训与AI方案落地</h1>
        {entering ? (
          <div className="entry-progress" aria-live="polite">
            <p>
              即将进入蓝旗鱼的AI世界 <span>{progress}%</span>
            </p>
            <progress value={progress} max={100} aria-label="进入进度" />
          </div>
        ) : (
          <button className="enter-label" onClick={() => setEntering(true)}>
            点击Logo，开启探索 <ArrowRight size={16} />
          </button>
        )}
      </div>
      <div className="entrance-bottom">
        <span className="micro">从一个想法，到真实改变</span>
        <nav aria-label="快捷入口">
          <Link href="/services">企业服务</Link>
          <Link href="/world">三大社群</Link>
          <Link href="/knowledge">实践知识库</Link>
          <Link href="/login">会员登录</Link>
        </nav>
        <span className="micro">SHENZHEN · CHINA</span>
      </div>
    </main>
  );
}
