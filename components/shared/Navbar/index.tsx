import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { getSettings } from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
// const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  const initial = await getSettings()

  // if (draftMode().isEnabled) {
  //   return <NavbarPreview initial={initial} />
  // }

  return <NavbarLayout data={initial} />
}
