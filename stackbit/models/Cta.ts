import { type ObjectModel } from '@stackbit/types'
import { ButtonsField } from '../fields/Buttons'
import { WriteupField } from '../fields/Writeup'

export const CtaModel: ObjectModel = {
  name: 'Cta',
  type: 'object',
  fields: [WriteupField, ButtonsField],
}
