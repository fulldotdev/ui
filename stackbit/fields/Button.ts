import { type FieldObject } from '@stackbit/types'

export const ButtonField: FieldObject = {
  name: 'button',
  type: 'object',
  fields: [
    { name: 'text', type: 'string' },
    { name: 'href', type: 'string' },
  ],
}
