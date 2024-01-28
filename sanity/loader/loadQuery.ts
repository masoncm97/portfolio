import 'server-only'

import { draftMode } from 'next/headers'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { getAllEntriesQuery, settingsQuery } from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import { EntryPayload, HomePagePayload, SettingsPayload } from '@/types'

import { queryStore } from './createQueryStore'

const serverClient = client.withConfig({
  token,
  perspective: 'published',
  useCdn: true,
  stega: false,
  // stega: {
  //   // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  //   enabled: process.env.VERCEL_ENV === 'preview',
  // },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options
  // Don't cache by default
  // let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  // if (!usingCdn && Array.isArray(options.next?.tags)) {
  //   revalidate = false
  // } else if (usingCdn) {
  //   revalidate = 60
  // }
  const revalidate = 120

  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // @TODO add support in `@sanity/client/stega` for the below
    // stega: {enabled: draftMode().isEnabled}
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

// export function loadSettings() {
//   return loadQuery<SettingsPayload>(
//     settingsQuery,
//     {},
//     { next: { tags: ['settings', 'home', 'page'] } },
//   )
// }

export function getSettings() {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return serverClient.fetch<SettingsPayload>(settingsQuery, {
    next: { revalidate: 60, tags: ['settings', 'home', 'page'] },
  })
}

export function getAllEntries() {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return serverClient.fetch<HomePagePayload>(
    getAllEntriesQuery,
    {},
    { next: { revalidate: 60, tags: ['home', 'entry'] } },
  )
}

// export function loadAllEntries() {
//   return loadQuery<HomePagePayload | null>(
//     getAllEntriesQuery,
//     {},
//     { next: { tags: ['home', 'entry'] } },
//   )
// }
