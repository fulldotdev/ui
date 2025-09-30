import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linksSchema } from "@/schemas/fields/links"

export const featureSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
    image: imageSchema,
  })
  .partial()
  .strict()

export const featureProps = featureSchema

export type FeatureSchema = z.infer<typeof featureSchema>
export type FeatureProps = z.infer<typeof featureProps>
