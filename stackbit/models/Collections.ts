import { ButtonField } from '@/schemas/fields/Button'
import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const CollectionsModel: ObjectModel = {
  name: 'Collections',
  type: 'object',
  fields: [
    WriteupField,
    ButtonField,
    {
      name: 'collections',
      type: 'list',
      items: {
        type: 'reference',
        models: ['Collection'],
      },
    },
  ],
}
