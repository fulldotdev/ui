import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/button'
import { WriteupField } from '../fields/Writeup'

export const PostSelectionModel: ObjectModel = {
  name: 'PostSelection',
  type: 'object',
  fields: [
    WriteupField,
    ButtonField,
    {
      name: 'posts',
      type: 'list',
      items: {
        type: 'reference',
        models: ['Post'],
      },
    },
  ],
}
