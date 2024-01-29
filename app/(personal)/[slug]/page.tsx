import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { getAllEntries } from '@/sanity/loader/loadQuery'

import NavigationProvider from '../../providers/NavigationProvider'

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

  if (!initial) {
    notFound()
  }

  return (
    <NavigationProvider entries={initial.entries}>
      <Page data={entry} />
    </NavigationProvider>
  )
}
