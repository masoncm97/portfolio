import 'styles/index.css'

import { toPlainText } from '@portabletext/react'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { getAllEntries, getSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homePage] = await Promise.all([
    getSettings(),
    getAllEntries(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense>{children}</Suspense>
}
