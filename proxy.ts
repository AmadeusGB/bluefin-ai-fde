import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authenticatedSiteUser } from '@/lib/site-auth';

export function proxy(request: NextRequest) {
  if (authenticatedSiteUser(request.headers)) return NextResponse.next();

  const apiRequest = request.nextUrl.pathname.startsWith('/api/');
  return new Response(
    apiRequest
      ? JSON.stringify({ error: '需要管理员登录后访问。' })
      : '需要管理员登录后访问。',
    {
      status: 401,
      headers: {
        'cache-control': 'no-store',
        'content-type': apiRequest
          ? 'application/json; charset=utf-8'
          : 'text/plain; charset=utf-8',
        'www-authenticate': 'Basic realm="Bluefin Operations", charset="UTF-8"',
      },
    },
  );
}

export const config = {
  matcher: ['/operations/:path*', '/api/operations/:path*'],
};
