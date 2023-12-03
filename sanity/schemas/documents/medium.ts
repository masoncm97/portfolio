import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export default defineType({
  type: 'document',
  name: 'medium',
  title: 'Medium',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (rule) => rule.max(10).required(),
    }),
  ],
})
