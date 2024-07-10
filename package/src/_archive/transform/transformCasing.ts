// import { flatten, unflatten } from 'flat'
// import { camel, isObject } from 'radash'
// import { isArray, isString, mapKeys } from 'remeda'

// export const transformCasing = (data: any) => {
//   if (!isObject(data) && !isArray(data)) return data

//   const flat: any = flatten(data)
//   const transformedData = mapKeys(flat, (key) => {
//     if (!isString(key)) return key
//     const parts = (key as string).split('.')
//     const result = parts.map((part) => {
//       const leadingUnderscores = part.match(/^_+/) || ['']
//       const withoutLeadingUnderscores = part.replace(/^_+/, '')
//       const camelCased = camel(withoutLeadingUnderscores)
//       const result = leadingUnderscores + camelCased
//       return result
//     })
//     return result.join('.')
//   })

//   const nested = unflatten(transformedData)
//   return nested
// }
