'use client';
import Image from 'next/image';

import { useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
export function Gallery({
  photos,
}: {
  photos: { path: string; caption: string }[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="gallery-grid">
        {photos.map((p, i) => (
          <button
            key={p.path}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
            }}
            aria-label={`放大：${p.caption}`}
          >
            <Image
              src={p.path}
              alt={p.caption}
              width="900"
              height="650"
              loading="lazy"
            />
            <span>{p.caption}</span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="photo-dialog">
        <button
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="关闭照片"
        >
          <X />
        </button>
        <Image
          width={1600}
          height={1100}
          src={photos[index].path}
          alt={photos[index].caption}
        />
        <div className="lightbox-controls">
          <button
            onClick={() =>
              setIndex((index + photos.length - 1) % photos.length)
            }
            aria-label="上一张"
          >
            <ArrowLeft />
          </button>
          <span>
            {photos[index].caption} · {index + 1}/{photos.length}
          </span>
          <button
            onClick={() => setIndex((index + 1) % photos.length)}
            aria-label="下一张"
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
