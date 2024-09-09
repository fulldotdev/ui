import { getEntry } from 'astro:content'
import { assign } from 'radash'

export const mergeEntries = async (entry: any) => {
  if (!entry) return entry
  const { data, slug } = entry
  const baseSettings = await getEntry('settings', 'base')
  const enSettings = await getEntry('settings', 'en')
  const deSettings = await getEntry('settings', 'de')
  const frSettings = await getEntry('settings', 'fr')
  const pageSettings = data.settings && (await getEntry(data.settings))
  const i18nSettings = data.i18n && (await getEntry(data.i18n))

  let merged = {}
  merged = assign(merged, baseSettings?.data ?? {})
  slug?.startsWith('en') && (merged = assign(merged, enSettings?.data ?? {}))
  slug?.startsWith('de') && (merged = assign(merged, deSettings?.data ?? {}))
  slug?.startsWith('fr') && (merged = assign(merged, frSettings?.data ?? {}))
  merged = assign(merged, i18nSettings?.data ?? {})
  merged = assign(merged, pageSettings?.data ?? {})
  merged = assign(merged, data)

  const newEntry = {
    ...entry,
    data: merged,
  }
  return newEntry
}
