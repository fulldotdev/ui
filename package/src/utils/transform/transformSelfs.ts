import { flatten, unflatten } from 'flat'
import { camel, get, isString, mapValues } from 'radash'

export const transformSelfs = (data: any): any => {
  const flat = flatten(data) as any
  const mapped = mapValues(flat, (value) => {
    if (!isString(value)) return value
    const parts = (value as string).split(' ')
    const result = parts.map((part) => {
      if (!part.startsWith('$self')) return part
      const pathParts = part.split('.').slice(1)
      const camelCased = pathParts.map((part) => camel(part))
      const path = 'data.' + camelCased.join('.')
      const result = get(data, path)
      console.log({
        part,
        pathParts,
        camelCased,
        path,
        result,
      })
      return result ? result : part
    })
    return result.join(' ')
  })
  return unflatten(mapped)
}
