import { Metadata } from 'next';
import LiveClient from './LiveClient';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Live — Agents at work',
  description:
    'A live look at agents working across Trooper. Company names, people, messages, and files stay off this page.',
  canonical: 'https://trooper.so/live',
  ogKind: 'page',
  ogSlug: 'live',
});

export default function LivePage() {
  return <LiveClient />;
}
