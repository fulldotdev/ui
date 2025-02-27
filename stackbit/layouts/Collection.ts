import { DescriptionField } from '../components/Description'
import { ImageField } from '../components/Image'
import { MetaField } from '../components/Meta'
import { TitleField } from '../components/Title'
import { type PageModel } from '@stackbit/types'

export const CollectionModel: PageModel = {
  name: 'Collection',
  type: 'page',
  readOnly: true,
  urlPath: '/collecties/{slug}/',
  filePath: 'src/content/collections/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
