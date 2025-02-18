import { z } from 'astro:content'

export const postFeedSchema = z
  .object({
    writeup: z.string().nullish(),
  })
  .strict()

export type PostFeedSchema = z.infer<typeof postFeedSchema>
