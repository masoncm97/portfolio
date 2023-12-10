import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { getAllEntries } from '@/sanity/loader/loadQuery'
import { generateSiblingRoutes, getNextRoute } from '@/util/routes-helper'
import NavigationProvider from './NavigationProvider'

const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const initial = await getAllEntries()
  const entry = initial.entries?.find((entry) => entry?.slug === params.slug)

  return {
    title: entry?.title,
    description: entry?.shortDescription,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('entry')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await getAllEntries()

  const entry = initial.entries?.find((entry) => entry?.slug === params.slug)

  if (entry) {
    const siblingRoutes = generateSiblingRoutes(initial.entries)
    entry.next = getNextRoute(
      params.slug,
      siblingRoutes,
      (index: number) => index + 1,
    )
    entry.prev = getNextRoute(
      params.slug,
      siblingRoutes,
      (index: number) => index - 1,
    )
  }

  // if (draftMode().isEnabled) {
  //   return <PagePreview params={params} initial={initial} />
  // }

  if (!initial) {
    notFound()
  }

  return (
    <NavigationProvider entries={initial.entries}>
      <Page data={entry} />
    </NavigationProvider>
  )
}
