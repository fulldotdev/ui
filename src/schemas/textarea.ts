import { z } from 'astro:content'

export const textareaSchema = z
  .object({
    label: z.string().optional(),
    placeholder: z.string().optional(),
    value: z.string().optional(),
  })
  .strict()
