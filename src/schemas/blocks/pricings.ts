import { buttonSchema } from "@/schemas/components/button"
import { priceSchema } from "@/schemas/components/price"
import { z } from "zod"

export const pricingsSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    pricings: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        price: priceSchema.optional(),
        list: z.string().array().optional(),
        button: buttonSchema.optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type PricingsProps = z.infer<typeof pricingsSchema>
