import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { linksSchema } from "@/schemas/fields/links"

export const featuresSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    description: z.string(),
    html: z.string(),
    links: linksSchema,
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

export const featuresProps = featuresSchema

export type FeaturesSchema = z.infer<typeof featuresSchema>
export type FeaturesProps = z.infer<typeof featuresProps>
