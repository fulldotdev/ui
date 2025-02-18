import type { FieldList } from '@stackbit/types'

export const SectionsField: FieldList = {
  name: 'sections',
  type: 'list',
  items: {
    type: 'model',
    models: [
      'CategorySelection',
      'Contact',
      'Content',
      'Cta',
      'Faqs',
      'Features',
      'Hero',
      'Intro',
      'PostSelection',
      'ProductSelection',
      'Reviews',
    ],
  },
}
