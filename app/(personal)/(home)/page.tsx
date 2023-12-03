import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { HomePage } from '@/components/pages/home/HomePage'
import { getAllEntries } from '@/sanity/loader/loadQuery'

const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute({
  searchParams,
}: {
  [key: string]: string | string[] | undefined
}) {
  const initial = await getAllEntries()

  // if (draftMode().isEnabled) {
  //   return <HomePagePreview initial={initial} />
  // }

  // if (!initial.data) {
  //   return (
  //     <div className="text-center">
  //       You don&rsquo;t have a homepage yet,{' '}
  //       <Link href={`${studioUrl}/desk/home`} className="underline">
  //         create one now
  //       </Link>
  //       !
  //     </div>
  //   )
  // }

  // const param = new SearchParam();

  return <HomePage data={initial} searchParams={searchParams} />
}

export type SearchParam = {
  name: string
  value: string
}
