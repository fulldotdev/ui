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
  articlesSchema.extend({
    type: z.literal('Articles'),
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
