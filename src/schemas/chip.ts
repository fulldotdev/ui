import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Chip from 'fulldev-ui/components/Chip.astro'

export const chipSchema = z
  .object({
    icon: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Chip>>
