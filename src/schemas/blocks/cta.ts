import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const ctaSchema = z
  .object({
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
  })
  .strict()

export type CtaSchema = z.infer<typeof ctaSchema>
