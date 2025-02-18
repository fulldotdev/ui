import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/button'
import { WriteupField } from '../fields/Writeup'

export const ProductSelectionModel: ObjectModel = {
  name: 'ProductSelection',
  type: 'object',
  fields: [
    WriteupField,
    ButtonField,
    {
      name: 'products',
      type: 'list',
      items: {
        type: 'reference',
        models: ['Product'],
      },
    },
  ],
}
