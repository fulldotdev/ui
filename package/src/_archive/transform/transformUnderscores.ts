// import { flatten, unflatten } from 'flat'
// import { isString } from 'radash'
// import { mapKeys } from 'remeda'

// export const transformUnderscores = (data: any): any => {
//   const flat: any = flatten(data)
//   const merged = mapKeys(flat, (key) => {
//     if (!isString(key)) return key
//     const parts = key.split('.')
//     const result = parts.map((part) => {
//       return part.replace(/^_+/, '')
//     })
//     const filtered = result.filter(Boolean)
//     const joined = filtered.join('.')
//     return joined
//   })
//   const nested = unflatten(merged)
//   return nested
// }
