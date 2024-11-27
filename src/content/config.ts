import { defineCollection } from 'astro:content'
import imageLoader from 'fulldev-ui/loaders/imageLoader.ts'
import { categorySchema } from 'fulldev-ui/schemas/categorySchema'
import { docSchema } from 'fulldev-ui/schemas/docSchema'
import imageSchema from 'fulldev-ui/schemas/imageSchema.ts'
import { layoutSchema } from 'fulldev-ui/schemas/layoutSchema'
import { pageSchema } from 'fulldev-ui/schemas/pageSchema'
import { postSchema } from 'fulldev-ui/schemas/postSchema'
import { productSchema } from 'fulldev-ui/schemas/productSchema'

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
