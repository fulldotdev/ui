import { z } from 'astro:content'

export const formSchema = z
  .object({
    action: z.string().nullish(),
    fields: z
      .object({
        type: z.enum(['text', 'email', 'textarea', 'date', 'select']).nullish(),
        label: z.string().nullish(),
        placeholder: z.string().nullish(),
        options: z.string().array().nullish(),
        value: z.string().nullish(),
        nullish: z.boolean().nullish(),
      })
      .strict()
      .array()
      .nullish(),
    submit: z.string().nullish(),
  })
  .strict()
