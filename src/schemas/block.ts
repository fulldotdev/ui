import { buttonSchema } from "@/schemas/components/button"
import { channelsSchema } from "@/schemas/components/channels"
import { formSchema } from "@/schemas/components/form"
import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { z } from "zod"

export const blockSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    channels: channelsSchema.optional(),
    form: formSchema.optional(),
    list: z.string().array().optional(),
    items: z
      .object({
        href: z.string().optional(),
        image: imageSchema.optional(),
        rating: z.number().min(1).max(5).optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        price: priceSchema,
        button: buttonSchema.optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type BlockSchema = z.infer<typeof blockSchema>
