import { buttonSchema } from '@/schemas/fields/button'
import { reference, z } from 'astro:content'

export const collectionsSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    collections: reference('collections').array().nullish(),
  })
  .strict()

export type CollectionsSchema = z.infer<typeof collectionsSchema>
