import { type PageModel } from '@stackbit/types'
import { DescriptionField } from '../fields/Description'
import { ImageField } from '../fields/Image'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'

export const ProductModel: PageModel = {
  name: 'Product',
  type: 'page',
  readOnly: true,
  urlPath: '/producten/{slug}/',
  filePath: 'src/content/products/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
