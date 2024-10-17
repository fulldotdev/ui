import { getEntries, getEntry, z } from 'astro:content'
import { assign } from 'radash'
import image from './components/image'
import sections from './components/sections'
import categories from './utils/categories'
import component from './utils/component'
import navigation from './utils/navigation'
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

const presets = z
  .object({
    presets: z.array(pathSchema('presets')).optional(),
  })
  .passthrough()
  .transform(async ({ presets, ...rest }) => {
    if (!presets) return rest
    const entries = await getEntries(presets)
    let mergedData = {}
    entries.forEach(
      (preset: any) => (mergedData = assign(mergedData, preset.data))
    )
    mergedData = assign(mergedData, rest)
    return mergedData as typeof rest
  })

export default i18n.pipe(presets).pipe(
  z
    .object({
      component,
      categories,
      theme: z.enum(['light', 'dark']),
      lang: z.string(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
      title: z.string(),
      description: z.string().optional(),
      image,
      sections,
      header: z.any(),
      footer: z.any(),
      navigation,
      toc: z.any(),
      sidebar: z.any(),
    })
    .partial()
    .passthrough()
)
