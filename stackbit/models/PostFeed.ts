import type { PageModel } from '@stackbit/types'
import { MetaField } from '../fields/Meta'
import { TitleField } from '../fields/Title'
import { WriteupField } from '../fields/Writeup'

export const PostFeedModel: PageModel = {
  name: 'PostFeed',
  type: 'page',
  singleInstance: true,
  urlPath: '/blog/',
  filePath: 'src/content/pages/blog.md',
  fields: [TitleField, WriteupField, MetaField],
}
