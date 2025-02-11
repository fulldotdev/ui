import { z } from 'astro:content'

export const featuresSchema = z
  .object({
    writeup: z.string().optional(),
    features: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
      .array(),
  })
  .strict()

export type FeaturesSchema = z.infer<typeof featuresSchema>
