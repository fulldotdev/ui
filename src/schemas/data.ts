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

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
  })
  .partial()
  .strict()

export const priceSchema = z
  .object({
    amount: z.number(),
    compare: z.number(),
    unit: z.string(),
    currency: z.string(),
  })
  .partial()
  .strict()

export const pageSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    rating: z.number(),
  })
  .partial()
  .strict()
