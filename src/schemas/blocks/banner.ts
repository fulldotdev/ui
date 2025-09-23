import { z } from "astro:schema"

export const bannerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    html: z.string(),
  })
  .partial()
  .strict()

export type BannerSchema = z.infer<typeof bannerSchema>
