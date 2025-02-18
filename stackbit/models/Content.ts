import { type ObjectModel } from '@stackbit/types'
import { ButtonsField } from '../fields/Buttons'
import { ImageField } from '../fields/Image'
import { WriteupField } from '../fields/Writeup'

export const ContentModel: ObjectModel = {
  name: 'Content',
  type: 'object',
  fields: [WriteupField, ButtonsField, ImageField],
}
