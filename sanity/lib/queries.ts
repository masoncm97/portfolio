import { groq } from 'next-sanity'

export const getAllEntriesQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    entries[]->{
      _id,
      _type,
      "slug": slug.current,
      category->{_type,title},
      tags[]->{
        _type,
        title
      },
      shortDescription, 
      size,
      medium->{_type,title},
      content, 
      image{
        asset,
        "lqip": asset->metadata.lqip,
        "palette": asset->metadata.palette,
        "blurHash": asset->metadata.blurHash
      },
      orientation->{_type,title},
      secondaryImage,
      location, 
      date,
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

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    categories[]->{
      _type,
      title
    },
    tags[]->{
      _type,
      title,
      description
    },
    viewModeCollections[]->{
      title, 
      viewModes[]->{
        _type,
        title,
      }
    },
    ogImage,
  }
`
