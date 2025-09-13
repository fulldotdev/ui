import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const contentSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type ContentProps = Omit<z.infer<typeof contentSchema>, "html"> & {
  children?: React.ReactNode
}
