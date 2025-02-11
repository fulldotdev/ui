import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/fields/button.ts'

export const ctaSchema = z
  .object({
    writeup: z.string().optional(),
    buttons: buttonSchema.array().optional(),
  })
  .strict()

export type CtaSchema = z.infer<typeof ctaSchema>
