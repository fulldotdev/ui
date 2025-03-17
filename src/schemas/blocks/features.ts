import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

export const featuresSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    features: z
      .object({
        icon: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type FeaturesProps = z.infer<typeof featuresSchema>
