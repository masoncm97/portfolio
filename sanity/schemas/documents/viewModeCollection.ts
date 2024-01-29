import { CircleIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'viewModeCollection',
  title: 'ViewModeCollection',
  icon: CircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'viewModes',
      title: 'ViewModes',
      description: 'View modes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'viewMode' }],
        }),
      ],
    }),
  ],
})
