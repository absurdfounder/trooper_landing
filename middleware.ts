import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAIL_HOSTS = new Set(['troopermail.com', 'www.troopermail.com']);

/** troopermail.com is the agent mailbox domain. Visits go to the product site. */
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  if (!MAIL_HOSTS.has(host)) return NextResponse.next();
  const destination = new URL(`https://trooper.so${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: '/:path*',
};
