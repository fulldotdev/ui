import { z } from 'astro:content'
import { categoryGroupSchema } from '../blocks/categoryGroup'
import { categoryListSchema } from '../blocks/categoryList'
import { contactSchema } from '../blocks/contact'
import { contentSchema } from '../blocks/content'
import { ctaSchema } from '../blocks/cta'
import { faqsSchema } from '../blocks/faqs'
import { featuresSchema } from '../blocks/features'
import { footerSchema } from '../blocks/footer'
import { headerSchema } from '../blocks/header'
import { heroSchema } from '../blocks/hero'
import { introSchema } from '../blocks/intro'
import { postSingleSchema } from '../blocks/postSingle'
import { productGroupSchema } from '../blocks/productGroup'
import { productListSchema } from '../blocks/productList'
import { productSingleSchema } from '../blocks/productSingle'
import { reviewsSchema } from '../blocks/reviews'

// export const blockSchema = z
//   .object({
//     title: z.string().optional(),
//     description: z.string().optional(),
//     categories: categorySingleSchema
//       .extend({
//         href: z.string().optional(),
//       })
//       .array()
//       .optional(),
//   })
//   .passthrough()

export const blockSchema = z.union([
  categoryGroupSchema.extend({
    block: z.string(),
  }),
  categoryListSchema.extend({
    block: z.string(),
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
  footerSchema.extend({
    block: z.string(),
  }),
  headerSchema.extend({
    block: z.string(),
  }),
  heroSchema.extend({
    block: z.string(),
  }),
  introSchema.extend({
    block: z.string(),
  }),
  postSingleSchema.extend({
    block: z.string(),
  }),
  productGroupSchema.extend({
    block: z.string(),
  }),
  productListSchema.extend({
    block: z.string(),
  }),
  productSingleSchema.extend({
    block: z.string(),
  }),
  reviewsSchema.extend({
    block: z.string(),
  }),
])

export type BlockSchema = z.infer<typeof blockSchema>
