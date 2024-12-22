import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import Link from 'fulldev-ui/components/Link.astro'

export const linkSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'underline', 'muted']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Link>>
