import { ReadonlyURLSearchParams } from 'next/navigation'

import { EntryPayload } from '@/types'

export function generateSiblingRoutes(
  entries: EntryPayload[] | undefined,
): string[] {
  if (!entries) return []
  return entries.map((entry) => `${entry.slug}`)
}

export function getNextRoute(
  currentRoute: string,
  siblingRoutes: string[],
  modifier: (number) => number,
) {
  if (!siblingRoutes || siblingRoutes.length === 0) return ''

  const currentIndex = siblingRoutes.indexOf(currentRoute)
  if (currentIndex === -1) return ''

  // Apply the modifier function and ensure the result is within bounds using modulo
  const newIndex = modifier(currentIndex) % siblingRoutes.length

  // Adjust for negative indices resulting from the modifier function
  return siblingRoutes[
    newIndex < 0 ? newIndex + siblingRoutes.length : newIndex
  ]
}

export function getParamValue(
  params: ReadonlyURLSearchParams,
  key: string,
): string | undefined {
  return params
    .toString()
    .split('&')
    .find((param) => param.includes(key))
    ?.split('=')[1]
}
