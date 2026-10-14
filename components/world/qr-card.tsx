'use client';
import Image from 'next/image';
import { useId, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export function QrCard({
  title,
  label,
  description,
  image,
  width,
  height,
}: {
  title: string;
  label: string;
  description: string;
  image: string;
  width: number;
  height: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  return (
    <article className="channel-card">
      <p className="micro accent">{label}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        className="channel-button"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
      >
        查看二维码 <ArrowUpRight size={18} />
      </button>
      <a
        className="qr-original"
        href={image}
        target="_blank"
        rel="noopener noreferrer"
      >
        打开原图
      </a>
      <dialog ref={dialog} className="qr-dialog" aria-labelledby={id}>
        <div className="qr-dialog-header">
          <h2 id={id}>{title}</h2>
          <button
            autoFocus
            aria-label="关闭二维码"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <p>微信扫一扫，或保存原图后在微信中识别。</p>
        {image.includes('wecom-') ? (
          <div className="wecom-code-frame">
            <Image
              src={image}
              alt={`${title}二维码`}
              width={width}
              height={height}
              unoptimized
            />
          </div>
        ) : (
          <Image
            src={image}
            alt={`${title}二维码原图`}
            width={width}
            height={height}
            unoptimized
            className="qr-image"
          />
        )}
        <a href={image} download className="channel-button">
          下载原图 <ArrowUpRight size={17} />
        </a>
      </dialog>
    </article>
  );
}
