import Image from 'next/image';

/** Display the original marlin symbol without altering the source brand asset. */
export function MarlinMark({
  className = '',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`marlin-mark ${className}`} aria-hidden="true">
      <Image
        src="/brand/bluefin-logo.png"
        alt=""
        width={1600}
        height={667}
        priority={priority}
        sizes="(max-width: 760px) 700px, 1200px"
      />
    </span>
  );
}
