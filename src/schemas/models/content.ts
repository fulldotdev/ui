import { buttonSchema } from '@/schemas/fields/button'
import { imageSchema } from '@/schemas/fields/image'
import { z } from 'astro:content'

export const contentSchema = z
  .object({
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type ContentSchema = z.infer<typeof contentSchema>
