import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Builder | Trooper',
  description:
    'Pick people or soft shapes for your virtual team. Half-body busts, same animations.',
}

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return children
}
