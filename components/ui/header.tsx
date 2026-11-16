'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowDownToLine, ArrowRight, ChevronDown, Github } from 'lucide-react'

import FooterWordmark from '@/components/ui/FooterWordmark'
import NavItemIcon from './NavItemIcon'
import HeroDownloadButtons from '@/components/HeroDownloadButtons'
import MobileMenu from './mobile-menu'
import PixelButton from '@/components/ui/PixelButton'
import TranslateButton from './TranslateButton'
import {
  headerDirectLinks,
  headerDropdownGroups,
  type HeaderDropdownGroup,
  type NavItem,
} from './nav-data'

type DropdownKey = (typeof headerDropdownGroups)[number]['key'] | null

const GITHUB_URL = 'https://github.com/Trooper-AI/trooper-core'

export default function Header({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [darkHeroActive, setDarkHeroActive] = useState(dark)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const navRef = useRef<HTMLElement>(null)
  const darkNav = dark && darkHeroActive

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!dark) {
      setDarkHeroActive(false)
      return
    }

    const hero = document.querySelector<HTMLElement>('.trooper-hero')
    if (!hero) {
      setDarkHeroActive(false)
      return
    }

    const updateTheme = () => {
      const headerBottom = navRef.current?.closest('header')?.getBoundingClientRect().bottom ?? 64
      setDarkHeroActive(hero.getBoundingClientRect().bottom > headerBottom)
    }

    updateTheme()
    window.addEventListener('scroll', updateTheme, { passive: true })
    window.addEventListener('resize', updateTheme)
    return () => {
      window.removeEventListener('scroll', updateTheme)
      window.removeEventListener('resize', updateTheme)
    }
  }, [dark, pathname])

  useEffect(() => {
    if (!openDropdown) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (navRef.current?.contains(target)) return
      setOpenDropdown(null)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openDropdown])

  return (
    <header
      translate="no"
      className={`notranslate site-header fixed inset-x-0 top-0 z-[200] w-full transition-all duration-200 ${dark ? 'site-header-landing' : ''}`}
    >
      <div
        className={`relative transition-[background,box-shadow,border-color] duration-200 ${
          dark
            ? 'landing-header-frame bg-transparent shadow-none'
            : darkNav
            ? 'border-b border-transparent bg-transparent shadow-none'
            : `border-b border-slate-200/80 bg-white/95 backdrop-blur-xl ${scrolled ? 'shadow-[0_8px_28px_rgba(15,23,42,0.08)]' : ''}`
        }`}
        data-landing-theme={dark ? (darkNav ? 'dark' : 'light') : undefined}
      >
      {/* `.rail` shares the page measure and gutter. Keep overflow visible so
          dropdowns can extend beyond the header row without being cropped. */}
      <div
        className={`rail relative flex h-16 items-center gap-3 overflow-visible sm:gap-4 ${dark ? 'landing-header-row' : ''}`}
      >
        <a href="/" className="inline-flex shrink-0 items-center" aria-label="Trooper">
          <FooterWordmark variant={darkNav ? 'nav-dark' : 'nav'} />
        </a>

        <nav
          ref={navRef}
          className="relative hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Primary"
        >
          <ul className={dark ? 'landing-nav-links flex items-center gap-0.5' : 'flex items-center gap-0.5'}>
            {headerDropdownGroups.map((group) => (
              <NavDropdownItem
                key={group.key}
                group={group}
                isOpen={openDropdown === group.key}
                onToggle={() => setOpenDropdown((current) => current === group.key ? null : group.key)}
                onHover={() => setOpenDropdown(group.key)}
                onClose={() => setOpenDropdown(null)}
                dark={darkNav}
              />
            ))}
            {headerDirectLinks.map((link) => (
              <li key={link.href} className="relative z-10">
                <NavLink
                  href={link.href}
                  label={link.label}
                  onNavigate={() => setOpenDropdown(null)}
                  dark={darkNav}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 ml-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          {!dark ? <GitHubNavLink /> : null}

          <div className={`xl:block ${darkNav ? '[&_button]:!text-white/80 [&_button:hover]:!text-white' : ''}`}>
            <TranslateButton dark={darkNav} landing={dark} />
          </div>

          {!dark ? (
            <PixelButton
              href="https://app.trooper.so"
              external
              size="sm"
              variant="outline"
              tone="dark"
              className="plausible-event-name=Sign+In plausible-event-location=Header hidden shrink-0 xl:inline-flex"
            >
              Sign in
            </PixelButton>
          ) : null}

          {dark ? (
            <a
              href="/download/mac"
              data-hero-beam-source=""
              data-landing-header-download={dark ? '' : undefined}
              className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 sm:min-h-10 sm:gap-2 sm:px-4 sm:text-[13px] ${darkNav ? 'bg-white text-[#17171b] shadow-[0_5px_20px_rgba(0,0,0,.18)] hover:bg-neutral-100 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014]' : 'border border-slate-300 bg-white text-[#17171b] shadow-[0_3px_12px_rgba(15,23,42,.08)] hover:bg-neutral-100 focus-visible:ring-slate-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white'}`}
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden />
              Get Started
            </a>
          ) : !dark ? (
            <HeroDownloadButtons
              size="sm"
              variant="solid"
              tone="dark"
              className="hidden min-w-[10.75rem] shrink-0 xl:inline-flex"
            />
          ) : null}

          {dark ? (
            <a
              href="https://app.trooper.so"
              target="_blank"
              rel="noopener noreferrer"
              className={`plausible-event-name=Open+App plausible-event-location=Header hidden min-h-10 shrink-0 items-center gap-2 rounded-full border px-5 text-[13px] font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 xl:inline-flex ${darkNav ? 'border-white/25 bg-white text-[#11140e] hover:bg-neutral-100 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014]' : 'border-[#11140e] bg-[#11140e] text-white hover:bg-[#252820] focus-visible:ring-slate-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white'}`}
            >
              Login <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}

          <MobileMenu dark={darkNav} landing={dark} />
        </div>
      </div>
      </div>
    </header>
  )
}

function GitHubNavLink() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Trooper core on GitHub"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition-colors hover:bg-neutral-800 sm:h-10 sm:w-10"
    >
      <Github className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} />
    </a>
  )
}

function NavDropdownItem({
  group,
  isOpen,
  onToggle,
  onHover,
  onClose,
  dark = false,
}: {
  group: HeaderDropdownGroup
  isOpen: boolean
  onToggle: () => void
  onHover: () => void
  onClose: () => void
  dark?: boolean
}) {
  const { label, items } = group
  const lastPointerType = useRef<string | null>(null)

  return (
    <li className={`relative ${isOpen ? 'z-30' : 'z-10'}`}>
      <button
        type="button"
        onPointerDown={(event) => { lastPointerType.current = event.pointerType }}
        onClick={() => {
          // Mouse users have already opened this menu by hovering. Keep it open
          // on click; touch and keyboard users still get a true toggle.
          if (lastPointerType.current === 'mouse' && isOpen) {
            lastPointerType.current = null
            return
          }
          lastPointerType.current = null
          onToggle()
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') onHover()
        }}
        aria-expanded={isOpen}
        aria-controls={`${group.key}-nav-menu`}
        data-nav-dropdown-toggle
        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
          dark
            ? isOpen
              ? 'bg-white/10 text-white'
              : 'text-white/75 hover:bg-white/10 hover:text-white'
            : isOpen
              ? 'bg-canvas-warm text-ink'
              : 'text-ink-muted hover:bg-canvas-warm hover:text-ink'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            dark
              ? isOpen
                ? 'rotate-180 text-white/80'
                : 'text-white/45'
              : isOpen
                ? 'rotate-180 text-slate-600'
                : 'text-slate-400'
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id={`${group.key}-nav-menu`}
          className={`absolute top-full z-20 ${group.variant === 'features' ? 'left-0 w-[min(44rem,calc(100vw-2rem))] translate-x-0' : 'left-1/2 w-[min(37rem,calc(100vw-2rem))] -translate-x-1/2'} pt-3`}
          role="menu"
          data-nav-dropdown-panel
          data-nav-align={group.variant === 'features' ? 'left' : 'center'}
        >
          <div data-nav-theme={dark ? 'dark' : 'light'} className={`trooper-nav-panel max-h-[min(88vh,52rem)] overflow-y-auto rounded-[22px] border shadow-[0_28px_90px_rgba(0,0,0,.42)] ring-1 ${dark ? 'border-white/[0.09] text-white ring-white/[0.035]' : 'border-slate-200 bg-white text-slate-900 shadow-xl ring-black/5'}`}>
            {group.variant === 'catalog' ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-3.5 sm:p-4">
                {items.map((item) => <NavPluginCard key={item.href} item={item} onClose={onClose} dark={dark} />)}
              </div>
            ) : group.variant === 'features' ? (
              <>
                <div className="px-5 pb-2 pt-5">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white/45' : 'text-slate-400'}`}>The platform</p>
                  <p className={`mt-1 text-[16px] font-semibold tracking-[-0.02em] ${dark ? 'text-white' : 'text-slate-900'}`}>Made to carry work through.</p>
                </div>
                <div className="grid grid-cols-1 gap-1 px-3 pb-3 sm:grid-cols-2 sm:px-4 xl:grid-cols-3">
                  {items.map((item) => <NavFeatureLink key={item.href} item={item} onClose={onClose} dark={dark} />)}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4 p-3.5 sm:grid-cols-2 sm:gap-3 sm:p-4">
                {group.sections?.map((section) => (
                  <section key={section.label} className="min-w-0">
                    <h3 className={`mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>{section.label}</h3>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item) => <NavPluginCard key={item.href} item={item} onClose={onClose} dark={dark} />)}
                    </div>
                  </section>
                ))}
              </div>
            )}
            <div className={`trooper-nav-footer flex min-h-12 items-center justify-between gap-4 border-t px-4 py-3 sm:px-5 ${dark ? 'border-white/[0.08]' : 'border-slate-200'}`}>
              <span className={`truncate text-[13px] ${dark ? 'text-white/50' : 'text-slate-500'}`}>{group.footerText}</span>
              <a href={group.footerHref} onClick={onClose} role="menuitem" className={`group inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors ${dark ? 'text-white/90 hover:text-white' : 'text-slate-800 hover:text-black'}`}>
                {group.footerLabel}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

function NavPluginCard({ item, onClose, dark }: { item: NavItem; onClose: () => void; dark: boolean }) {
  return (
    <a href={item.href} onClick={onClose} role="menuitem" className={`group flex min-h-[56px] items-center gap-3 rounded-xl p-2 transition-colors ${dark ? 'hover:bg-white/[0.06]' : 'hover:bg-slate-50'}`}>
      <span style={{ background: navIconGradient(item) }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_3px_8px_rgba(0,0,0,.14)] transition-transform group-hover:scale-[1.04]">
        <NavItemIcon item={item} className="h-[21px] w-[21px] text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[14px] font-medium ${dark ? 'text-white/95 group-hover:text-white' : 'text-slate-900'}`}>{item.title}</span>
        {item.description ? <span className={`mt-1 block truncate text-[12px] ${dark ? 'text-white/50' : 'text-slate-500'}`}>{item.description}</span> : null}
      </span>
    </a>
  )
}

function NavFeatureLink({ item, onClose, dark }: { item: NavItem; onClose: () => void; dark: boolean }) {
  return (
    <a href={item.href} onClick={onClose} role="menuitem" className={`group flex min-h-[52px] items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors ${dark ? 'hover:bg-white/[0.06]' : 'hover:bg-slate-50'}`}>
      <span style={{ background: navIconGradient(item) }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.28),0_3px_8px_rgba(0,0,0,.12)] transition-transform group-hover:scale-[1.04]">
        <NavItemIcon item={item} className="h-[18px] w-[18px] text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-[13px] font-medium ${dark ? 'text-white/95 group-hover:text-white' : 'text-slate-900'}`}>{item.title}</span>
        {item.description ? <span className={`mt-0.5 block truncate text-[11px] ${dark ? 'text-white/50' : 'text-slate-500'}`}>{item.description}</span> : null}
      </span>
      <ArrowRight className={`h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60 ${dark ? 'text-white' : 'text-slate-500'}`} aria-hidden />
    </a>
  )
}

function navIconGradient(item: NavItem) {
  const color = item.iconColor
  if (/amber|orange|yellow/.test(color)) return 'linear-gradient(140deg, #ffc15e 0%, #f17d43 48%, #c44775 100%)'
  if (/rose|pink|red|fuchsia/.test(color)) return 'linear-gradient(140deg, #ff8297 0%, #e64c83 50%, #714bdd 100%)'
  if (/purple|violet|indigo/.test(color)) return 'linear-gradient(140deg, #c38bf5 0%, #8058df 52%, #305ec4 100%)'
  if (/sky|blue|cyan/.test(color)) return 'linear-gradient(140deg, #65d6e7 0%, #3189de 52%, #314caa 100%)'
  if (/slate|stone|gray/.test(color)) return 'linear-gradient(140deg, #aab9c9 0%, #687d98 48%, #39465e 100%)'
  return 'linear-gradient(140deg, #70dba8 0%, #25a995 48%, #286ec7 100%)'
}

function NavLink({
  href,
  label,
  onNavigate,
  dark = false,
}: {
  href: string
  label: string
  onNavigate?: () => void
  dark?: boolean
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
        dark
          ? 'text-white/75 hover:bg-white/10 hover:text-white'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {label}
    </a>
  )
}
