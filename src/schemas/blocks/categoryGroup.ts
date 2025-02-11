import { z } from 'astro:content'
import { categorySingleSchema } from './categorySingle'

export const categoryGroupSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    categories: categorySingleSchema
      .extend({
        href: z.string(),
      })
      .array()
      .optional(),
  })
  .strict()

export type CategoryGroupSchema = z.infer<typeof categoryGroupSchema>
