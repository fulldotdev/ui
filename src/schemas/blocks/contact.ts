import { formSchema } from '@/schemas/components/form'
import { z } from 'astro:content'

export const contactSchema = z
  .object({
    writeup: z.string().nullish(),
    channels: z
      .object({
        href: z.string().nullish(),
        icon: z.string().nullish(),
        title: z.string().nullish(),
        description: z.string().nullish(),
      })
      .strict()
      .array()
      .nullish(),
    form: formSchema.nullish(),
  })
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
