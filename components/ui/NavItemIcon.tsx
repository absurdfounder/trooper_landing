import Image from 'next/image'
import type { NavItem } from './nav-data'

export default function NavItemIcon({ item, className = '' }: { item: NavItem; className?: string }) {
  if (item.iconSrc) {
    return (
      <Image
        src={item.iconSrc}
        alt=""
        aria-hidden
        width={24}
        height={24}
        unoptimized
        className={`h-6 w-6 object-contain brightness-0 invert ${className}`}
      />
    )
  }

  if (item.brandMark === 'notion') {
    return (
      <span aria-hidden className={`flex h-6 w-6 items-center justify-center font-serif text-[21px] font-black leading-none text-white ${className}`}>
        N
      </span>
    )
  }

  if (item.brandMark === 'linear') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={`h-6 w-6 ${className}`}>
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.6 13.7 10.3 18.4M6.4 9.7l7.9 7.9M8.9 6.8l8.2 8.2M13.2 5.8l4.9 4.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  const Icon = item.icon
  return <Icon className={className} strokeWidth={2} aria-hidden />
}
