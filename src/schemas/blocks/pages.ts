import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { z } from "zod"

export const pagesSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    pages: z
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

export type PagesProps = z.infer<typeof pagesSchema>
