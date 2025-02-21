import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const FeaturesModel: ObjectModel = {
  name: 'Features',
  type: 'object',
  fields: [
    WriteupField,
    {
      name: 'features',
      type: 'list',
      items: {
        type: 'object',
        fields: [
          { name: 'icon', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
        ],
      },
    },
  ],
}
