import { defineCollection, z } from 'astro:content'
import { flatten } from 'flatten-anything'
import { merge } from 'merge-anything'
import { nestifyObject } from 'nestify-anything'

const pagesSchema = z.object({
  head: z
    .object({
      title: z.string().nullish(),
      description: z.string().nullish(),
    })
    .nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
})

const mergeUnderscore = (value: object) => {
  const flat: any = flatten(value)
  const merged: any = {}

  for (const key in flat) {
    const strippedKey: any = key.toString().replace(/_/g, '')

    if (merged[strippedKey] === undefined) merged[strippedKey] = flat[key]
    else merged[strippedKey] = merge(merged[strippedKey], flat[key])
  }

  return nestifyObject(merged)
}

const morphedPagesSchema = z
  .any()
  .transform((val) => {
    return mergeUnderscore(val)
  })
  .pipe(pagesSchema)

const pages = defineCollection({
  type: 'content',
  schema: morphedPagesSchema,
})

export const collections = { pages }
