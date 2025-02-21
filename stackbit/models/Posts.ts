import { ButtonField } from '@/schemas/fields/Button'
import { WriteupField } from '@/schemas/fields/Writeup'
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
