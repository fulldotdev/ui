import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
  })
  .strict()
