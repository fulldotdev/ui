import { flatten, unflatten } from 'flat'
import { get } from 'radash'
import { isString, mapValues } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'

export const transformSelfs = (collectionCascade: CollectionCascade) => {
  const flat: any = flatten(collectionCascade)
  const transformed = mapValues(flat, (value, key) => {
    if (!isString(value)) return [value]
    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$self')) return valuePart

      const self = key.split('.').slice(0, 2).join('.')
      const path = valuePart.replace('$self.', '')
      const got = get(collectionCascade, `${self}.${path}`)

      return got ? got : valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    return transformedValueParts.join(' ')
  })
  const nested = unflatten(transformed)
  return nested
}
