import { FilterIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'category',
  title: 'Category',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (rule) => rule.max(10).required(),
    }),
  ],
})
