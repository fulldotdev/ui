import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { z } from "zod"

export const collectionsSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    collections: z
      .object({
        href: z.string().optional(),
        image: imageSchema.optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type CollectionsProps = z.infer<typeof collectionsSchema>
