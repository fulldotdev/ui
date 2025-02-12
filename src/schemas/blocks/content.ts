import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'
import { imageSchema } from '../fields/image'

export const contentSchema = z
  .object({
    writeup: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type ContentSchema = z.infer<typeof contentSchema>
