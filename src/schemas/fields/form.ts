import { z } from 'astro:content'

export const formSchema = z
  .object({
    action: z.string().optional(),
    fields: z
      .object({
        type: z.enum(['text', 'email', 'textarea', 'date', 'select']).optional(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.string().array().optional(),
        value: z.string().optional(),
        optional: z.boolean().optional(),
      })
      .strict()
      .array()
      .optional(),
    submit: z.string().optional(),
  })
  .strict()
