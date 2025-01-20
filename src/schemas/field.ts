import { z } from 'astro:content'

export const fieldSchema = z
  .object({
    type: z
      .enum(['text', 'email', 'tel', 'password', 'number', 'textarea'])
      .optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    value: z.string().optional(),
    required: z.boolean().optional(),
    disabled: z.boolean().optional(),
  })
  .strict()
