import { type PageModel as PageModelType } from '@stackbit/types'
import { ImageField } from '../components/Image'
import { MetaField } from '../components/Meta'
import { SectionsField } from '../components/Sections'
import { TitleField } from '../components/Title'
export const PageModel: PageModelType = {
  name: 'Page',
  type: 'page',
  urlPath: '/{slug}/',
  filePath: 'src/content/pages/{slug}.md',
  fields: [TitleField, MetaField, SectionsField, ImageField],
}
