import { collectionSelectionSchema } from '@/schemas/models/collectionSelection'
import { contactSchema } from '@/schemas/models/contact'
import { contentSchema } from '@/schemas/models/content'
import { ctaSchema } from '@/schemas/models/cta'
import { faqsSchema } from '@/schemas/models/faqs'
import { featuresSchema } from '@/schemas/models/features'
import { heroSchema } from '@/schemas/models/hero'
import { introSchema } from '@/schemas/models/intro'
import { postSelectionSchema } from '@/schemas/models/postSelection'
import { productSelectionSchema } from '@/schemas/models/productSelection'
import { reviewsSchema } from '@/schemas/models/reviews'
import { z } from 'astro:content'

export const sectionSchema = z.discriminatedUnion('type', [
  collectionSelectionSchema.extend({
    type: z.literal('CollectionSelection'),
  }),
  contactSchema.extend({
    type: z.literal('Contact'),
  }),
  contentSchema.extend({
    type: z.literal('Content'),
  }),
  ctaSchema.extend({
    type: z.literal('Cta'),
  }),
  faqsSchema.extend({
    type: z.literal('Faqs'),
  }),
  featuresSchema.extend({
    type: z.literal('Features'),
  }),
  heroSchema.extend({
    type: z.literal('Hero'),
  }),
  introSchema.extend({
    type: z.literal('Intro'),
  }),
  postSelectionSchema.extend({
    type: z.literal('PostSelection'),
  }),
  productSelectionSchema.extend({
    type: z.literal('ProductSelection'),
  }),
  reviewsSchema.extend({
    type: z.literal('Reviews'),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
