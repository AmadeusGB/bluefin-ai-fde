import Link from 'next/link';
const items = [
  ['运营总览', '/operations'],
  ['线索与转化', '/operations/leads'],
  ['GEO 测量', '/operations/geo'],
  ['案例证据', '/operations/evidence'],
] as const;
export function OperationsNav() {
  return (
    <nav
      aria-label="内部运营导航"
      className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-foreground/15 pb-5"
    >
      <Link href="/operations" className="flex items-center gap-3 font-black">
        <span className="grid size-9 place-items-center rounded-full bg-[#071817] text-xs text-[#bff5d1]">
          BF
        </span>
        蓝旗鱼运营中枢
      </Link>
      <div className="flex flex-wrap gap-2">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="border border-foreground/15 bg-white px-3 py-2 text-sm font-bold hover:border-[#147e66] hover:text-[#147e66]"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/"
          className="px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          返回官网
        </Link>
      </div>
    </nav>
  );
}
