// import { getCollection, getEntry, type CollectionKey } from 'astro:content'
// import { flatten, unflatten } from 'flat'
// import { all, get, isString, mapValues } from 'radash'
// import { getPathname } from '../getPathname'
// import { transform } from './transform'

// export const transformReferences = async (data: object): Promise<any> => {
//   const flat = flatten(data)
//   const mappedValues = await all(
//     mapValues(flat as any, async (value) => {
//       if (!isString(value)) return value
//       const parts = (value as string).split(' ')
//       const mappedParts = await all(
//         parts.map(async (valuePart) => {
//           if (!valuePart.startsWith('$/')) return valuePart

//           const reference = valuePart.split('.')[0].replace('$/', '')
//           const collection = reference.split('/')[0]
//           const slug = reference.split('/').slice(1).join('/')
//           const path = valuePart.split('.').slice(1).join('.')

//           if (collection && slug) {
//             let response = await getEntry(collection as CollectionKey, slug)
//             if (!response)
//               throw new Error(`Entry not found: ${collection}/${slug}`)
//             const transformed = await transform(response as any)
//             const result = get(transformed?.data, path)
//             if (!path)
//               return {
//                 ...transformed?.data,
//                 pathname: getPathname(transformed),
//               }
//             return result ? result : valuePart
//           } else if (collection) {
//             const response = await getCollection(collection as CollectionKey)
//             if (!response)
//               throw new Error(`Entry not found: ${collection}/${slug}`)
//             const mapped = response?.map(async (entry: any) => {
//               const transformed = await transform(entry?.data)
//               return get(transformed, path)
//             })
//             const result = await all(mapped)
//             return result ? result : valuePart
//           }

//           return valuePart
//         })
//       )
//       if (mappedParts.length == 1) return mappedParts[0]
//       else return mappedParts.join(' ')
//     })
//   )
//   return unflatten(mappedValues)
// }
