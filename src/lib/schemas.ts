import { z } from "astro:content"

export const pathSchema = z.string().startsWith("/src/content/")

export const channelSchema = z
  .object({
    type: z.enum(["email", "phone", "address", "website"]),
    value: z.string(),
  })
  .partial()
  .strict()

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

export const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
    size: z.enum(["default", "sm", "lg", "icon"]),
  })
  .partial()
  .strict()

export const menuSchema = linkSchema
  .extend({
    links: linkSchema.array(),
  })
  .partial()
  .strict()

export const seoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.any(),
    code: z.string(),
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()
  .strict()

export const hoursSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    ma: z.string(),
    di: z.string(),
    wo: z.string(),
    do: z.string(),
    vr: z.string(),
    za: z.string(),
    zo: z.string(),
  })
  .partial()
  .strict()

export const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.any(),
    submit: z.string(),
    description: z.string(),
  })
  .partial()
  .strict()

export const subscriptionSchema = z
  .object({
    month: z.number(),
    year: z.number(),
    twoyears: z.number(),
  })
  .partial()
  .strict()

export const itemSchema = z
  .object({
    // Config
    layout: z.string(),
    block: z.string(),
    reverse: z.boolean(),
    // Options
    published: z.date(),
    // Base
    name: z.string(),
    title: z.string(),
    description: z.string(),
    href: z.string(),
    tagline: z.string(),
    icon: z.enum(["check", "cross"]),
    rating: z.number().min(0).max(5).step(0.25).nullable(),
    unit: z.string(),
    price: z.number().nullable(),
    comparePrice: z.number().nullable(),
    // Images
    link: linkSchema,
    links: linkSchema.array(),
    menu: menuSchema,
    menus: menuSchema.array(),
    channels: channelSchema.array(),
    socials: z.string().array(),
    list: z.string().array(),
    tags: z.string().array(),
    subscription: subscriptionSchema,
    hours: hoursSchema,
    form: formSchema,
    // Objects and arrays
    image: imageSchema,
    images: imageSchema.array(),
    avatar: imageSchema,
    avatars: imageSchema.array(),
    logo: imageSchema,
    logos: imageSchema.array(),
    // Richtext
    children: z.any(),
  })
  .partial()
  .strict()

export const blockSchema = itemSchema
  .extend({
    items: itemSchema.array(),
    glob: z.string(),
    references: pathSchema.array(),
  })
  .partial()
  .strict()

export const pageSchema = blockSchema
  .extend({
    banner: blockSchema,
    header: blockSchema,
    blocks: blockSchema.array(),
    seo: seoSchema,
    footer: blockSchema,
  })
  .partial()
  .strict()

export type FormSchema = z.infer<typeof formSchema>
export type ItemSchema = z.infer<typeof itemSchema>
export type BlockSchema = z.infer<typeof blockSchema>
export type EntrySchema = z.infer<typeof pageSchema>
