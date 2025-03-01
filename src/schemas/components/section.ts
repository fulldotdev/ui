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
  collectionsSchema,
  contactSchema,
  contentSchema,
  ctaSchema,
  faqsSchema,
  featuresSchema,
  heroSchema,
  introSchema,
  articlesSchema,
  productsSchema,
  reviewsSchema,
  personsSchema,
  projectsSchema,
  pricingsSchema,
  pagesSchema,
])

export type SectionSchema = z.infer<typeof sectionSchema>
