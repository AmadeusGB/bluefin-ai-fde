'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { useId, useRef } from 'react';

const personalWechatImage = '/official/wechat-liuxiang-personal-20261113.jpg';

export function PersonalWechatTrigger() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <button
        type="button"
        className="gateway-secondary-action"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        加刘向个人微信 <MessageCircle size={18} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="qr-dialog personal-wechat-dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="qr-dialog-header">
          <h2 id={titleId}>添加刘向个人微信</h2>
          <button
            type="button"
            autoFocus
            aria-label="关闭个人微信二维码"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <p id={descriptionId}>
          扫码添加刘向，沟通个人知识库、深圳线下培训、企业AI咨询或协会商会合作。
        </p>
        <Image
          src={personalWechatImage}
          alt="刘向个人微信二维码"
          width={888}
          height={1131}
          unoptimized
          className="qr-image personal-wechat-image"
        />
        <div className="personal-wechat-dialog-actions">
          <a href={personalWechatImage} download className="channel-button">
            保存二维码 <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link href="/contact" onClick={() => dialog.current?.close()}>
            查看全部联系方式 <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </>
  );
}
