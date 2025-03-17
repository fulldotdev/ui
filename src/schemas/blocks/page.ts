import { imageSchema } from "@/schemas/components/image"
import { z } from "zod"

export const pageSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .passthrough()

export type PageProps = z.infer<typeof pageSchema>
