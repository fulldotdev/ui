import { getEntries, getEntry, z } from 'astro:content'
import { assign } from 'radash'
import footer from '../components/footer'
import header from '../components/header'
import image from '../components/image'
import sections from '../components/sections'
import { pathSchema } from '../utils'
import categories from '../utils/categories'
import component from '../utils/component'

export const i18n = z
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

export const presets = z
  .object({
    presets: pathSchema('presets').or(pathSchema('presets').array()).optional(),
  })
  .passthrough()
  .transform(async ({ presets, ...rest }) => {
    if (!presets) return rest
    const flat = [presets].flat()
    const entries = await getEntries(flat)
    let mergedData = {}
    entries.forEach(
      (preset: any) => (mergedData = assign(mergedData, preset.data))
    )
    mergedData = assign(mergedData, rest)
    return mergedData as typeof rest
  })

export const page = i18n.pipe(presets).pipe(
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
      header,
      sections,
      footer,
      navigation: z.any(),
    })
    .partial()
)
