import { type ObjectModel } from '@stackbit/types'
import { ButtonsField } from '../fields/Buttons'
import { ImageField } from '../fields/Image'
import { WriteupField } from '../fields/Writeup'

export const HeroModel: ObjectModel = {
  name: 'Hero',
  type: 'object',
  fields: [WriteupField, ButtonsField, ImageField],
}
