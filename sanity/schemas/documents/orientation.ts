import { defineType, defineField } from 'sanity'
import { StackIcon } from '@sanity/icons'

export default defineType({
  type: 'document',
  name: 'orientation',
  title: 'Orientation',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
