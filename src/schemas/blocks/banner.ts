import { z } from "astro:schema"

export const bannerSchema = z
  .object({
    variant: z.enum(["1"]),
    html: z.string(),
  })
  .partial()
  .strict()

export type BannerSchema = z.infer<typeof bannerSchema>

export type BannerProps = Omit<BannerSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
