import { buttonSchema } from '@/schemas/fields/button.ts'
import { z } from 'astro:content'

export const formSchema = z
  .object({
    action: z.string().optional(),
    fields: z
      .object({
        type: z.enum(['text', 'email', 'tel', 'password', 'number', 'textarea', 'file']).optional(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.string().array().optional(),
        value: z.string().optional(),
        required: z.boolean().optional(),
      })
      .strict()
      .array()
      .optional(),
    button: buttonSchema.optional(),
  })
  .strict()
