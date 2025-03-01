import type { FieldList } from '@stackbit/types'

export const SectionsField: FieldList = {
  name: 'sections',
  type: 'list',
  items: {
    type: 'model',
    models: [
      'Collections',
      'Contact',
      'Content',
      'Cta',
      'Faqs',
      'Features',
      'Hero',
      'Intro',
      'Articles',
      'Products',
      'Reviews',
    ],
  },
}
