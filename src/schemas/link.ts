import { z } from 'astro:content'

export const linkSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'underline', 'muted']).optional(),
  })
  .strict()
