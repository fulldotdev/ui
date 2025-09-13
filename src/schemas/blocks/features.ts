import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const featuresSchema = z
  .object({
    variant: z.enum(["1"]),
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

export type FeaturesSchema = z.infer<typeof featuresSchema>

export type FeaturesProps = Omit<FeaturesSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
