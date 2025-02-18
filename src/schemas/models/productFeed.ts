import { z } from 'astro:content'

export const productFeedSchema = z
  .object({
    writeup: z.string().nullish(),
  })
  .strict()

export type ProductFeedSchema = z.infer<typeof productFeedSchema>
