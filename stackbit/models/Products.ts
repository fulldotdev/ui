import { ButtonField } from '@/schemas/fields/Button'
import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

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
