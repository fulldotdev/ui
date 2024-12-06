import { z } from 'astro:content'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import { paragraphSchema } from '../components/paragraph'
import { ratingSchema } from '../components/rating'
import { taglineSchema } from '../components/tagline'

export const reviewsSchema = z
  .object({
    tagline: taglineSchema.shape.text,
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    cards: z
      .object({
        rating: ratingSchema.shape.score,
        heading: headingSchema.shape.text,
        paragraph: paragraphSchema.shape.text,
      })
      .strict()
      .array()
      .optional(),
  })
  .strict()

export type ReviewsSchema = z.infer<typeof reviewsSchema>
