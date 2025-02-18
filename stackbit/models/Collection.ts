import { type PageModel } from '@stackbit/types'
import { DescriptionField } from '../fields/Description'
import { ImageField } from '../fields/Image'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'

export const CollectionModel: PageModel = {
  name: 'Collection',
  type: 'page',
  readOnly: true,
  urlPath: '/collecties/{slug}/',
  filePath: 'src/content/collections/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
