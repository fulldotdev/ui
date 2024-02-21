import { z } from 'zod'

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
    heading: z.string().nullable(),
    text: z.string().nullable(),
    image: z.object({
      src: z.string().nullable(),
      alt: z.string().nullable(),
    }),
  })
  .partial()