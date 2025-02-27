import { ButtonField } from '../components/Button'
import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

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
