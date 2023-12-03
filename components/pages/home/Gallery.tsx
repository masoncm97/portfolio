// 'use client'

// import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
// import Link from 'next/link'
// import { Header } from '@/components/shared/Header'
// import { resolveHref } from '@/sanity/lib/utils'
// import type { EntryPayload, HomePagePayload } from '@/types'
// import { EntryListItem } from './EntryListItem'
// import { generateSiblingRoutes } from '@/util/routes-helper'

// export interface GalleryProps {
//   data: EntryPayload[] | null
//   encodeDataAttribute?: EncodeDataAttributeCallback
// }

// export function Gallery({ data, encodeDataAttribute }: GalleryProps) {
//   // Default to an empty object to allow previews on non-existent documents
//   const siblingRoutes = generateSiblingRoutes(data)

//   return (
//     <div className="space-y-20">
//       {data && data.length > 0 && (
//         <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
//           {entries.map((entry, key) => {
//             const href = resolveHref(entry._type, entry.slug)
//             if (!href || typeof href != 'string') {
//               return null
//             }
//             return (
//               <Link
//                 key={key}
//                 href={href}
//                 data-sanity={encodeDataAttribute?.(['entries', key, 'slug'])}
//               >
//                 <EntryListItem entry={entry} odd={key % 2} />
//               </Link>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

// export default HomePage
