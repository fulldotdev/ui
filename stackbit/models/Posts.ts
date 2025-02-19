import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../fields/Button'
import { WriteupField } from '../fields/Writeup'

export const PostsModel: ObjectModel = {
  name: 'Posts',
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
