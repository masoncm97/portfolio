import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEntry } from '@/sanity/loader/loadQuery'
// import { loadPage } from '@/sanity/loader/loadQuery'

const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: entry } = await loadEntry(params.slug)

  return {
    title: entry?.title,
    description: entry?.shortDescription,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('entry')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadEntry(params.slug)

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
