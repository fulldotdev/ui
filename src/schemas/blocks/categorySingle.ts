import { imageSchema } from '@/schemas/fields/image'
import { z } from 'astro:content'

export const categorySingleSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type CategorySingleSchema = z.infer<typeof categorySingleSchema>
