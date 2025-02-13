import { reference, z } from 'astro:content'
import { categoryListSchema } from '../blocks/categoryList'
import { contactSchema } from '../blocks/contact'
import { contentSchema } from '../blocks/content'
import { ctaSchema } from '../blocks/cta'
import { faqsSchema } from '../blocks/faqs'
import { featuresSchema } from '../blocks/features'
import { heroSchema } from '../blocks/hero'
import { introSchema } from '../blocks/intro'
import { productListSchema } from '../blocks/productList'
import { reviewsSchema } from '../blocks/reviews'

export const sectionSchema = z.union([
  categoryListSchema.extend({
    block: z.string(),
    categories: reference('categories').array().optional(),
  }),
  contactSchema.extend({
    block: z.string(),
  }),
  contentSchema.extend({
    block: z.string(),
  }),
  ctaSchema.extend({
    block: z.string(),
  }),
  faqsSchema.extend({
    block: z.string(),
  }),
  featuresSchema.extend({
    block: z.string(),
  }),
  heroSchema.extend({
    block: z.string(),
  }),
  introSchema.extend({
    block: z.string(),
  }),
  productListSchema.extend({
    block: z.string(),
    products: reference('products').array().optional(),
  }),
  reviewsSchema.extend({
    block: z.string(),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
