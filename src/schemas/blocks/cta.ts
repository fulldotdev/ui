import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'

export const ctaSchema = z
  .object({
    writeup: z.string().optional(),
    buttons: buttonSchema.array().optional(),
  })
  .strict()

export type CtaSchema = z.infer<typeof ctaSchema>
