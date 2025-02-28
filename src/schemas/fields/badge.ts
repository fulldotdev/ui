import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    text: z.string().nullish(),
    href: z.string().nullish(),
    variant: z
      .enum(['default', 'secondary', 'destructive', 'outline'])
      .nullish(),
  })
  .strict()

export type BadgeSchema = z.infer<typeof badgeSchema>
