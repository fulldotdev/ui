import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'

export const categorySingleSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type CategorySingleSchema = z.infer<typeof categorySingleSchema>
