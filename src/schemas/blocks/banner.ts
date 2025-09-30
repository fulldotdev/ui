import { z } from "astro:schema"

export const bannerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    html: z.string(),
  })
  .partial()
  .strict()

export const bannerProps = bannerSchema

export type BannerSchema = z.infer<typeof bannerSchema>
export type BannerProps = z.infer<typeof bannerProps>
