import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/Button'
import { WriteupField } from '../fields/Writeup'

export const ProductsModel: ObjectModel = {
  name: 'Products',
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
