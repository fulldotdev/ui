import { z } from 'astro:content'
import type Textarea from 'fulldev-ui/components/Textarea.astro'
import type { ComponentProps } from 'svelte'

export const textareaSchema = z
  .object({
    name: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    id: z.string().optional(),
    value: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    rows: z.number().optional(),
  })
  .strict() satisfies ComponentProps<typeof Textarea>
