import { type ObjectModel } from '@stackbit/types'
import { WriteupField } from '../fields/Writeup'

export const IntroModel: ObjectModel = {
  name: 'Intro',
  type: 'object',
  fields: [WriteupField],
}
