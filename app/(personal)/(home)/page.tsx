import type { Viewport } from 'next'

import { HomePage } from '@/components/pages/home/HomePage'
import { getAllEntries, getSettings } from '@/sanity/loader/loadQuery'
import { Tag } from '@/types'

import InteractionModeProvider from '../../providers/InteractionModeProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function IndexRoute() {
  const initial = await getAllEntries()
  const settings = await getSettings()

  if (!settings.tags) {
    throw Error('shit')
  }
  const defaultCollectionFilters = settings.tags
    .filter((tag): tag is Tag & { title: string } => tag.title !== undefined)
    .map((tag) => tag.title)

  // const defaultCollectionFilters = new Set<string>(tagTitles)

  return (
    <InteractionModeProvider>
      <HomePage data={initial} />
    </InteractionModeProvider>
  )
}
