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
    id: z.string(),
    className: z.string(),
    level: z.number().min(1).max(3),
    align: z.enum(["start", "center", "end"]),
    title: z.string(),
    description: z.string(),
    when: z.string(),
    where: z.string(),
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
    images: imageSchema.array(),
    logo: logoSchema,
    channels: channelsSchema,
    price: priceSchema,
    form: formSchema,
    list: z.string().array(),
    socials: z.string().array(),
    search: linkSchema.array(),
    menus: menuSchema.array(),
    variants: z.any(),
    cart: z.boolean(),
    items: itemSchema.array(),
  })
  .partial()

export type BlockSchema = z.infer<typeof blockSchema>
