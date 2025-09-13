import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const featuresSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    features: z
      .object({
        image: imageSchema,
        icon: z.enum(["check", "cross"]),
        title: z.string(),
        description: z.string(),
        link: linkSchema,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export type FeaturesProps = Omit<z.infer<typeof featuresSchema>, "html"> & {
  children?: React.ReactNode
}
