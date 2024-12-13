import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Badge from 'fulldev-ui/components/Badge.astro'

export const badgeSchema = z
  .object({
    icon: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Badge>>
