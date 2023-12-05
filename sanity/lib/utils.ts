import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'
import { SearchParam } from '@/types'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined | SearchParam {
  switch (documentType) {
    case 'home':
      return '/'
    case 'entry':
      return slug ? `/${slug}` : undefined
    case 'category':
      return slug ? { name: 'category', value: slug } : undefined
    case 'tag':
      return slug ? { name: 'tag', value: slug } : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
