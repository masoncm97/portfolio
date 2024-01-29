import type { PortableTextBlock } from '@portabletext/types'
import type { Image, ImageDefinition } from 'sanity'
export type SanityImage = Image & ImageDefinition

export interface BaseType {
  _type: string
  title: string
}

export enum TextSize {
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
}
export interface Category extends BaseType {}

export interface BaseType {
  _type: string
  title: string
}

export interface ViewMode extends BaseType {}

export interface ThemeCollection extends ViewModeCollection<Theme> {}
export interface Theme extends ViewMode {}

export interface LayoutCollection extends ViewModeCollection<Layout> {}
export interface Layout extends ViewMode {}

export interface ViewModeCollection<T extends ViewMode> {
  title: string
  viewModes: T[]
}

export interface Tag extends BaseType {
  description?: string
}

export interface Medium extends BaseType {}

export interface Orientation extends BaseType {}

export type SearchParam = {
  name: string
  value: string
}

export interface HomePagePayload {
  overview?: PortableTextBlock[]
  entries?: EntryPayload[]
  title?: string
}

export interface SettingsPayload {
  title?: string
  categories?: Category[]
  viewModeCollections?: ViewModeCollection<ViewMode>[]
  tags?: Tag[]
  ogImage?: SanityImage
}

export interface EntryPayload {
  _id: string
  _type: string
  slug?: string
  category?: Category
  tags?: Tag[]
  shortDescription?: string
  medium?: Medium
  size?: string
  content?: PortableTextBlock[]
  image?: SanityImage
  orientation?: Orientation
  secondaryImage?: SanityImage
  location?: string
  date?: string
  title?: string
  next?: string
  prev?: string
}

// export type SlugPayload = Pick<EntryPayload, 'slug'>

// export interface CategoryPayload {
//   _type: string
//   _id: string
//   title: string
// }

// export interface FieldPayload {
//   title?: string
//   value?: string
// }

// export interface MenuItem {
//   _type: string
//   slug?: string
//   title?: string
// }

// export interface MilestoneItem {
//   description?: string
//   duration?: {
//     start?: string
//     end?: string
//   }
//   image?: Image
//   tags?: string[]
//   title?: string
// }

// export interface ShowcaseProject {
//   _type: string
//   coverImage?: Image
//   overview?: PortableTextBlock[]
//   slug?: string
//   tags?: string[]
//   title?: string
// }

// // Page payloads

// export interface HomePagePayload {
//   footer?: PortableTextBlock[]
//   overview?: PortableTextBlock[]
//   showcaseProjects?: ShowcaseProject[]
//   title?: string
// }

// export interface PagePayload {
//   body?: PortableTextBlock[]
//   name?: string
//   overview?: PortableTextBlock[]
//   title?: string
//   slug?: string
// }

// export interface ProjectPayload {
//   client?: string
//   coverImage?: Image
//   description?: PortableTextBlock[]
//   duration?: {
//     start?: string
//     end?: string
//   }
//   overview?: PortableTextBlock[]
//   site?: string
//   slug: string
//   tags?: string[]
//   title?: string
// }

// export interface SettingsPayload {
//   footer?: PortableTextBlock[]
//   menuItems?: MenuItem[]
//   ogImage?: Image
// }
