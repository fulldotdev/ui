import { collectionSchema } from '@/schemas/layouts/collection'
import { pageSchema } from '@/schemas/layouts/page'
import { personSchema } from '@/schemas/layouts/person'
import { postSchema } from '@/schemas/layouts/post'
import { productSchema } from '@/schemas/layouts/product'
import { projectSchema } from '@/schemas/layouts/project'
import { file, glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/pages',
    }),
    schema: pageSchema.extend({
      type: z.enum(['Page', 'Home']).default('Page'),
    }),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/posts',
    }),
    schema: pageSchema.merge(postSchema).extend({
      type: z.literal('Post').default('Post'),
    }),
  }),
  projects: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/projects',
    }),
    schema: pageSchema.merge(projectSchema).extend({
      type: z.literal('Project').default('Project'),
    }),
  }),
  persons: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/persons',
    }),
    schema: pageSchema.merge(personSchema).extend({
      type: z.literal('Person').default('Person'),
    }),
  }),
  products: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/products',
    }),
    schema: pageSchema.merge(productSchema).extend({
      type: z.literal('Product').default('Product'),
    }),
  }),
  collections: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/collections',
    }),
    schema: pageSchema.merge(collectionSchema).extend({
      type: z.literal('Collection').default('Collection'),
    }),
  }),
  reviews: defineCollection({
    loader: file('src/data/reviews.json', {
      parser: (text) => JSON.parse(text).map((item: any, index: number) => ({ ...item, id: index })),
    }),
    schema: z.object({
      rating: z.number().min(1).max(5),
      title: z.string(),
      description: z.string(),
    }),
  }),
}
