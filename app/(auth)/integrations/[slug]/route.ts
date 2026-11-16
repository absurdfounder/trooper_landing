import { NextRequest, NextResponse } from 'next/server';
import { getPluginBySlug, pluginPagePath } from '@/lib/pluginCatalog';

/** Keep legacy integration URLs redirectable without adding 1,000+ static routes. */
export function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const destination = getPluginBySlug(params.slug)
    ? pluginPagePath(params.slug)
    : '/plugin';

  return NextResponse.redirect(new URL(destination, request.url), 308);
}
