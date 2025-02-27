import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const ReviewsModel: ObjectModel = {
  name: 'Reviews',
  type: 'object',
  fields: [
    WriteupField,
    {
      name: 'reviews',
      type: 'list',
      items: {
        type: 'object',
        fields: [
          { name: 'rating', type: 'number' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
        ],
      },
    },
  ],
}
