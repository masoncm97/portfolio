import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'Category Filters displayed on the header of the site.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Tag Filters displayed on the header of the site.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'tag' }],
        }),
      ],
    }),
    defineField({
      name: 'viewModeCollections',
      title: 'ViewModeCollections',
      description: 'All View modes for the site',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'viewModeCollection' }],
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
