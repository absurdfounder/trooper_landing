import React from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { mergeBadgeIcons } from '@/lib/og/agentIcons';
import { loadOgFonts } from '@/lib/og/fonts';
import { formatOgDisplayUrl } from '@/lib/og/pageUrls';
import type { OgHeroContent } from '@/lib/og/types';
import { TROOPER_CLI_COMMAND } from '@/lib/setupCommand';

export const OG_SIZE = { width: 1200, height: 630 };

const INK = '#191b1d';
const INK_MUTED = '#77797e';
const INK_FAINT = '#8e8e98';
const FERN = '#2fb479';
const OK = '#16a34a';
const LINE = 'rgba(25, 27, 29, 0.08)';
const CANVAS = '#f3f3f6';

function dataUrl(relativePath: string, mime: string) {
  const file = readFileSync(join(process.cwd(), relativePath));
  return `data:${mime};base64,${file.toString('base64')}`;
}

function trooperWordmarkSrc() {
  return dataUrl('public/images/trooper-wordmark.png', 'image/png');
}

/** Character-builder cast, in the same pastel washes as the root OG. */
const PASTEL_CAST = [
  { id: 'rex', wash: '#d7f5e3' },
  { id: 'nova', wash: '#d5ebfb' },
  { id: 'scout', wash: '#fde7c2' },
  { id: 'pip', wash: '#e7d8fb' },
  { id: 'wren', wash: '#fbd4e3' },
] as const;

const castSrcCache = new Map<string, string>();

function castSrc(id: string) {
  const cached = castSrcCache.get(id);
  if (cached) return cached;
  const svg = readFileSync(join(process.cwd(), 'public/images/cast', `${id}.svg`));
  const src = `data:image/svg+xml;base64,${svg.toString('base64')}`;
  castSrcCache.set(id, src);
  return src;
}

function castSeed(text: string) {
  let n = 0;
  for (let i = 0; i < text.length; i += 1) n = (n * 33 + text.charCodeAt(i)) >>> 0;
  return n;
}

function PastelCast({ seed }: { seed: string }) {
  const n = castSeed(seed || 'trooper');
  const front = PASTEL_CAST[n % PASTEL_CAST.length];
  const back = PASTEL_CAST[(n + 2) % PASTEL_CAST.length];
  return (
    <div
      style={{
        position: 'absolute',
        right: 48,
        bottom: 56,
        width: 300,
        height: 250,
        display: 'flex',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 156,
          height: 148,
          borderRadius: 28,
          background: back.wash,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={castSrc(back.id)} alt="" width={112} height={112} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 176,
          height: 164,
          borderRadius: 28,
          background: front.wash,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={castSrc(front.id)} alt="" width={124} height={124} />
      </div>
    </div>
  );
}

const PAD_X = 64;
const PAD_Y = 48;

function TrooperBrandMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={trooperWordmarkSrc()} alt="" width={248} height={57} />
    </div>
  );
}

function MissionEyebrow({ index, label }: { index: string; label: string }) {
  if (!label) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {index ? (
        <span
          style={{
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: INK_FAINT,
          }}
        >
          {index}
        </span>
      ) : null}
      <span
        style={{
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: FERN,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function HeadlineBlock({ content }: { content: OgHeroContent }) {
  const singleLine = content.singleLineHeadline !== false;
  const headlineSize = content.headlineLead ? 64 : 68;
  const headlineStyle = {
    fontSize: headlineSize,
    lineHeight: 1.08,
    fontWeight: 700,
    letterSpacing: '-0.045em',
    fontFamily: 'Funnel Display',
  } as const;

  const primaryAccent = (
    <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <div
        style={{
          ...headlineStyle,
          color: INK,
          maxWidth: '100%',
          marginRight: content.headlineAccent && singleLine ? 12 : 0,
        }}
      >
        {content.headlinePrimary}
      </div>
      {content.headlineAccent ? (
        <div
          style={{
            ...headlineStyle,
            color: FERN,
            maxWidth: '100%',
          }}
        >
          {content.headlineAccent}
        </div>
      ) : null}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 760 }}>
      {content.headlineLead ? (
        <div
          style={{
            ...headlineStyle,
            color: INK,
          }}
        >
          {content.headlineLead}
        </div>
      ) : null}
      {singleLine ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            marginTop: content.headlineLead ? 6 : 0,
          }}
        >
          {primaryAccent}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: content.headlineLead ? 6 : 0 }}>
          <div style={{ ...headlineStyle, color: INK }}>{content.headlinePrimary}</div>
          {content.headlineAccent ? (
            <div style={{ ...headlineStyle, color: FERN, marginTop: 4 }}>{content.headlineAccent}</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function BadgeRow({ badges }: { badges: NonNullable<OgHeroContent['badgeIcons']> }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: `1px solid ${LINE}`,
            borderRadius: 999,
            padding: '8px 14px 8px 10px',
            background: '#ffffff',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={badge.iconUrl} alt="" width={22} height={22} style={{ borderRadius: 4 }} />
          <span style={{ fontSize: 18, color: INK, fontFamily: 'Inter' }}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

const HOME_TRUST = ['Free to start', 'No credit card', 'Your keys stay yours'] as const;

function TrustRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 28 }}>
      {HOME_TRUST.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 22, color: OK, fontFamily: 'Inter', fontWeight: 700, marginRight: 8 }}>✓</span>
          <span style={{ fontSize: 20, color: INK, fontFamily: 'Inter' }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function OgHeroImage({ content }: { content: OgHeroContent }) {
  const badges = mergeBadgeIcons(content.badgeIcons, content.description);
  const displayUrl = formatOgDisplayUrl(content.pageUrl || 'https://trooper.so');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: CANVAS,
      }}
    >
      {content.kind === 'home' ? null : <PastelCast seed={`${content.kind}:${content.pageUrl || content.headlinePrimary}`} />}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: `${PAD_Y}px 340px 40px ${PAD_X}px`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TrooperBrandMark />
          <MissionEyebrow index={content.eyebrowIndex} label={content.eyebrowLabel} />
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            {content.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.iconUrl} alt="" width={56} height={56} style={{ borderRadius: 12, marginTop: 8 }} />
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <HeadlineBlock content={content} />
            </div>
          </div>

          {content.description ? (
            <p
              style={{
                marginTop: 18,
                maxWidth: 760,
                fontSize: 24,
                lineHeight: 1.35,
                color: INK_MUTED,
                fontFamily: 'Funnel Display',
              }}
            >
              {truncate(content.description, 160)}
            </p>
          ) : null}

          {badges?.length ? <BadgeRow badges={badges} /> : null}

          {content.kind === 'home' ? <TrustRow /> : null}

          {content.showSetup ? (
            <div
              style={{
                marginTop: 22,
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                border: `1px solid ${LINE}`,
                borderRadius: 12,
                padding: '12px 18px',
                background: '#ffffff',
              }}
            >
              <span style={{ fontSize: 22, color: FERN, fontFamily: 'Roboto Mono', marginRight: 10 }}>$</span>
              <span style={{ fontSize: 20, color: INK, fontFamily: 'Roboto Mono' }}>{TROOPER_CLI_COMMAND}</span>
            </div>
          ) : null}
        </div>

        <span style={{ fontSize: 18, color: INK_FAINT, fontFamily: 'Inter' }}>{displayUrl}</span>
      </div>
    </div>
  );
}

export async function createOgImageResponse(content: OgHeroContent) {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgHeroImage content={content} />, {
    ...OG_SIZE,
    fonts,
  });
}
