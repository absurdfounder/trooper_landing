import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import FeatureSubpageLayout from '@/components/marketing/FeatureSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allFeatureSlugs,
  getFeaturePage,
} from '@/lib/subpageContent';
import {
  getFeaturePageContent,
  allRichFeatureSlugs,
} from '@/lib/featureContent';

type Props = { params: { slug: string } };

/** Old documentation-product URLs. They are not this product. */
const NOINDEX_FEATURES = new Set([
  'ai-documentation-agent',
  'ai-help-center',
  'automated-screenshots-for-docs',
  'chrome-extension-for-documentation',
  'code-to-docs',
  'generative-ai-customer-service',
  'internal-knowledge-base',
  'multilingual-knowledge-base',
  'self-service-help-widget',
]);

function robotsFor(slug: string) {
  return NOINDEX_FEATURES.has(slug) ? ({ index: false, follow: true } as const) : undefined;
}

export function generateStaticParams() {
  const slugs = Array.from(new Set([...allFeatureSlugs(), ...allRichFeatureSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getFeaturePageContent(params.slug);
  if (rich) {
    const og = ogImageMeta('feature', rich.title, params.slug);
    return {
      title: rich.meta.title,
      description: rich.meta.description,
      alternates: { canonical: rich.meta.canonical },
      openGraph: {
        title: rich.meta.title,
        description: rich.meta.description,
        url: rich.meta.canonical,
        ...og.openGraph,
      },
      twitter: {
        title: rich.meta.title,
        description: rich.meta.description,
        ...og.twitter,
      },
      robots: robotsFor(params.slug),
    };
  }

  const page = getFeaturePage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('feature', page.title, params.slug);
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      ...og.openGraph,
    },
    twitter: {
      title: page.meta.title,
      description: page.meta.description,
      ...og.twitter,
    },
    robots: robotsFor(params.slug),
  };
}

export default function FeaturePage({ params }: Props) {
  const rich = getFeaturePageContent(params.slug);
  if (rich) return <FeatureSubpageLayout content={rich} />;

  const page = getFeaturePage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
