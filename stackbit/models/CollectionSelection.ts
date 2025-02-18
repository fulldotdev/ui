import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/button'
import { WriteupField } from '../fields/Writeup'

export const CollectionSelectionModel: ObjectModel = {
  name: 'CollectionSelection',
  type: 'object',
  fields: [
    WriteupField,
    ButtonField,
    {
      name: 'categories',
      type: 'list',
      items: {
        type: 'reference',
        models: ['Collection'],
      },
    },
  ],
}
