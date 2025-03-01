import { z } from 'astro:content'

export const featuresSchema = z
  .object({
    type: z.literal('Features').default('Features'),
    variant: z.number().default(1),
    content: z.string(),
    features: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
