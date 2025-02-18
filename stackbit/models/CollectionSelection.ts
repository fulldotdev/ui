import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/Button'
import { WriteupField } from '../fields/Writeup'

export const CollectionSelectionModel: ObjectModel = {
  name: 'CollectionSelection',
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
