import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection, z } from 'astro:content'
import { categoriesSchema as categories } from 'src/schemas/categories.schema'
import { formsSchema as forms } from 'src/schemas/forms.schema'
import { jobsSchema as jobs } from 'src/schemas/jobs.schema'
import { pagesSchema as pages } from 'src/schemas/pages.schema'
import { policiesSchema as policies } from 'src/schemas/policies.schema'
import { postsSchema as posts } from 'src/schemas/posts.schema'
import { productsSchema as products } from 'src/schemas/products.schema'
import { reviewsSchema as reviews } from 'src/schemas/reviews.schema'
import { servicesSchema as services } from 'src/schemas/services.schema'

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

export const collections = {
  categories,
  pages,
  policies,
  posts,
  products,
  reviews,
  services,
  jobs,
  forms,
  globals: data,
  settings: data,
  docs: defineCollection({ schema: docsSchema() }),
}
