import { buttonSchema } from '@/schemas/fields/button'
import { reference, z } from 'astro:content'

export const collectionSelectionSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    collections: reference('collections').array().nullish(),
  })
  .strict()

export type CollectionSelectionSchema = z.infer<
  typeof collectionSelectionSchema
>
