import { MetaField } from '@/schemas/fields/Meta'
import { SectionsField } from '@/schemas/fields/Sections'
import { TitleField } from '@/schemas/fields/Title'
import { type PageModel as PageModelType } from '@stackbit/types'

export const PageModel: PageModelType = {
  name: 'Page',
  type: 'page',
  urlPath: '/{slug}/',
  filePath: 'src/content/pages/{slug}.md',
  fields: [TitleField, MetaField, SectionsField],
}
