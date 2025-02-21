import { DescriptionField } from '@/schemas/fields/Description'
import { ImageField } from '@/schemas/fields/Image'
import { MetaField } from '@/schemas/fields/Meta'
import { TitleField } from '@/schemas/fields/Title'
import { type PageModel } from '@stackbit/types'

export const CollectionModel: PageModel = {
  name: 'Collection',
  type: 'page',
  readOnly: true,
  urlPath: '/collecties/{slug}/',
  filePath: 'src/content/collections/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
