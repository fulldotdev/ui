import { z } from 'astro:content'

export const inputSchema = z
  .object({
    icon: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    value: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  })
  .strict()
