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
    variant: z.number().default(1),
  }),
  contactSchema.extend({
    type: z.literal('Contact'),
    variant: z.number().default(1),
  }),
  contentSchema.extend({
    type: z.literal('Content'),
    variant: z.number().default(1),
  }),
  ctaSchema.extend({
    type: z.literal('Cta'),
    variant: z.number().default(1),
  }),
  faqsSchema.extend({
    type: z.literal('Faqs'),
    variant: z.number().default(1),
  }),
  featuresSchema.extend({
    type: z.literal('Features'),
    variant: z.number().default(1),
  }),
  heroSchema.extend({
    type: z.literal('Hero'),
    variant: z.number().default(1),
  }),
  introSchema.extend({
    type: z.literal('Intro'),
    variant: z.number().default(1),
  }),
  postSelectionSchema.extend({
    type: z.literal('PostSelection'),
    variant: z.number().default(1),
  }),
  productSelectionSchema.extend({
    type: z.literal('ProductSelection'),
    variant: z.number().default(1),
  }),
  reviewsSchema.extend({
    type: z.literal('Reviews'),
    variant: z.number().default(1),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
