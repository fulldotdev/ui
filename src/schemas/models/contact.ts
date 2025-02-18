import { formSchema } from '@/schemas/fields/form'
import { linkSchema } from '@/schemas/fields/link'
import { z } from 'astro:content'

export const contactSchema = z
  .object({
    writeup: z.string().nullish(),
    channels: linkSchema.array().nullish(),
    socials: z.string().array().nullish(),
    form: formSchema.nullish(),
  })
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
