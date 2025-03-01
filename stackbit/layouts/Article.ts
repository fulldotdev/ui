import { type PageModel } from '@stackbit/types'
import { DescriptionField } from '../components/Description'
import { ImageField } from '../components/Image'
import { MetaField } from '../components/Meta'
import { TitleField } from '../components/Title'

export const ArticleModel: PageModel = {
  name: 'Article',
  type: 'page',
  hideContent: false,
  urlPath: '/blog/{slug}/',
  filePath: 'src/content/articles/{slug}.md',
  fields: [TitleField, DescriptionField, ImageField, MetaField],
}
