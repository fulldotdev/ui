import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const featureSchema = z
  .object({
    variant: z.enum(["1"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type FeatureSchema = z.infer<typeof featureSchema>

export type FeatureProps = Omit<FeatureSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
