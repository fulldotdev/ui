import { ButtonField } from '../components/Button'
import { WriteupField } from '../components/Writeup'
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
