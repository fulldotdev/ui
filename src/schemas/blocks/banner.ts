import { z } from "astro:schema"

export const bannerSchema = z
  .object({
    html: z.string(),
  })
  .partial()
  .strict()

export type BannerProps = Omit<z.infer<typeof bannerSchema>, "html"> & {
  children?: React.ReactNode
}
