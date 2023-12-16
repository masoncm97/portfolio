import 'tailwindcss/tailwind.css'

import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import Bounded from '@/components/shared/Bounded'
import NavigationProvider from './(personal)/[slug]/NavigationProvider'
import { getAllEntries } from '@/sanity/loader/loadQuery'

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
  const initial = await getAllEntries()
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
    >
      <body>
        <NavigationProvider entries={initial.entries}>
          {children}
        </NavigationProvider>
      </body>
    </html>
  )
}
