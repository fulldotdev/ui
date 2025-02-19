import { type FieldObject } from '@stackbit/types'

export const MetaField: FieldObject = {
  name: 'meta',
  type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'canonical', type: 'string' },
    { name: 'noindex', type: 'boolean' },
    { name: 'nofollow', type: 'boolean' },
    { name: 'css', type: 'string' },
    { name: 'head', type: 'string' },
    { name: 'body', type: 'string' },
  ],
}
