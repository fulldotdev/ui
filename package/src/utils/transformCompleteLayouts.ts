import { flatten, unflatten } from 'flat'
import { get, isObject } from 'radash'
import { isArray, isString, mapKeys, mapValues } from 'remeda'
import type { CollectionCascade } from './getCollectionCascade'

const replaceReferences = (data: any, cascade: CollectionCascade) => {
  const flat: any = flatten(cascade)
  const mapped = mapValues(flat, (value) => {
    if (!isString(value)) return value

    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart
      if (valuePart.startsWith('$self')) return valuePart

      const path = valuePart.replace('$', '')
      const got = get(cascade, path)
      const transformed = transformLayouts(got, cascade)

      return transformed ? transformed : valuePart
    })

    if (transformedValueParts.length == 1) return transformedValueParts[0]
    else return transformedValueParts.join(' ')
  })
  return unflatten(mapped)
}

const replaceUnderscores = (data: any) => {
  const flat = flatten(data)
  const mapped = mapKeys(flat, (key) => {
    if (!isString(key)) return key
    const parts = (key as string).split('.')
    const result = parts.map((part) => {
      return part.replace(/^_+/, 'TEST')
    })
    const filtered = result.filter(Boolean)
    const joined = filtered.join('.')
    return joined
  })
  return unflatten(mapped)
}

export const transformLayouts = (
  data: any,
  cascade: CollectionCascade
): any => {
  if (!isObject(data) && !isArray(data)) return data
  console.log('data', data)

  const replacedReferences = replaceReferences(data, cascade)
  console.log('replacedReferences', replacedReferences)

  const replacedUnderscores = replaceUnderscores(replacedReferences)
  console.log('replacedUnderscores', replacedUnderscores)

  return replacedUnderscores
}
