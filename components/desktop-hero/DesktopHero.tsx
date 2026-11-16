import { ArrowRight } from 'lucide-react';
import HeroDownloadButtons from '@/components/HeroDownloadButtons';
import TrooperAppDashboardDemo from '@/components/TrooperAppDashboardDemo';
import LinuxMark from '@/components/ui/LinuxMark';
import WindowsMark from '@/components/ui/WindowsMark';
import HeroRotatingHeadline from '../HeroRotatingHeadline';
import OpenBotBeam from './OpenBotBeam';

const PLATFORMS = [
  { label: 'macOS', icon: '/images/platforms/apple.svg' },
  { label: 'Windows', icon: 'windows' },
  { label: 'Linux', icon: 'linux' },
  { label: 'iOS', icon: '/images/platforms/apple.svg' },
  { label: 'Android', icon: '/images/platforms/android.svg' },
] as const;

const PROVIDERS = [
  { name: 'Codex', icon: '/images/providers/openai.svg', className: 'brightness-0 invert' },
  { name: 'Claude', icon: '/images/desktop/dock/claude.svg', className: '' },
  { name: 'Gemini', icon: '/images/providers/google.svg', className: '' },
  { name: 'Grok', icon: '/images/providers/xai.svg', className: 'brightness-0 invert' },
] as const;

/** Dark, product-led landing hero, composed around the app preview. */
export default function DesktopHero() {
  return (
    <section className="band trooper-hero relative overflow-hidden text-white">
      <OpenBotBeam
        surfaceSelector=".hero-product-frame"
        sourceSelector="[data-hero-beam-source]"
      />

      <div className="trooper-hero-content relative z-10">
        <div className="hero-platforms mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2 rounded-full border border-white/15 bg-white/[0.055] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_12px_40px_rgba(0,0,0,.18)] backdrop-blur-xl sm:gap-x-2 sm:px-3 sm:py-1">
          <span className="hero-platform-new rounded-full bg-white px-2.5 py-0.5 text-[9px] font-bold tracking-[0.06em] text-[#17171b]">NEW</span>
          <span className="hero-platform-availability text-[11px] text-white/55">Available on</span>
          <span className="hero-platform-list inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {PLATFORMS.map((platform, index) => (
              <span key={platform.label} className="hero-platform-item inline-flex items-center gap-1 rounded-full px-0 py-0.5">
                {platform.icon === 'linux' ? (
                  <LinuxMark className="h-3 w-3 text-white/80" />
                ) : platform.icon === 'windows' ? (
                  <WindowsMark className="h-3 w-3 text-white/90" />
                ) : (
                  <img src={platform.icon} alt="" aria-hidden className="h-3 w-3 brightness-0 invert" />
                )}
                <span className="text-[11px] font-medium text-white">
                  {platform.label}
                </span>
                {index < PLATFORMS.length - 1 ? <span className="hero-platform-divider ml-0.5 h-2.5 w-px bg-white/15 sm:ml-1" aria-hidden /> : null}
              </span>
            ))}
          </span>
        </div>

        <div className="hero-copy">
          <HeroRotatingHeadline className="mx-auto mt-7 text-center sm:mt-9" />

          <p className="lede mx-auto mt-5 max-w-[48rem] text-center text-base leading-relaxed text-white/75 sm:mt-6 sm:text-xl sm:leading-[1.55]">
            Run{' '}
            {PROVIDERS.map((provider, index) => (
              <span key={provider.name}>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap align-baseline">
                  <img
                    src={provider.icon}
                    alt=""
                    aria-hidden="true"
                    className={`h-[0.86em] w-[0.86em] object-contain ${provider.className}`}
                  />
                  <strong className="font-semibold text-white/90">{provider.name}</strong>
                </span>
                {index < PROVIDERS.length - 1 ? ', ' : ' '}
              </span>
            ))}
            and your own models in one persistent workspace. Agents hand off work, use tools, and collaborate with your real teammates. Switch AI providers while keeping all your chats and memory intact.
          </p>
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
          <HeroDownloadButtons split beamSource className="hero-download-control w-full justify-center sm:w-auto" />
          <a
            href="https://app.trooper.so?ref=herolanding"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.055] px-6 text-[15px] font-medium text-white/90 backdrop-blur-md transition-colors hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014] sm:w-auto sm:text-base"
          >
            Get started <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

      </div>

      <div className="hero-product-preview relative z-10 mx-auto">
        <div className="hero-product-frame overflow-hidden rounded-t-[22px] border border-white/15 border-b-0 bg-[#111113] p-2.5 pb-0 shadow-[0_-8px_80px_rgba(217,70,239,.10),0_0_60px_rgba(236,72,153,.08),0_30px_100px_rgba(0,0,0,.55)] sm:rounded-t-[28px] sm:p-3.5 sm:pb-0">
          <div className="overflow-hidden rounded-t-[15px] sm:rounded-t-[20px]">
            <div className="hero-product-demo-reservation">
              <TrooperAppDashboardDemo maxHeight={744} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
