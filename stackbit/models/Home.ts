import { MetaField } from '@/schemas/fields/Meta'
import { SectionsField } from '@/schemas/fields/Sections'
import { TitleField } from '@/schemas/fields/Title'
import type { PageModel } from '@stackbit/types'

export const HomeModel: PageModel = {
  name: 'Home',
  type: 'page',
  singleInstance: true,
  hideContent: true,
  urlPath: '/',
  filePath: 'src/content/pages/index.md',
  fields: [TitleField, MetaField, SectionsField],
}
