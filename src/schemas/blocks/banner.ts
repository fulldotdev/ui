import { z } from "zod"

export const bannerSchema = z
  .object({
    items: z
      .array(
        z.union([
          z.string(),
          z.object({
            text: z.string(),
            href: z.string().optional(),
          }),
        ])
      )
      .optional(),
  })
  .passthrough()

export type BannerProps = z.infer<typeof bannerSchema>
