import { blockSchema } from "@/schemas/block"
import { itemSchema } from "@/schemas/item"
import { reference, z } from "astro:content"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

const itemReferenceSchema = z
  .string()
  .transform((value) => {
    if (!value.includes("/content/items/")) return value
    const path = value?.split(`/content/items/`).pop()
    const id = path?.split(".").shift()
    return id
  })
  .pipe(reference("items"))

const pageReferenceSchema = z
  .string()
  .transform((value) => {
    if (!value.includes("/content/pages/")) return value
    const path = value?.split(`/content/pages/`).pop()
    const id = path?.split(".").shift()
    return id
  })
  .pipe(reference("pages"))

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

export const astroItemSchema = itemSchema

export type AstroItemSchema = z.infer<typeof astroItemSchema>

// --------------------------------------------------------------------------
// Block
// --------------------------------------------------------------------------

export const astroBlockSchema = blockSchema
  .extend({
    items: z
      .union([astroItemSchema, itemReferenceSchema, pageReferenceSchema])
      .array(),
  })
  .partial()
  .strict()

export type AstroBlockSchema = z.infer<typeof astroBlockSchema>

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export const astroPageSchema = astroBlockSchema
  .extend({
    slug: z.string(),
    sections: astroBlockSchema.array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .optional(),
  })
  .partial()
  .strict()

export type AstroPageSchema = z.infer<typeof astroPageSchema>

export const astroPageResponseSchema = astroPageSchema.extend({
  id: z.string(),
  body: z.string(),
  data: astroPageSchema,
})

export type AstroPageResponseSchema = z.infer<typeof astroPageResponseSchema>

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export const astroLayoutSchema = blockSchema
  .extend({
    lang: z.string(),
    company: z.string(),
    banner: astroBlockSchema,
    header: astroBlockSchema,
    footer: astroBlockSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .optional(),
  })
  .partial()
  .strict()

export type AstroLayoutSchema = z.infer<typeof astroLayoutSchema>

export const astroLayoutResponseSchema = astroLayoutSchema.extend({
  id: z.string(),
  body: z.string(),
  data: astroLayoutSchema,
})

export type AstroLayoutResponseSchema = z.infer<
  typeof astroLayoutResponseSchema
>
