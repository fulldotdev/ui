import { type ObjectModel } from '@stackbit/types'
import { ButtonField } from '../components/Button'
import { WriteupField } from '../components/Writeup'

export const ArticlesModel: ObjectModel = {
  name: 'Articles',
  type: 'object',
  fields: [
    WriteupField,
    ButtonField,
    {
      name: 'articles',
      type: 'list',
      items: {
        type: 'reference',
        models: ['Article'],
      },
    },
  ],
}
