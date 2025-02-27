import { MetaField } from '../components/Meta'
import { SectionsField } from '../components/Sections'
import { TitleField } from '../components/Title'
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
