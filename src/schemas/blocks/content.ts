import { imageSchema } from "@/schemas/components/image"
import { z } from "zod"

import { buttonSchema } from "../components/button"

export const contentSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .passthrough()

export type ContentProps = z.infer<typeof contentSchema>
