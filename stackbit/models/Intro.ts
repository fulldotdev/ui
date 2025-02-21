import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const IntroModel: ObjectModel = {
  name: 'Intro',
  type: 'object',
  fields: [WriteupField],
}
