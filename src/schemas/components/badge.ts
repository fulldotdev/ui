import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    variant: z.enum(['default', 'secondary', 'destructive', 'outline']),
  })
  .partial()
  .strict()

export type BadgeSchema = z.infer<typeof badgeSchema>
