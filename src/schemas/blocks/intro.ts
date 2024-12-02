import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import { taglineSchema } from 'fulldev-ui/schemas/components/tagline'
import { paragraphSchema } from '../components/paragraph'

export const introSchema = z
  .object({
    tagline: taglineSchema.shape.text,
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    buttons: buttonSchema.array().optional(),
  })
  .strict()

export type IntroSchema = z.infer<typeof introSchema>
