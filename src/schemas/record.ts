import { getEntry, z } from 'astro:content'
import { assign } from 'radash'
import image from './components/image'
import categories from './utils/categories'
import component from './utils/component'
import pathSchema from './utils/pathSchema'

const i18n = z
  .object({
    i18n: pathSchema('pages').optional(),
  })
  .passthrough()
  .transform(async ({ i18n, ...rest }) => {
    if (!i18n) return rest
    const entry = await getEntry(i18n)
    const merged = assign(entry.data, rest) as typeof rest
    return merged as typeof rest
  })

export default i18n.pipe(
  z
    .object({
      component,
      categories,
      title: z.string(),
      description: z.string().optional(),
      image,
    })
    .partial()
    .passthrough()
)
