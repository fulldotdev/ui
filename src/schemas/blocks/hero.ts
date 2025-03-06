import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { z } from "astro:content"

export const heroSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    dark: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()
