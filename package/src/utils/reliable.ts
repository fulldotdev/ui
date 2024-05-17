import { flatten, unflatten } from 'flat'
import { get, isObject, mapEntries } from 'radash'
import { isArray, isString, mapKeys, mapValues } from 'remeda'

let hasMoreReferences = true

const replaceReferences = (data: any) => {
  const flat: any = flatten(data)
  const mapped = mapValues(flat, (value) => {
    if (!isString(value)) return value

    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart
      if (valuePart.startsWith('$self')) return valuePart

      hasMoreReferences = true

      const path = valuePart.replace('$', '')
      const got = get(data, path)

      return got ? got : valuePart
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
      return part.replace(/^_+/, '')
    })
    const filtered = result.filter(Boolean)
    const joined = filtered.join('.')
    return joined
  })
  return unflatten(mapped)
}

export const transformLayouts = (data: any): any => {
  if (!isObject(data) && !isArray(data)) return data

  const mapped = mapEntries(data, (key, value) => {
    const valueParts = (value as string).split(' ')
    const transformedValueParts = valueParts.map((valuePart) => {
      if (!valuePart.startsWith('$')) return valuePart
      const queryParts = valuePart.replace('$', '').split('.')

      const path = valuePart.replace('$', '')
      const got = get(data, path)

      return got ? got : valuePart
    })

    return [key, value]
  })

  const replacedReferences = replaceReferences(data)
  const replacedUnderscores = replaceUnderscores(replacedReferences)

  if (hasMoreReferences) {
    hasMoreReferences = false
    return transformLayouts(replacedUnderscores)
  }

  return replacedUnderscores
}
