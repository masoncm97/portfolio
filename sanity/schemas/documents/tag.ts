import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'tag',
  title: 'Tag',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (rule) => rule.max(10).required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.max(200).required(),
    }),
  ],
})
