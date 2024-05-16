import { flatten, unflatten } from 'flat'
import { get } from 'radash'
import { isString, mapValues } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'

export const transformReferences = (collectionCascade: CollectionCascade) => {
  const flat: any = flatten(collectionCascade)
  const transformed = mapValues(flat, (value) => {
    if (!isString(value)) return value
    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart
      if (valuePart.startsWith('$self')) return valuePart

      const path = valuePart.replace('$', '')
      const got = get(collectionCascade, path)

      return got ? got : valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    return transformedValueParts.join(' ')
  })
  const nested = unflatten(transformed)
  return nested
}
