import 'tailwindcss/tailwind.css'

import { Analytics } from '@vercel/analytics/react'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'

import { getSettings } from '@/sanity/loader/loadQuery'
import { LayoutCollection, Tag, ThemeCollection } from '@/types'

import CollectionsProvider from './providers/CollectionsProvider'
import ThemeProvider from './providers/ThemeProvider'
import LayoutProvider, { LayoutContext } from './providers/LayoutProvider'
import { Providers } from './providers/Providers'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()
  let defaultCollectionFilters: string[] = []
  let themeCollection: ThemeCollection = { title: '', viewModes: [] }
  let layoutCollection: LayoutCollection = { title: '', viewModes: [] }
  if (settings.tags) {
    defaultCollectionFilters = settings.tags
      .filter((tag): tag is Tag & { title: string } => tag.title !== undefined)
      .map((tag) => tag.title)
  }

  if (settings.viewModeCollections) {
    themeCollection = settings.viewModeCollections[0]
    layoutCollection = settings.viewModeCollections[1]
  }

  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
    >
      <body className="overflow-x-hidden">
        <Providers
          defaultCollectionFilters={defaultCollectionFilters}
          themeCollection={themeCollection}
          layoutCollection={layoutCollection}
        >
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
