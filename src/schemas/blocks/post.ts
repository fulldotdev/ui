import { imageSchema } from "@/schemas/components/image"
import { z } from "zod"

export const postSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .passthrough()

export type PostProps = z.infer<typeof postSchema>
