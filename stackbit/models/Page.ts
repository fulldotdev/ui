import { type PageModel as PageModelType } from '@stackbit/types'
import { MetaField } from '../fields/Meta'
import { SectionsField } from '../fields/Sections'
import { TitleField } from '../fields/Title'

export const PageModel: PageModelType = {
  name: 'Page',
  type: 'page',
  urlPath: '/{slug}/',
  filePath: 'src/content/pages/{slug}.md',
  fields: [TitleField, MetaField, SectionsField],
}
