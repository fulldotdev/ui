import type { CollectionEntry, CollectionKey } from 'astro:content'
import { flatten, unflatten } from 'flat'
import { get } from 'radash'
import { isString, mapValues } from 'remeda'

const getRef = (str: string) => str.split('.')[0].replace('$', '')
const getCollectionRef = (str: string) => getRef(str).split('/')[0]
const getEntryRef = (str: string) => getRef(str).split('/').slice(1).join('/')

export const transformReferences = (
  entry: CollectionEntry<CollectionKey>,
  allEntries: CollectionEntry<CollectionKey>[]
) => {
  const { id, slug, collection, data } = entry
  const flatData = flatten(data) as any
  const transformedData = mapValues(flatData, (value) => {
    if (!isString(value)) return value

    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart

      const isSelf = valuePart.startsWith('$self')
      const collectionRef = isSelf ? collection : getCollectionRef(valuePart)
      const entryRef = isSelf ? slug || id : getEntryRef(valuePart)
      const path = valuePart.split('.').slice(1).join('.')

      if (collectionRef && entryRef) {
        const found = allEntries.find(
          (e) =>
            e.collection === collectionRef &&
            (e.id === entryRef || e.slug === entryRef)
        )
        const result = get(found?.data, path)
        return result ? result : valuePart
      } else if (collectionRef) {
        const filtered = allEntries.filter(
          (e) => e.collection === collectionRef
        )
        const result = filtered?.map((entry: any) => get(entry?.data, path))
        return result ? result : valuePart
      }

      return valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    return transformedValueParts.join(' ')
  })
  const nestedData = unflatten(transformedData)
  return { ...entry, data: nestedData }
}
