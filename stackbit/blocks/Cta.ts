import { ButtonsField } from '../components/Buttons'
import { WriteupField } from '../components/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const CtaModel: ObjectModel = {
  name: 'Cta',
  type: 'object',
  fields: [WriteupField, ButtonsField],
}
