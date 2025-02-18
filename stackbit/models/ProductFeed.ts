import type { PageModel } from '@stackbit/types'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'
import { WriteupField } from '../fields/Writeup'

export const ProductFeedModel: PageModel = {
  name: 'ProductFeed',
  type: 'page',
  singleInstance: true,
  urlPath: '/producten/',
  filePath: 'src/content/pages/producten.md',
  fields: [TitleField, WriteupField, MetaField],
}
