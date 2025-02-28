import { z } from 'astro:content'

export const featuresSchema = z
  .object({
    type: z.literal('Features').default('Features'),
    writeup: z.string().nullish(),
    features: z
      .object({
        icon: z.string().nullish(),
        title: z.string().nullish(),
        description: z.string().nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()
