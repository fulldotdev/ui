import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import Input from 'fulldev-ui/components/Input.astro'

export const inputSchema = z
  .object({
    icon: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    value: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Input>>
