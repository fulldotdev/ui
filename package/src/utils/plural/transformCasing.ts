import type { CollectionEntry, CollectionKey } from 'astro:content'
import { flatten, unflatten } from 'flat'
import { camel } from 'radash'
import { isString, mapKeys } from 'remeda'

export const transformCasing = (
  collectionEntries: CollectionEntry<CollectionKey>[]
) =>
  collectionEntries.map((entry) => {
    const flatData = flatten(entry.data) as any
    const transformedData = mapKeys(flatData, (key) => {
      if (!isString(key)) return key
      const parts = (key as string).split('.')
      const result = parts.map((part) => camel(part))
      return result.join('.')
    })
    const nestedData = unflatten(transformedData)
    return { ...entry, data: nestedData }
  })
