import { z } from 'astro:content'

export const bannerSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { text: data } : data),
  z.object({
    text: z.string().optional(),
  })
)

export type BannerSchema = z.infer<typeof bannerSchema>
