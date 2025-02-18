import type { PageModel } from '@stackbit/types'
import { MetaField } from '../fields/Meta'
import { SectionsField } from '../fields/Sections'
import { TitleField } from '../fields/Title'

export const HomeModel: PageModel = {
  name: 'Home',
  type: 'page',
  singleInstance: true,
  hideContent: true,
  urlPath: '/',
  filePath: 'src/content/pages/index.md',
  fields: [TitleField, MetaField, SectionsField],
}
