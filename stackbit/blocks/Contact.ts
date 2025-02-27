import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

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
