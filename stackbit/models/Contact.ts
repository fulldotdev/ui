import { type ObjectModel } from '@stackbit/types'
import { WriteupField } from '../fields/Writeup'

export const ContactModel: ObjectModel = {
  name: 'Contact',
  type: 'object',
  fields: [
    WriteupField,
    // channels: linkSchema.array().optional(),
    // socials: z.string().array().optional(),
    // form: z.any(),
  ],
}
