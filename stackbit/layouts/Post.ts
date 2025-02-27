import { DescriptionField } from '../components/Description'
import { ImageField } from '../components/Image'
import { MetaField } from '../components/Meta'
import { TitleField } from '../components/Title'
import { type PageModel } from '@stackbit/types'

export const PostModel: PageModel = {
  name: 'Post',
  type: 'page',
  hideContent: false,
  urlPath: '/blog/{slug}/',
  filePath: 'src/content/posts/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
