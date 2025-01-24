import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  })
  .strict()
