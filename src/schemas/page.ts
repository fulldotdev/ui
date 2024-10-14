import { getEntries, reference, z } from 'astro:content'
import { assign, mapKeys } from 'radash'
import { base } from './base'
import { block } from './block'
import { navigation } from './navigation'
import { pathSchema } from './utils'

export const page = base
  .extend({
    i18n: pathSchema('pages'),
    _layout: z.string().refine(
      (value) => {
        const packageLayouts = import.meta.glob('../layouts/**/*.astro')
        const userLayouts = import.meta.glob('/src/layouts/**/*.astro')
        const mapBlockKeys = (blocks: any) =>
          mapKeys(blocks, (key: any) => key.split('/').pop().split('.').shift())
        const mergedLayoutComponents = {
          ...mapBlockKeys(packageLayouts),
          ...mapBlockKeys(userLayouts),
        }
        return mergedLayoutComponents[value] !== undefined
      },
      (value) => ({ message: `_layout: the layout "${value}" does not exist` })
    ),
    _preset: reference('presets'),
    _presets: reference('presets').array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
      .partial()
      .passthrough(),
    code: z
      .object({
        head: z.string(),
        body: z.string(),
      })
      .partial()
      .passthrough(),
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
    title: z.string(),
    description: z.string(),
    header: block.or(z.literal(false)),
    headers: block.array().or(z.literal(false)),
    hero: block.or(z.literal(false)),
    block: block.or(z.literal(false)),
    section: block.or(z.literal(false)),
    blocks: block.array().or(z.object({}).catchall(block)),
    sections: block.array().or(z.object({}).catchall(block)),
    cta: block.or(z.literal(false)),
    footer: block.or(z.literal(false)),
    footers: block.array().or(z.literal(false)),
    navigation: navigation.or(z.literal(false)),
  })
  .partial()
  .passthrough()
  .transform(async (data) => {
    const presetReferences = [
      { collection: 'presets', id: 'base' },
      data._preset ?? undefined,
      ...(data._presets ?? []),
    ].filter(Boolean)

    const presetEntries = await getEntries(presetReferences as any)
    let mergedData = {}
    presetEntries.forEach(
      (preset: any) => (mergedData = assign(mergedData, preset.data))
    )
    mergedData = assign(mergedData, data)
    return mergedData as typeof data
  })
