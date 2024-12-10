import { z } from 'astro:content'

export const listSchema = z
  .object({
    items: z.string().array().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    muted: z.boolean().optional(),
  })
  .strict()

export type ListSchema = z.infer<typeof listSchema>
