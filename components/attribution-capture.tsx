'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { attributionSource, captureFirstTouch } from '@/lib/attribution';
import { trackFunnelEvent } from '@/lib/funnel-events';

export function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    const attribution = captureFirstTouch();
    trackFunnelEvent(
      'page_view',
      attributionSource(attribution),
      pathname || '/',
    );
  }, [pathname]);
  return null;
}
