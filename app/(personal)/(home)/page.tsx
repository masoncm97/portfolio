import { HomePage } from '@/components/pages/home/HomePage'
import { getAllEntries } from '@/sanity/loader/loadQuery'
import type { Viewport } from 'next'
import InteractionModeProvider, {
  InteractionMode,
} from '../InteractionModeProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function IndexRoute({
  searchParams,
}: {
  [key: string]: string | string[] | undefined
}) {
  const initial = await getAllEntries()

  return (
    <InteractionModeProvider>
      <HomePage data={initial} searchParams={searchParams} />
    </InteractionModeProvider>
  )
}
