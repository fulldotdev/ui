import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Textarea from 'fulldev-ui/components/Textarea.astro'

export const textareaSchema = z
  .object({
    label: z.string().optional(),
    placeholder: z.string().optional(),
    value: z.string().optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Textarea>>
