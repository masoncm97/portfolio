import 'styles/index.css'

import { toPlainText } from '@portabletext/react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import Navbar from '@/components/shared/Navbar-2/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { getAllEntries, getSettings } from '@/sanity/loader/loadQuery'
import { Tag } from '@/types'

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'))

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
  const data = await getSettings()
  const tags = data?.tags || ([] as Tag[])
  return (
    <>
      <div className="flex min-h-screen flex-col text-black relative">
        <Navbar tags={tags} />
        <h1 className="text-2xl fixed center-absolute">Mason Mathai</h1>
        {children}
      </div>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  )
}
