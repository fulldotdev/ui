import { buttonSchema } from "@/schemas/fields/button"
import { channelsSchema } from "@/schemas/fields/channels"
import { formSchema } from "@/schemas/fields/form"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { logoSchema } from "@/schemas/fields/logo"
import { menuSchema } from "@/schemas/fields/menu"
import { priceSchema } from "@/schemas/fields/price"
import { itemSchema } from "@/schemas/item"
import { z } from "zod"

export const blockSchema = z
  .object({
    type: z.string().optional(),
    variant: z.number().optional(),
    className: z.string().optional(),
    id: z.string().optional(),
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    logo: logoSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    channels: channelsSchema.optional(),
    price: priceSchema.optional(),
    form: formSchema.optional(),
    list: z.string().array().optional(),
    socials: z.string().array().optional(),
    search: linkSchema.array().optional(),
    items: itemSchema.array().optional(),
    menus: menuSchema.array().optional(),
    variants: z.any(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
