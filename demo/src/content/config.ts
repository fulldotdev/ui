import { card, head, section, sections } from '@fulldevlabs/fullui'
import { defineCollection } from 'astro:content'
import { flatten } from 'flatten-anything'
import { merge } from 'merge-anything'
import { nestifyObject as nestify } from 'nestify-anything'
import { z } from 'zod'

const pagesSchema = z
  .object({
    ...section.shape,
    head,
    hero: section,
    card,
    sections,
    images: z.any(), // FIXME
    cta: section,
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

const morphedPagesSchema = z
  .any()
  .transform((value) => {
    let flat = flattenEverything(value)
    let combined = combineEverything(flat)
    let nested = nestifyEverything(combined)
    return nested
  })
  .pipe(pagesSchema)

const contentCollection = defineCollection({
  type: 'content',
  schema: morphedPagesSchema,
})

export const collections = {
  pages: contentCollection,
  categories: contentCollection,
  products: contentCollection,
  reviews: contentCollection,
  // posts: contentCollection,
  // forms: contentCollection,
  // policies: contentCollection,
}
