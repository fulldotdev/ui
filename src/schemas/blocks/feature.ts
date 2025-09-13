import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const featureSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type FeatureProps = Omit<z.infer<typeof featureSchema>, "html"> & {
  children?: React.ReactNode
}
