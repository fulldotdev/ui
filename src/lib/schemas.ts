import { reference, z, type CollectionKey } from "astro:content"

const pathSchema = <C extends CollectionKey>(collection: C) => {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value
    const path = value.split(`/${collection}/`)[1]
    if (!path) return value
    const id = path.split(".")[0]
    return id
  }, reference(collection))
}

const channelSchema = z
  .object({
    type: z.enum(["email", "phone", "address", "website"]),
    value: z.string(),
  })
  .partial()
  .strict()

const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
    size: z.enum(["default", "sm", "lg", "xl", "icon"]),
  })
  .partial()
  .strict()

export const menuSchema = linkSchema
  .extend({
    links: linkSchema.array(),
  })
  .partial()
  .strict()

const seoSchema = z
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

const subscriptionSchema = z
  .object({
    month: z.number(),
    year: z.number(),
    twoyears: z.number(),
  })
  .partial()
  .strict()

export const itemSchema = z
  .object({
    _schema: z.string(),
    href: z.string(),
    children: z.any(),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    images: imageSchema.array(),
    avatar: imageSchema,
    avatars: imageSchema.array(),
    logo: imageSchema,
    logos: imageSchema.array(),
    published: z.date(),
    link: linkSchema,
    links: linkSchema.array(),
    menu: menuSchema,
    menus: menuSchema.array(),
    channels: channelSchema.array(),
    socials: z.string().array(),
    reverse: z.boolean(),
    rating: z.number().min(0).max(5).step(0.25),
    when: z.string(),
    where: z.string(),
    copyright: z.string(),
    tagline: z.string(),
    list: z.string().array(),
    tags: z.string().array(),
    unit: z.string(),
    price: z.number(),
    prices: subscriptionSchema,
    icon: z.enum(["check", "cross"]),
  })
  .partial()
  .strict()

export const blockSchema = itemSchema
  .extend({
    block: z.string(),
    items: itemSchema.array(),
    hours: hoursSchema,
    // Collection references
    articles: pathSchema("articles").array(),
    _articles: z.string(),
    events: pathSchema("events").array(),
    _events: z.string(),
    form: pathSchema("forms"),
    jobs: pathSchema("jobs").array(),
    _jobs: z.string(),
    locations: pathSchema("locations").array(),
    _locations: z.string(),
    pages: pathSchema("pages").array(),
    _pages: z.string(),
    persons: pathSchema("persons").array(),
    _persons: z.string(),
    policies: pathSchema("policies").array(),
    _policies: z.string(),
    reviews: pathSchema("reviews").array(),
    _reviews: z.string(),
    services: pathSchema("services").array(),
    _services: z.string(),
  })
  .partial()
  .strict()

export const entrySchema = blockSchema
  .extend({
    draft: z.boolean(),
    blocks: blockSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()

export type ItemSchema = z.infer<typeof itemSchema>
export type BlockSchema = z.infer<typeof blockSchema>
export type EntrySchema = z.infer<typeof entrySchema>
