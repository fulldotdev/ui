import { productSchema } from "@/schemas/blocks/product"
import type { reference } from "astro:content"
import { z } from "zod"

export const shopifyImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
})
export type ShopifyImageSchema = z.infer<typeof shopifyImageSchema>

export const shopifyPriceRangeSchema = z.object({
  minVariantPrice: z.object({
    amount: z.string(),
    currencyCode: z.string(),
  }),
})
export type ShopifyPriceRangeSchema = z.infer<typeof shopifyPriceRangeSchema>

export const shopifySeoSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
})
export type ShopifySeoSchema = z.infer<typeof shopifySeoSchema>

export const shopifyProductSchema = z.object({
  type: z.literal("product").default("product"),
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  featuredImage: shopifyImageSchema,
  priceRange: shopifyPriceRangeSchema,
  compareAtPriceRange: shopifyPriceRangeSchema,
  images: z.object({
    nodes: shopifyImageSchema.array(),
  }),
  variants: z.any(),
  seo: shopifySeoSchema,
  descriptionHtml: z.string(),
})
export type ShopifyProductSchema = z.infer<typeof shopifyProductSchema>

export const shopifyCollectionSchema = z.object({
  type: z.literal("collection").default("collection"),
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  image: shopifyImageSchema,
  products: z.object({
    nodes: shopifyProductSchema.array(),
  }),
  seo: shopifySeoSchema,
  descriptionHtml: z.string(),
})
export type ShopifyCollectionSchema = z.infer<typeof shopifyCollectionSchema>

export const shopifySectionSchema = z.object({
  type: z.enum([
    "hero",
    "media",
    "cta",
    "faqs",
    "contact",
    "products",
    "collections",
  ]),
  fields: z
    .object({
      key: z.string(),
      value: z.string(),
      reference: z
        .object({
          image: shopifyImageSchema,
        })
        .nullable(),
      references: z.object({
        nodes: shopifyProductSchema.array(),
      }),
      // references: z
      //   .object({
      //     nodes: z
      //       .discriminatedUnion("type", [
      //         shopifyProductSchema.extend({
      //           type: z.literal("product"),
      //         }),
      //         shopifyCollectionSchema.extend({
      //           type: z.literal("collection"),
      //         }),
      //       ])
      //       .array(),
      //   })
      //   .nullable(),
    })
    .array(),
})
export type ShopifySectionSchema = z.infer<typeof shopifySectionSchema>

export const shopifyPageSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  metafield: z.object({
    references: z.object({
      nodes: shopifySectionSchema.array(),
    }),
  }),
  seo: shopifySeoSchema,
  body: z.string(),
})
export type ShopifyPageSchema = z.infer<typeof shopifyPageSchema>

export const shopifySearchSchema = z.object({
  pageInfo: z.object({
    hasNextPage: z.boolean(),
    endCursor: z.string(),
  }),
  nodes: z.array(
    z.object({
      id: z.string(),
      handle: z.string(),
      title: z.string(),
    })
  ),
})

export const shopifyLayoutSchema = z.object({
  fields: z
    .object({
      key: z.string(),
      value: z.string(),
      reference: z
        .object({
          image: shopifyImageSchema,
        })
        .nullable(),
      references: z
        .object({
          nodes: z
            .object({
              fields: z
                .object({
                  key: z.string(),
                  value: z.string(),
                })
                .array(),
            })
            .array(),
        })
        .nullable(),
    })
    .array(),
})
export type ShopifyLayoutSchema = z.infer<typeof shopifyLayoutSchema>
