import { articlesSchema } from '@/schemas/blocks/articles'
import { collectionsSchema } from '@/schemas/blocks/collections'
import { contactSchema } from '@/schemas/blocks/contact'
import { contentSchema } from '@/schemas/blocks/content'
import { ctaSchema } from '@/schemas/blocks/cta'
import { faqsSchema } from '@/schemas/blocks/faqs'
import { featuresSchema } from '@/schemas/blocks/features'
import { heroSchema } from '@/schemas/blocks/hero'
import { introSchema } from '@/schemas/blocks/intro'
import { pagesSchema } from '@/schemas/blocks/pages'
import { personsSchema } from '@/schemas/blocks/persons'
import { pricingsSchema } from '@/schemas/blocks/pricings'
import { productsSchema } from '@/schemas/blocks/products'
import { projectsSchema } from '@/schemas/blocks/projects'
import { reviewsSchema } from '@/schemas/blocks/reviews'
import { z } from 'astro:content'

export const sectionSchema = z.discriminatedUnion('type', [
  collectionsSchema.extend({
    type: z.literal('Collection'),
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
  articlesSchema.extend({
    type: z.literal('Articles'),
  }),
  productsSchema.extend({
    type: z.literal('Products'),
  }),
  reviewsSchema.extend({
    type: z.literal('Reviews'),
  }),
  personsSchema.extend({
    type: z.literal('Persons'),
  }),
  projectsSchema.extend({
    type: z.literal('Projects'),
  }),
  pricingsSchema.extend({
    type: z.literal('Pricings'),
  }),
  pagesSchema.extend({
    type: z.literal('Pages'),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
