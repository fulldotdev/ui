import { formSchema } from '@/schemas/components/form'
import { z } from 'astro:content'

export const contactSchema = z
  .object({
    type: z.literal('Contact').default('Contact'),
    content: z.string(),
    channels: z
      .object({
        href: z.string(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict()
      .array(),
    form: formSchema,
  })
  .partial()
  .strict()
