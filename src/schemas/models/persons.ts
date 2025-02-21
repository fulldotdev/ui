import { z } from 'astro:content'
import { imageSchema } from '../fields/image'

export const personsSchema = z
  .object({
    writeup: z.string().nullish(),
    persons: z
      .object({
        image: imageSchema.nullish(),
        title: z.string().nullish(),
        description: z.string().nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()

export type PersonsSchema = z.infer<typeof personsSchema>

