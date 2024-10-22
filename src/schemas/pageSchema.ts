import { getEntries, getEntry, z } from 'astro:content'
import { assign } from 'radash'
import fulldevConfig from 'virtual:fulldev-ui/config'
import presetSchema from './presetSchema'
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
    let mergedData = {}

    if (fulldevConfig.basePreset) {
      const baseEntry = await getEntry('presets', fulldevConfig.basePreset)
      mergedData = assign(mergedData, baseEntry?.data || {})
    }

    if (presets) {
      const entries = await getEntries(presets)
      entries.forEach(
        (preset: any) => (mergedData = assign(mergedData, preset.data))
      )
    }

    mergedData = assign(mergedData, rest)
    return mergedData as typeof rest
  })

export default i18n.pipe(presets).pipe(presetSchema)
