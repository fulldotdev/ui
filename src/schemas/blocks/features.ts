import { z } from 'astro:content'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import { iconSchema } from '../components/icon'
import { paragraphSchema } from '../components/paragraph'
import { taglineSchema } from '../components/tagline'

export const featuresSchema = z
  .object({
    tagline: taglineSchema.shape.text,
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    cards: z
      .object({
        icon: iconSchema.shape.name,
        heading: headingSchema.shape.text,
        paragraph: paragraphSchema.shape.text,
      })
      .strict()
      .array()
      .optional(),
  })
  .strict()

export type FeaturesSchema = z.infer<typeof featuresSchema>
