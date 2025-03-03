import { formSchema } from '@/schemas/components/form'
import { z } from 'astro:content'

export const contactSchema = z
  .object({
    align: z.enum(['start', 'center', 'end']),
    size: z.enum(['xs', 'sm', 'default', 'lg', 'xl', '2xl']),
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
