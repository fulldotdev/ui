import { defineCollection, z } from 'astro:content'

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

// export const collections = {
//   categories: defineCollection({
//     type: 'content',
//     // schema: categorySchema,
//     schema: z.any(),
//   }),
//   forms: defineCollection({
//     type: 'content',
//     // schema: formsSchema,
//     schema: z.any(),
//   }),
//   jobs: defineCollection({
//     type: 'content',
//     // schema: jobSchema,
//     schema: z.any(),
//   }),
//   pages: defineCollection({
//     type: 'content',
//     // schema: pageSchema,
//     schema: z.any(),
//   }),
//   policies: defineCollection({
//     type: 'content',
//     // schema: policySchema,
//     schema: z.any(),
//   }),
//   posts: defineCollection({
//     type: 'content',
//     // schema: postSchema,
//     schema: z.any(),
//   }),
//   products: defineCollection({
//     type: 'content',
//     // schema: productSchema,
//     schema: z.any(),
//   }),
//   reviews: defineCollection({
//     type: 'content',
//     // schema: reviewSchema,
//     schema: z.any(),
//   }),
//   services: defineCollection({
//     type: 'content',
//     // schema: serviceSchema,
//     schema: z.any(),
//   }),
//   globals: data,
//   settings: data,
//   docs: defineCollection({ schema: docsSchema() }),
// }
