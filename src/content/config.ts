import { defineCollection } from 'astro:content'
import { categorySchema } from 'fulldev-ui/schemas/categorySchema.ts'
import { docSchema } from 'fulldev-ui/schemas/docSchema.ts'
import { imageLoader, imageSchema } from 'fulldev-ui/schemas/imageSchema.ts'
import { layoutSchema } from 'fulldev-ui/schemas/layoutSchema.ts'
import { pageSchema } from 'fulldev-ui/schemas/pageSchema.ts'
import { postSchema } from 'fulldev-ui/schemas/postSchema.ts'
import { productSchema } from 'fulldev-ui/schemas/productSchema.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  posts: defineCollection({
    type: 'content',
    schema: postSchema,
  }),
  docs: defineCollection({
    type: 'content',
    schema: docSchema,
  }),
  categories: defineCollection({
    type: 'content',
    schema: categorySchema,
  }),
  products: defineCollection({
    type: 'content',
    schema: productSchema,
  }),
  layouts: defineCollection({
    type: 'data',
    schema: layoutSchema,
  }),
  images: defineCollection({
    loader: imageLoader,
    schema: imageSchema,
  }),
}
