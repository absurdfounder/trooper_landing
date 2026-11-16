'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'

import HeroDownloadButtons from '@/components/HeroDownloadButtons'
import NavItemIcon from './NavItemIcon'

import {
  headerDirectLinks,
  headerDropdownGroups,
  type NavItem,
} from './nav-data'

type AccordionProps = {
  label: string
  items: NavItem[]
  sections?: { label: string; items: NavItem[] }[]
  onNavigate?: () => void
  defaultOpen?: boolean
  dark?: boolean
}

function Accordion({ label, items, sections, onNavigate, defaultOpen = false, dark = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const renderItems = (links: NavItem[]) => links.map((item) => (
    <li key={item.href}>
      <a
        href={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-3 rounded-lg p-2 ${dark ? 'text-white/85 active:bg-white/[0.08]' : 'text-slate-800 active:bg-slate-50'}`}
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${item.bgColor}`}>
          <NavItemIcon item={item} className={`h-5 w-5 ${item.iconColor}`} />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-sm font-medium ${dark ? 'text-white/90' : 'text-slate-900'}`}>{item.title}</span>
          {item.description ? <span className={`block truncate text-xs ${dark ? 'text-white/50' : 'text-slate-500'}`}>{item.description}</span> : null}
        </span>
      </a>
    </li>
  ))

  return (
    <div className={`border-b ${dark ? 'border-white/10' : 'border-slate-100'}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${dark ? 'text-white/45' : 'text-slate-400'} ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open ? (
        <div className="pb-3">
          {sections?.length ? sections.map((section) => (
            <section key={section.label} className={`border-t first:border-0 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
              <p className={`px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>{section.label}</p>
              <ul className="grid grid-cols-1 gap-1">{renderItems(section.items)}</ul>
            </section>
          )) : <ul className="grid grid-cols-1 gap-1">{renderItems(items)}</ul>}
        </div>
      ) : null}
    </div>
  )
}

export default function MobileMenu({ dark = false, landing = false }: { dark?: boolean; landing?: boolean }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  useEffect(() => {
    close()
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-landing-menu-trigger={landing ? '' : undefined}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm active:bg-slate-50 sm:h-10 sm:w-10 ${
          dark
            ? 'border-white/20 bg-white/5 text-white active:bg-white/10'
            : 'border-slate-200 bg-white text-slate-900'
        }`}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="fixed inset-0 z-[250] cursor-default bg-slate-900/50 backdrop-blur-[2px] animate-[fadeIn_.18s_ease-out] xl:hidden"
        />
      ) : null}

      {isOpen ? (
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[260] flex h-[100dvh] w-[min(88vw,320px)] max-w-sm translate-x-0 flex-col shadow-2xl transition-transform duration-300 ease-out xl:hidden ${dark ? 'bg-[#15151a] text-white' : 'bg-white text-slate-900'}`}
      >
        <div className={`flex h-14 items-center justify-between border-b px-4 ${dark ? 'border-white/10 bg-[#15151a]' : 'border-slate-100 bg-white'}`}>
          <span className={`font-display text-base font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Menu</span>
          <button
            type="button"
            onClick={close}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${dark ? 'text-white/70 active:bg-white/10' : 'text-slate-600 active:bg-slate-100'}`}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className={`flex-1 overflow-y-auto overscroll-contain px-4 pb-4 ${dark ? 'bg-[#15151a]' : 'bg-white'}`}>
          {headerDropdownGroups.map((group) => (
            <Accordion
              key={group.key}
              label={group.label}
              items={group.items}
              sections={group.sections}
              onNavigate={close}
              defaultOpen={group.key === 'guides'}
              dark={dark}
            />
          ))}

          {headerDirectLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={`flex border-b py-4 text-[15px] font-semibold active:text-[#7aa824] ${dark ? 'border-white/10 text-white' : 'border-slate-100 text-slate-900'}`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://app.trooper.so"
            onClick={close}
            className={`my-3 flex items-center justify-center rounded-xl border px-4 py-3 text-[15px] font-semibold shadow-sm transition-colors ${dark ? 'border-white/25 bg-white text-[#11140e] active:bg-neutral-100' : 'border-[#11140e] bg-[#11140e] text-white active:bg-[#252820]'}`}
          >
            Login
          </a>
        </nav>

        <div className={`border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${dark ? 'border-white/10 bg-[#15151a]' : 'border-slate-100 bg-white'}`}>
          <HeroDownloadButtons
            size="md"
            variant="solid"
            tone={dark ? 'light' : 'dark'}
            className="w-full justify-center"
          />
          <a
            href="https://app.trooper.so"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={`mt-2 flex w-full items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold ${dark ? 'border-white/15 text-white/80 active:bg-white/10' : 'border-slate-200 text-slate-700 active:bg-slate-50'}`}
          >
            Get started
          </a>
        </div>
      </aside>
      ) : null}
    </div>
  )
}
