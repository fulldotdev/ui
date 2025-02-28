import { imageSchema } from '@/schemas/fields/image'
import { z } from 'astro:content'

export const projectSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type ProjectSchema = z.infer<typeof projectSchema>
