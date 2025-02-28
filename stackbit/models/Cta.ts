import { ButtonsField } from '@/schemas/fields/Buttons'
import { WriteupField } from '@/schemas/fields/Writeup'
import { type ObjectModel } from '@stackbit/types'

export const CtaModel: ObjectModel = {
  name: 'Cta',
  type: 'object',
  fields: [WriteupField, ButtonsField],
}
