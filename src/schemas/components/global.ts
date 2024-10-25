import { z } from 'astro:content'

export const globalSchema = z
  .object({
    if: z.any(),
    theme: z.enum(['light', 'dark']),
    color: z.enum(['base', 'brand']),
    size: z.enum(['sm', 'md', 'lg']),
    contrast: z.boolean(),
  })
  .partial()
  .passthrough()

export type GlobalSchema = z.infer<typeof globalSchema>

export default globalSchema
