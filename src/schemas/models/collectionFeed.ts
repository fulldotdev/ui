import { z } from 'astro:content'

export const collectionFeedSchema = z
  .object({
    writeup: z.string().nullish(),
  })
  .strict()

export type CollectionFeedSchema = z.infer<typeof collectionFeedSchema>
