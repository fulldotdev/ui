import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const contentSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type ContentSchema = z.infer<typeof contentSchema>

export type ContentProps = Omit<ContentSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
