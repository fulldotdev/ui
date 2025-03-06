import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import {
  reference,
  z,
  type AnyEntryMap,
  type CollectionEntry,
} from "astro:content"

// TODO: preprocess instead
export const pathSchema = <C extends keyof AnyEntryMap>(collection: C) =>
  z
    .string()
    .transform((value) => {
      const fullpath = value?.split(`${collection}/`).pop()
      const slug = fullpath?.split(".").shift()
      const noIndexEnding = slug?.replace("/index", "")
      return noIndexEnding
    })
    .pipe(reference(collection))

const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
  })
  .partial()
  .strict()

const buttonSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
  })
  .partial()
  .strict()

const linkSchema = z
  .object({
    text: z.string(),
    href: z.string(),
  })
  .partial()
  .strict()

export const menuSchema = linkSchema
  .extend({
    links: linkSchema.array(),
  })
  .partial()
  .strict()

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: imageSchema,
  images: imageSchema.array(),
  button: buttonSchema,
  buttons: buttonSchema.array(),
  list: z.string().array(),
  rating: z.number(),
  channels: z
    .object({
      phone: z.string(),
      email: z.string().email(),
      address: z.string(),
    })
    .partial()
    .strict(),
  socials: z.string().array(),
  form: z
    .object({
      action: z.string(),
      fields: z
        .object({
          type: z.enum(["text", "email", "textarea", "date", "select"]),
          label: z.string(),
          placeholder: z.string(),
          options: z.string().array(),
          value: z.string(),
          required: z.boolean(),
        })
        .partial()
        .strict()
        .array(),
      submit: z.string(),
    })
    .partial()
    .strict(),
  link: linkSchema,
  links: linkSchema.array(),
  price: z
    .object({
      amount: z.number(),
      compare: z.number(),
      unit: z.string(),
      currency: z.string(),
    })
    .partial()
    .strict(),
})

export const blockSchema = baseSchema
  .extend({
    type: z.string(),
    variant: z.number(),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]),
    content: z.string(),
    features: baseSchema.array(),
    pages: pathSchema("pages").array(),
    persons: pathSchema("persons").array(),
    projects: pathSchema("projects").array(),
    products: pathSchema("products").array(),
    reviews: pathSchema("reviews").array(),
    articles: pathSchema("articles").array(),
    collections: pathSchema("collections").array(),
  })
  .partial()
  .strict()

export const pageSchema = baseSchema
  .extend({
    type: z.string(),
    variant: z.number(),
    collections: pathSchema("collections"),
    sections: sectionSchema.array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        canonical: z.string(),
        noindex: z.boolean(),
        nofollow: z.boolean(),
      })
      .partial()
      .strict(),
  })
  .partial()
  .strict()
