import { getEntries, getEntry, z } from 'astro:content'
import { assign } from 'radash'
import footer from './components/footer'
import header from './components/header'
import image from './components/image'
import images from './components/images'
import price from './components/price'
import section from './components/section'
import sections from './components/sections'
import sidebar from './components/sidebar'
import subheader from './components/subheader'
import toc from './components/toc'
import component from './utils/component'
import navigation from './utils/navigation'
import parents from './utils/parents'
import pathSchema from './utils/pathSchema'

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
    presets: z.array(pathSchema('presets')).optional(),
  })
  .passthrough()
  .transform(async ({ presets, ...rest }) => {
    let mergedData = {}

    const baseEntry = await getEntry('presets', 'base')
    mergedData = assign(mergedData, baseEntry?.data || {})

    if (presets) {
      const entries = await getEntries(presets)
      entries.forEach(
        (preset: any) => (mergedData = assign(mergedData, preset.data))
      )
    }

    mergedData = assign(mergedData, rest)
    return mergedData as typeof rest
  })

export const page = z
  .object({
    component,
    parents,
    theme: z.enum(['light', 'dark', 'system']),
    lang: z.string(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    title: z.string(),
    description: z.string().optional(),
    paragraph: z.string().optional(),
    image,
    images,
    section,
    sections,
    footer,
    header,
    sidebar,
    subheader,
    navigation,
    toc,
    price,
    code: z.any(),
    sizes: z.any(),
    banner: z.any(),
    _schema: z.any(),
    uitverkocht: z.any(),
    rating: z.any(),
    variants: z.any(),
    heading: z.any(),
    href: z.any(),
    next: z.any(),
    prev: z.any(),
  })
  .partial()
  .strict()

export default i18n.pipe(presets).pipe(page)
