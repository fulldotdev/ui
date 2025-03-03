import { type FieldObject } from '@stackbit/types'

export const ImageField: FieldObject = {
  name: 'image',
  type: 'object',
  fields: [
    { name: 'src', type: 'image', required: true },
    { name: 'alt', type: 'string', required: true },
  ],
}
