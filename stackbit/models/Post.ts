import { type PageModel } from '@stackbit/types'
import { DescriptionField } from '../fields/Description'
import { ImageField } from '../fields/Image'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'

export const PostModel: PageModel = {
  name: 'Post',
  type: 'page',
  hideContent: false,
  urlPath: '/blog/{slug}/',
  filePath: 'src/content/posts/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
