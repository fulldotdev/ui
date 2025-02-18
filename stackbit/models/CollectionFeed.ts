import type { PageModel } from '@stackbit/types'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'
import { WriteupField } from '../fields/Writeup'

export const CollectionFeedModel: PageModel = {
  name: 'CollectionFeed',
  type: 'page',
  singleInstance: true,
  urlPath: '/collecties/',
  filePath: 'src/content/pages/collecties.md',
  fields: [TitleField, WriteupField, MetaField],
}
