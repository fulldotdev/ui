import { ButtonsField } from '@/schemas/fields/Buttons'
import { ImageField } from '@/schemas/fields/Image'
import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const HeroModel: ObjectModel = {
  name: 'Hero',
  type: 'object',
  fields: [WriteupField, ButtonsField, ImageField],
}
