import { flatten } from 'flatten-anything'
import { merge } from 'merge-anything'
import { nestifyObject as nestify } from 'nestify-anything'
import { z } from 'zod'
import { cardSchema } from '../components/Card.astro'
import { headSchema } from '../components/Head.astro'
import { headerSchema } from '../components/Header.astro'
import { sectionSchema } from '../components/Section.astro'
import { sectionGroupSchema } from '../components/SectionGroup.astro'

export const pageSchema = z
  .object({
    head: headSchema,
    header: headerSchema,
    ...sectionSchema.shape,
    hero: sectionSchema,
    sectionGroup: sectionGroupSchema,
    cta: sectionSchema,
    card: cardSchema,
  })
  .partial()

// Makes a function recursive, so it works with arrays of objects
const recursive =
  (transformation: any) =>
  (data: any): any => {
    if (Array.isArray(data)) return data.map(recursive(transformation))
    else if (typeof data === 'object' && data !== null) {
      const transformedObject = transformation(data)
      Object.keys(transformedObject).forEach((key) => {
        transformedObject[key] = recursive(transformation)(
          transformedObject[key]
        )
      })
      return transformedObject
    }
    return data
  }

// combines keys with underscore with their non-underscored counterpart
const combine = (data: any) => {
  const merged: any = {}
  for (const key in data) {
    const strippedKey: any = key.toString().replace(/_/g, '')
    if (merged[strippedKey] === undefined) merged[strippedKey] = data[key]
    else merged[strippedKey] = merge(merged[strippedKey], data[key])
  }
  return merged
}

const flattenEverything = recursive(flatten)
const combineEverything = recursive(combine)
const nestifyEverything = recursive(nestify)

export const morphedPageSchema = z
  .any()
  .transform(async (data) => {
    const flat = flattenEverything(data)
    const combined = combineEverything(flat)
    const nested = nestifyEverything(combined)
    return nested
  })
  .pipe(pageSchema)

export const morphedPageSchemaWithLayouts = (
  getEntry: any,
  collection: string
) =>
  morphedPageSchema
    .transform(async (data) => {
      const baseLayout = await getEntry('layouts', 'index')
      const collectionLayout = await getEntry('layouts', collection)
      const merged = merge(baseLayout?.data, collectionLayout?.data, data)
      return merged
    })
    .pipe(pageSchema)
