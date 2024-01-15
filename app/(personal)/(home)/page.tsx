import { HomePage } from '@/components/pages/home/HomePage'
import { getAllEntries } from '@/sanity/loader/loadQuery'

export default async function IndexRoute({
  searchParams,
}: {
  [key: string]: string | string[] | undefined
}) {
  const initial = await getAllEntries()

  return <HomePage data={initial} searchParams={searchParams} />
}
