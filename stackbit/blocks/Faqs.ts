import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const FaqsModel: ObjectModel = {
  name: 'Faqs',
  type: 'object',
  fields: [
    WriteupField,
    {
      name: 'faqs',
      type: 'list',
      items: {
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
        ],
      },
    },
  ],
}
