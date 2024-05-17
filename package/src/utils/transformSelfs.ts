import { flatten, unflatten } from 'flat'
import { get } from 'radash'
import { isString, mapValues } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'

// TODO does REALLY look for self. So it's dependant on which data  is passed. Is it a entry or a field in a entry?
// = prone to bugs
export const transformSelfs = (data: any, cascade: CollectionCascade) => {
  if (!data) return data
  const flat: any = flatten(data)
  const transformed = mapValues(flat, (value, key) => {
    if (!isString(value)) return [value]
    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$self')) return valuePart

      const self = key.split('.').slice(0, 2).join('.')
      const path = valuePart.replace('$self.', '')
      const query = `${self}.${path}`
      const got = get(cascade, query)

      return got ? got : valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    return transformedValueParts.join(' ')
  })
  const nested = unflatten(transformed)
  return nested
}
