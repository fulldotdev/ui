import { collectionsSchema } from '@/schemas/models/collections'
import { contactSchema } from '@/schemas/models/contact'
import { contentSchema } from '@/schemas/models/content'
import { ctaSchema } from '@/schemas/models/cta'
import { faqsSchema } from '@/schemas/models/faqs'
import { featuresSchema } from '@/schemas/models/features'
import { heroSchema } from '@/schemas/models/hero'
import { introSchema } from '@/schemas/models/intro'
import { pagesSchema } from '@/schemas/models/pages'
import { personsSchema } from '@/schemas/models/persons'
import { postsSchema } from '@/schemas/models/posts'
import { pricingsSchema } from '@/schemas/models/pricings'
import { productsSchema } from '@/schemas/models/products'
import { projectsSchema } from '@/schemas/models/projects'
import { reviewsSchema } from '@/schemas/models/reviews'
import { z } from 'astro:content'

export const sectionSchema = z.discriminatedUnion('type', [
  collectionsSchema.extend({
    type: z.literal('Collections'),
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
  postsSchema.extend({
    type: z.literal('Posts'),
    variant: z.number().default(1),
  }),
  productsSchema.extend({
    type: z.literal('Products'),
    variant: z.number().default(1),
  }),
  reviewsSchema.extend({
    type: z.literal('Reviews'),
    variant: z.number().default(1),
  }),
  personsSchema.extend({
    type: z.literal('Persons'),
    variant: z.number().default(1),
  }),
  projectsSchema.extend({
    type: z.literal('Projects'),
    variant: z.number().default(1),
  }),
  pricingsSchema.extend({
    type: z.literal('Pricings'),
    variant: z.number().default(1),
  }),
  pagesSchema.extend({
    type: z.literal('Pages'),
    variant: z.number().default(1),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
