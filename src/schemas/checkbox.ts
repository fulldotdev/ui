import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Checkbox from 'fulldev-ui/components/Checkbox.astro'

export const checkboxSchema = z
  .object({
    name: z.string().optional(),
    label: z.string().optional(),
    id: z.string().optional(),
    value: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Checkbox>>
