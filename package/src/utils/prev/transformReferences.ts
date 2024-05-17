import { flatten, unflatten } from 'flat'
import { get } from 'radash'
import { isString, mapValues } from 'remeda'
import type { CollectionCascade } from '../getCollectionCascade'

export const transformReferences = (collectionCascade: CollectionCascade) => {
  let flat: any = flatten(collectionCascade)
  let transformed: any

  let hasUnresolvedReferences = true
  while (hasUnresolvedReferences) {
    hasUnresolvedReferences = false

    transformed = mapValues(flat, (value) => {
      if (!isString(value)) return value
      const valueParts = (value as string).split(' ')
      const transformedValueParts = valueParts.map((valuePart) => {
        if (!valuePart.startsWith('$')) return valuePart
        if (valuePart.startsWith('$self')) return valuePart

        const path = valuePart.replace('$', '')
        const got = get(collectionCascade, path)

        if (got) {
          hasUnresolvedReferences = true
          return got
        }

        return valuePart
      })

      if (transformedValueParts.length == 1) return transformedValueParts[0]
      return transformedValueParts.join(' ')
    })

    flat = flatten(unflatten(transformed))
  }

  const nested = unflatten(transformed)
  return nested
}

// export const transformReferences = (collectionCascade: CollectionCascade) => {
//   const flat: any = flatten(collectionCascade)
//   const transformed = mapValues(flat, (value, key) => {
//     if (!isString(value)) return value
//     const valueParts = (value as string).split(' ')

//     if (valueParts.length == 1) {
//       if (value.startsWith('$self')) {
//         const self = key.split('.').slice(0, 2).join('.')
//         const path = value.replace('$self.', '')
//         const newPath = `@self.${self}.${path}`
//         return newPath
//       } else if (value.startsWith('$')) {
//         const path = value.replace('$', '')
//         const newPath = `@self.${path}`
//         return newPath
//       }
//     }

//     if (valueParts.length > 1) {
//       const transformedValueParts = valueParts.map((valuePart) => {
//         if (valuePart.startsWith('$self')) {
//           const self = key.split('.').slice(0, 2).join('.')
//           const path = valuePart.replace('$self.', '')
//           const newPath = `{{ ${self}.${path} }}`
//           return newPath
//         } else if (valuePart.startsWith('$')) {
//           const path = valuePart.replace('$', '')
//           const newPath = `{{ ${path} }}`
//           return newPath
//         }
//         return valuePart
//       })
//       return transformedValueParts.join(' ')
//     }

//     return value
//   })

//   const jsonCascadeTransformed = JSON.stringify(transformed)
//   const result = jsonplus.parse(jsonCascadeTransformed)
//   const nested = unflatten(result)

//   return nested
// }

// export const transformReferences = (collectionCascade: CollectionCascade) => {
//   const flat: any = flatten(collectionCascade)
//   const transformed = mapValues(flat, (value) => {
//     if (!isString(value)) return value
//     const valueParts = (value as string).split(' ')
//     const transformedValueParts = valueParts.map((valuePart) => {
//       if (!valuePart.startsWith('$')) return valuePart
//       if (valuePart.startsWith('$self')) return valuePart

//       const path = valuePart.replace('$', '')
//       const got = get(collectionCascade, path)

//       return got ? got : valuePart
//     })

//     if (transformedValueParts.length == 1) return transformedValueParts[0]
//     return transformedValueParts.join(' ')
//   })
//   const nested = unflatten(transformed)
//   return nested
// }

// export const transformReferences = (collectionCascade: CollectionCascade) => {
//   const flat: any = flatten(collectionCascade)
//   const transformed = mapValues(flat, (value) => {
//     if (!isString(value)) return value
//     const valueParts = (value as string).split(' ')
//     const transformedValueParts = valueParts.map((valuePart) => {
//       if (!valuePart.startsWith('$')) return valuePart
//       if (valuePart.startsWith('$self')) return valuePart

//       const path = valuePart.replace('$', '')
//       const got = get(collectionCascade, path)

//       return got ? got : valuePart
//     })

//     if (transformedValueParts.length == 1) return transformedValueParts[0]
//     return transformedValueParts.join(' ')
//   })
//   const nested = unflatten(transformed)
//   return nested
// }
