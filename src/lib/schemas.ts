import { z } from "astro:content"

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
  })
  .or(z.string())

export const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.any(),
    target: z.any(),
  })
  .partial()
  .strict()

export const chipSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.enum(["default", "outline", "secondary"]),
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
    image: imageSchema,
  })
  .partial()
  .strict()

export const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.any(),
    submit: z.string(),
  })
  .partial()
  .strict()

export const priceSchema = z
  .object({
    base: z.number().nullable(),
    compare: z.number().nullable(),
    unit: z.string(),
  })
  .or(z.string())
  .or(z.number())

export const itemSchema = z
  .object({
    slug: z.string(),
    image: imageSchema,
    images: imageSchema.array(),
    id: z.string(),
    href: z.string(),
    block: z.string(),
    published: z.date(),
    title: z.string(),
    description: z.string(),
    disclaimer: z.string(),
    chip: chipSchema,
    badge: linkSchema,
    tagline: z.string(),
    link: linkSchema,
    links: linkSchema.array(),
    buttons: linkSchema.array(),
    icon: z.enum(["check", "cross"]),
    rating: z.number().min(0).max(5).step(0.25),
    price: priceSchema,
    prices: priceSchema.array(),
    social: z.string(),
    socials: z.string().array(),
    locales: z.enum(["nl", "en", "de", "fr"]).array(),
    menu: menuSchema,
    menus: menuSchema.array(),
    list: z.string().array(),
    form: formSchema,
    html: z.string(),
    markdown: z.string(),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    avatars: imageSchema.array(),
    avatar: imageSchema,
    background: z.any(),
  })
  .partial()
  .strict()

export const pathSchema = z.string()
export const globSchema = z.string()

export const itemsSchema = z.union([
  globSchema,
  pathSchema.array(),
  itemSchema.array(),
])

export const blockSchema = itemSchema
  .extend({
    items: itemsSchema,
  })
  .partial()
  .strict()

export const dataSchema = blockSchema
  .extend({
    draft: z.boolean(),
    banner: blockSchema,
    header: blockSchema,
    blocks: blockSchema.array(),
    footer: blockSchema,
    legal: blockSchema,
    bubble: z.string(),
    css: z.string(),
    head: z.string(),
    body: z.string(),
    seo: seoSchema,
  })
  .partial()
  .strict()
