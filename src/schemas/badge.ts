import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    icon: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  })
  .strict()
