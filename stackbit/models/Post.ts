import { DescriptionField } from '@/schemas/fields/Description'
import { ImageField } from '@/schemas/fields/Image'
import { MetaField } from '@/schemas/fields/Meta'
import { TitleField } from '@/schemas/fields/Title'
import { type PageModel } from '@stackbit/types'

export const PostModel: PageModel = {
  name: 'Post',
  type: 'page',
  hideContent: false,
  urlPath: '/blog/{slug}/',
  filePath: 'src/content/posts/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
