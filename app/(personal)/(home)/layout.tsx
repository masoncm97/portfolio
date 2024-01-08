import 'styles/index.css'

import { toPlainText } from '@portabletext/react'
import { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { getAllEntries, getSettings } from '@/sanity/loader/loadQuery'
import Loading from './loading'

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

// export const viewport: Viewport = {
//   themeColor: '#000',
// }

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col text-black">
        <h1 className="mt-3 w-screen text-center text-2xl">Mason Mathai</h1>
        {/* <div className="items-center sm:flex sm:justify-between">
          <Suspense>
            <Navbar />
          </Suspense>
          <h1 className="hidden sm:block">Mason Mathai</h1>
        </div> */}
        <div className="mt-5 flex-grow px-4 md:px-16 lg:px-32">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  )
}
