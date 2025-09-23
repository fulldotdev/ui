import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const serviceSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type ServiceSchema = z.infer<typeof serviceSchema>
