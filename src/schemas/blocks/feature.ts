import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'
import { headingSchema } from '../components/heading'
import { paragraphSchema } from '../components/paragraph'
import { taglineSchema } from '../components/tagline'

export const featureSchema = z
  .object({
    tagline: taglineSchema.shape.text,
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type FeatureSchema = z.infer<typeof featureSchema>