import { z } from 'astro:content'

export const iconSchema = z
  .object({
    name: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type IconSchema = z.infer<typeof iconSchema>
