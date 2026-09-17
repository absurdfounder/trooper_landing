import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Builder | Trooper',
  description:
    'Pick clay portraits or soft shapes for your virtual team. Hair, clothes, and every expression included.',
}

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return children
}
