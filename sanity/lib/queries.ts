import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    entries[]->{
      _id,
      _type,
      "slug": slug.current,
      category->{title},
      tags[]->{
        title
      },
      shortDescription, 
      medium,
      content, 
      image, 
      secondaryImage,
      location, 
      title,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const entryBySlugQuery = groq`
  *[_type == "entry" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    category->{title},
    tags[]->{
      title
    },
    shortDescription, 
    medium,
    content, 
    image, 
    secondaryImage,
    location, 
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    categories[]->{
      title
    },
    ogImage,
  }
`
