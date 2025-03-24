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

export const shopifyItemSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    image: shopifyImageSchema,
    featuredImage: shopifyImageSchema,
    priceRange: shopifyPriceRangeSchema,
    compareAtPriceRange: shopifyPriceRangeSchema,
  })
  .partial()

export type ShopifyItemSchema = z.infer<typeof shopifyItemSchema>

export const shopifyBlockSchema = z.object({
  type: z.string(),
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
          nodes: shopifyItemSchema.array(),
        })
        .nullable(),
    })
    .partial()
    .array(),
})

export type ShopifyBlockSchema = z.infer<typeof shopifyBlockSchema>

export const shopifyPageSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    image: shopifyImageSchema,
    featuredImage: shopifyImageSchema,
    priceRange: shopifyPriceRangeSchema,
    compareAtPriceRange: shopifyPriceRangeSchema,
    images: z.object({
      nodes: shopifyImageSchema.array(),
    }),
    products: z.object({
      nodes: shopifyItemSchema.array(),
    }),
    collections: z.object({
      nodes: shopifyItemSchema.array(),
    }),
    variants: z.object({
      nodes: z.any().array(),
    }),
    seo: shopifySeoSchema,
    descriptionHtml: z.string(),
    body: z.string(),
    metafield: z.object({
      references: z.object({
        nodes: shopifyBlockSchema.array(),
      }),
    }),
  })
  .partial()

export type ShopifyPageSchema = z.infer<typeof shopifyPageSchema>

export const shopifyMenuSchema = z.object({
  fields: z
    .object({
      key: z.string(),
      value: z.string(),
    })
    .array(),
})

export type ShopifyMenuSchema = z.infer<typeof shopifyMenuSchema>

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
          nodes: shopifyMenuSchema.array(),
        })
        .nullable(),
    })
    .array(),
})
export type ShopifyLayoutSchema = z.infer<typeof shopifyLayoutSchema>

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

export type ShopifySearchSchema = z.infer<typeof shopifySearchSchema>
