import { head } from '@fulldevlabs/fullui/src/components/Head.astro'
import { sections } from '@fulldevlabs/fullui/src/components/Sections.astro'
import { defineCollection, z } from 'astro:content'
import { flatten } from 'flatten-anything'
import { merge } from 'merge-anything'
import { nestifyObject as nestify } from 'nestify-anything'

const pagesSchema = z
  .object({
    head,
    title: z.string().nullish(),
    description: z.string().nullish(),
    sections,
  })
  .partial()

// Makes a function recursive, so it works with arrays of objects
const recursive =
  (transformation: any) =>
  (value: any): any => {
    if (Array.isArray(value)) return value.map(recursive(transformation))
    else if (typeof value === 'object' && value !== null) {
      const transformedObject = transformation(value)
      Object.keys(transformedObject).forEach((key) => {
        transformedObject[key] = recursive(transformation)(
          transformedObject[key]
        )
      })
      return transformedObject
    }
    return value
  }

// combines keys with underscore with their non-underscored counterpart
const combine = (value: any) => {
  const merged: any = {}
  for (const key in value) {
    const strippedKey: any = key.toString().replace(/_/g, '')
    if (merged[strippedKey] === undefined) merged[strippedKey] = value[key]
    else merged[strippedKey] = merge(merged[strippedKey], value[key])
  }
  return merged
}

const flattenEverything = recursive(flatten)
const combineEverything = recursive(combine)
const nestifyEverything = recursive(nestify)

// combines both wihin an object and within arrays
// const combineEverything = (value: any): any => {
//   if (Array.isArray(value)) return value.map(combineEverything)
//   else if (typeof value === 'object' && value !== null) {
//     const combinedObject: any = combine(value)
//     Object.keys(combinedObject).forEach((key) => {
//       combinedObject[key] = combineEverything(combinedObject[key])
//     })
//     return combinedObject
//   }
//   return value
// }

// // flattens both object and object within arrays
// const flattenEverything = (value: any): any => {
//   if (Array.isArray(value)) return value.map(flattenEverything)
//   else if (typeof value === 'object' && value !== null) {
//     const flatObject: any = flatten(value)
//     Object.keys(flatObject).forEach((key) => {
//       flatObject[key] = flattenEverything(flatObject[key])
//     })
//     return flatObject
//   }
//   return value
// }

// // nests both within an object and within arrays
// const nestifyEverything = (value: any): any => {
//   if (Array.isArray(value)) return value.map(nestifyEverything)
//   else if (typeof value === 'object' && value !== null) {
//     const nestedObject: any = nestify(value)
//     Object.keys(nestedObject).forEach((key) => {
//       nestedObject[key] = nestifyEverything(nestedObject[key])
//     })
//     return nestedObject
//   }
//   return value
// }

const morphedPagesSchema = z
  .any()
  .transform((value) => {
    let flat = flattenEverything(value)
    console.log('flat', JSON.stringify(flat, null, 2))
    let combined = combineEverything(flat)
    console.log('combined', JSON.stringify(combined, null, 2))
    let nested = nestifyEverything(combined)
    console.log('nested', JSON.stringify(nested, null, 2))
    return nested
  })
  .pipe(pagesSchema)

const pages = defineCollection({
  type: 'content',
  schema: morphedPagesSchema,
})

export const collections = { pages }
