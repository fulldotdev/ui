import { ButtonsField } from '../components/Buttons'
import { ImageField } from '../components/Image'
import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const ContentModel: ObjectModel = {
  name: 'Content',
  type: 'object',
  fields: [WriteupField, ButtonsField, ImageField],
}
