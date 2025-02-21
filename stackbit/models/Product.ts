import { DescriptionField } from '@/schemas/fields/Description'
import { ImageField } from '@/schemas/fields/Image'
import { MetaField } from '@/schemas/fields/Meta'
import { TitleField } from '@/schemas/fields/Title'
import { type PageModel } from '@stackbit/types'

export const ProductModel: PageModel = {
  name: 'Product',
  type: 'page',
  readOnly: true,
  urlPath: '/producten/{slug}/',
  filePath: 'src/content/products/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
