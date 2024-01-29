import { StackIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
