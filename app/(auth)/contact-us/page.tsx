import Image from 'next/image';
import { ArrowUpRight, Mail } from 'lucide-react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';

const founderEmail = 'vaibhav@troopermail.com';

export default function ContactUs() {
  return (
    <>
      <Header />
      <SectionShell
        eyebrow="CONTACT"
        eyebrowNumber="01"
        bgClass="bg-canvas"
        clearSiteHeader
      >
        <div className="mx-auto max-w-6xl pb-10 pt-8 sm:pb-16 sm:pt-12 lg:pb-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
              Talk to the person
              <br className="hidden sm:block" /> building Trooper.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">
              Questions, feedback, or an idea you want to explore? Send me a note. I read every email.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-5">
            <article className="overflow-hidden rounded-md border border-[var(--color-line)] bg-white">
              <div className="grid h-full sm:grid-cols-[minmax(12rem,0.8fr)_1.2fr]">
                <div className="relative min-h-[18rem] overflow-hidden bg-[#edf2ee] sm:min-h-[24rem]">
                  <Image
                    src="/images/founder-portrait.png"
                    alt="Vaibhav, founder of Trooper"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover object-[center_22%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-sm border border-white/35 bg-black/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    Founder, Trooper
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:p-9">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                      A note from the founder
                    </p>
                    <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
                      Hi, I’m Vaibhav.
                    </h2>
                    <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-muted sm:text-base">
                      I started Trooper to make capable AI teammates useful in the work people already do. If you’re building with it, I’d love to hear what’s working and what should be better.
                    </p>
                  </div>
                  <a
                    href="https://twitter.com/absurdfounder"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-fit items-center gap-2 border-b border-black/15 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
                  >
                    @absurdfounder
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </article>

            <article className="flex min-h-[22rem] flex-col justify-between rounded-md border border-[var(--color-line)] bg-white p-6 sm:min-h-[24rem] sm:p-8 lg:p-9">
              <div>
                <div className="flex size-11 items-center justify-center rounded-md border border-[var(--color-line)] bg-canvas text-ink">
                  <Mail aria-hidden="true" className="size-5" strokeWidth={1.7} />
                </div>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  Email the founder
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
                  Let’s make something better.
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-muted sm:text-base">
                  Write directly to me. Tell me what’s on your mind and I’ll get back to you.
                </p>
              </div>
              <a
                href={`mailto:${founderEmail}`}
                className="group mt-10 flex min-w-0 items-center justify-between gap-4 border-t border-[var(--color-line)] pt-5 text-ink"
              >
                <span className="min-w-0 break-all font-display text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                  {founderEmail}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
              </a>
            </article>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
