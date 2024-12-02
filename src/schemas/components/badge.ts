import { z } from 'astro:content'
import { iconSchema } from './icon'

export const badgeSchema = z
  .object({
    icon: iconSchema.optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z
      .enum(['primary', 'secondary', 'outline', 'ghost'])
      .default('outline')
      .optional(),
  })
  .strict()

export type BadgeSchema = z.infer<typeof badgeSchema>
