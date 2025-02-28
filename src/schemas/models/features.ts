import { z } from 'astro:content'

export const featuresSchema = z
  .object({
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

export type FeaturesSchema = z.infer<typeof featuresSchema>
