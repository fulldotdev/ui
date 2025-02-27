import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const personSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type PersonSchema = z.infer<typeof personSchema>
