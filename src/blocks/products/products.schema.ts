import { reference, z } from 'astro:content'

export default z
  .object({
    seo: z.object({
      title: z.string().nullable(),
      description: z.string().nullable(),
      image: z.object({
        src: z.string().nullable(),
        alt: z.string().nullable(),
      }),
    }),
    rating: z.number().nullable(),
    tagline: z.string().nullable(),
    heading: z.string().nullable(),
    specs: z.any(),
    text: z.string().nullable(),
    images: z.array(
      z.object({
        src: z.string().nullable(),
        alt: z.string().nullable(),
      })
    ),
    categories: z.array(reference('categories')).nullable(),
    price: z.number().nullable(),
    // options: z.array(
    //   z.object({
    //     key: z.string(),
    //     values: z.array(
    //       z.object({
    //         value: z.string(),
    //         fee: z.number(),
    //       })
    //     ),
    //   })
    // ),
  })
  .partial()
