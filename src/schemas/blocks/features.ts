import { z } from 'astro:content'

export const featuresSchema = z
  .object({
    writeup: z.string().optional(),
    features: z
      .object({
        icon: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .array()
      .optional(),
  })
  .strict()

export type FeaturesSchema = z.infer<typeof featuresSchema>
