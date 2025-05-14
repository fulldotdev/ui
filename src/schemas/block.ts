import { z } from "zod"

import { buttonSchema } from "@/schemas/fields/button"
import { channelsSchema } from "@/schemas/fields/channels"
import { formSchema } from "@/schemas/fields/form"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { menuSchema } from "@/schemas/fields/menu"

export const blockSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    variants: z.any(),
    energyLabel: z.any(),
    id: z.string(),
    className: z.string(),
    when: z.string(),
    where: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
    images: imageSchema.array(),
    channels: channelsSchema,
    price: z.number(),
    tagline: z.string(),
    form: formSchema,
    list: z.string().array(),
    socials: z.string().array(),
    items: z
      .object({
        href: z.string(),
        tagline: z.string(),
        title: z.string(),
        description: z.string(),
        image: imageSchema,
        images: imageSchema.array(),
        rating: z.number(),
        price: z.number(),
        button: buttonSchema,
        links: linkSchema.array(),
        list: z.string().array(),
        socials: z.string().array(),
        avatar: z.string(),
      })
      .partial()
      .array(),
    logo: imageSchema,
    menus: menuSchema.array(),
    search: z.any(),
    cart: z.any(),
  })
  .partial()

export type BlockSchema = z.infer<typeof blockSchema>
