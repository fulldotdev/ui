import { flatten } from 'flatten-anything'
import { merge } from 'merge-anything'
import { nestifyObject as nestify } from 'nestify-anything'
import { z } from 'zod'
import { card } from '../components/Card.astro'
import { head } from '../components/Head.astro'
import { header } from '../components/Header.astro'
import { section } from '../components/Section.astro'
import { sections } from '../components/Sections.astro'

export const entrySchema = z
  .object({
    head,
    header,
    ...section.shape,
    hero: section,
    sections,
    cta: section,
    card,
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

// Adds corresponding layout data to the entry data
const withLayouts = async (data: any, layoutsCollection?: any) => {
  if (!layoutsCollection) return data
  const baseLayoutData = layoutsCollection.find(
    (layout: any) => layout.slug === 'index'
  )
  const collectionLayoutData = layoutsCollection.find(
    (layout: any) => layout.slug === 'collection'
  )
  const mergedData = merge(
    baseLayoutData,
    collectionLayoutData,
    layoutsCollection
  )
  return mergedData
}

const flattenEverything = recursive(flatten)
const combineEverything = recursive(combine)
const nestifyEverything = recursive(nestify)

export const morphedEntrySchema = (layoutsCollection?: any) =>
  z
    .any()
    .transform(async (data) => {
      const flat = flattenEverything(data)
      const combined = combineEverything(flat)
      const nested = nestifyEverything(combined)
      const merged = await withLayouts(nested, layoutsCollection)
      return merged
    })
    .pipe(entrySchema)
