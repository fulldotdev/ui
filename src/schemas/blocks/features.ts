import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const featuresSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
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
      .strict()
      .array()
      .optional(),
  })
  .strict()
