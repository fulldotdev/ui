import { flatten, unflatten } from 'flat'
import { isString, mapValues } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'
import { queryCascade } from './queryCascade'

// TODO recursively uses queryCascade, so maybe this belongs within this code.
export const transformReferences = (
  object: any,
  cascade: CollectionCascade
) => {
  if (!object) return object
  const flat: any = flatten(object)
  const transformed = mapValues(flat, (value) => {
    if (!isString(value)) return value
    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart
      if (valuePart.startsWith('$self')) return valuePart

      const path = valuePart.replace('$', '')
      const queried = queryCascade(cascade, path)

      return queried ? queried : valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    return transformedValueParts.join(' ')
  })
  const nested = unflatten(transformed)
  return nested
}
