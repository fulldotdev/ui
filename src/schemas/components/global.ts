import { z } from 'astro:content'

export const globalSchema = z
  .object({
    if: z.any(),
    theme: z.enum(['light', 'dark']).or(z.string()),
    color: z.enum(['base', 'brand']).or(z.string()),
    size: z.enum(['sm', 'md', 'lg']).or(z.string()).or(z.number()),
    contrast: z.boolean().optional(),
  })
  .partial()
  .passthrough()

export type GlobalSchema = z.infer<typeof globalSchema>

export default globalSchema
