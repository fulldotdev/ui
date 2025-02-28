import { buttonSchema } from '@/schemas/fields/button'
import { pathSchema } from '@/schemas/fields/path'
import { z } from 'astro:content'

export const collectionsSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    collections: pathSchema('collections').array().nullish(),
  })
  .strict()

export type CollectionsSchema = z.infer<typeof collectionsSchema>
