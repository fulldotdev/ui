import { z } from 'astro:content'

export const badgeSchema = z
  .object({
    icon: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z
      .enum(['primary', 'secondary', 'outline', 'ghost'])
      .default('outline')
      .optional(),
  })
  .strict()

export type BadgeSchema = z.infer<typeof badgeSchema>
