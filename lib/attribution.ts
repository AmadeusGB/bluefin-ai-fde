export const ATTRIBUTION_STORAGE_KEY = 'bluefin:first-touch-attribution';

export type Attribution = {
  landingPath: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const emptyAttribution = (): Attribution => ({
  landingPath: '',
  referrer: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
});

export function captureFirstTouch(): Attribution {
  if (typeof window === 'undefined') return emptyAttribution();
  try {
    const saved = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (saved)
      return { ...emptyAttribution(), ...JSON.parse(saved) } as Attribution;
    const params = new URLSearchParams(window.location.search);
    let referrer = '';
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.origin !== window.location.origin)
        referrer = referrerUrl.href;
    }
    const attribution: Attribution = {
      landingPath: `${window.location.pathname}${window.location.search}`,
      referrer,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmContent: params.get('utm_content') || '',
      utmTerm: params.get('utm_term') || '',
    };
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
    return attribution;
  } catch {
    return emptyAttribution();
  }
}

export function attributionSource(attribution: Attribution) {
  const explicit = attribution.utmSource.trim().toLowerCase();
  if (explicit) {
    const known = [
      'chatgpt',
      'google',
      'bing',
      'perplexity',
      'baidu',
      'doubao',
      'kimi',
      'deepseek',
      'tongyi',
      'qwen',
    ].find((source) => explicit.includes(source));
    return known === 'qwen' ? 'tongyi' : known || 'utm';
  }
  if (!attribution.referrer) return 'direct';
  try {
    const hostname = new URL(attribution.referrer).hostname.toLowerCase();
    const channels: [string, string][] = [
      ['chatgpt.com', 'chatgpt'],
      ['openai.com', 'chatgpt'],
      ['google.', 'google'],
      ['bing.com', 'bing'],
      ['perplexity.ai', 'perplexity'],
      ['baidu.com', 'baidu'],
      ['doubao.com', 'doubao'],
      ['kimi.com', 'kimi'],
      ['moonshot.cn', 'kimi'],
      ['deepseek.com', 'deepseek'],
      ['tongyi.com', 'tongyi'],
      ['qwen.ai', 'tongyi'],
    ];
    return (
      channels.find(
        ([domain]) =>
          hostname === domain ||
          hostname.endsWith(`.${domain}`) ||
          hostname.includes(domain),
      )?.[1] || 'referral'
    );
  } catch {
    return 'referral';
  }
}
