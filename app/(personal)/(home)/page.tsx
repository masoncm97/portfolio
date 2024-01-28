import type { Viewport } from 'next'

import { HomePage } from '@/components/pages/home/HomePage'
import { getAllEntries } from '@/sanity/loader/loadQuery'

import InteractionModeProvider, {
  InteractionMode,
} from '../InteractionModeProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function IndexRoute() {
  const initial = await getAllEntries()

  return (
    <InteractionModeProvider>
      <HomePage data={initial} />
    </InteractionModeProvider>
  )
}
