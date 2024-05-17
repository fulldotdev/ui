import type { CollectionEntry, CollectionKey } from 'astro:content'
import { flatten, unflatten } from 'flat'
import { isString, mapKeys } from 'remeda'

export const transformLayouts = (
  collectionEntries: CollectionEntry<CollectionKey>[]
) =>
  collectionEntries.map((entry) => {
    const flatData = flatten(entry.data) as any
    const transformedData = mapKeys(flatData, (key) => {
      if (!isString(key)) return key
      const parts = key.split('.')
      const result = parts.map((part) => {
        return part.replace(/^_+/, '')
      })
      const filtered = result.filter(Boolean)
      const joined = filtered.join('.')
      return joined
    })
    const nestedData = unflatten(transformedData)
    return { ...entry, data: nestedData }
  })
