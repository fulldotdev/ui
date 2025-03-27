import { z } from "zod"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

const shopifyImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
})

export type ShopifyImageSchema = z.infer<typeof shopifyImageSchema>

const shopifyProductPriceRangeSchema = z.object({
  minVariantPrice: z.object({
    amount: z.string(),
    currencyCode: z.string(),
  }),
})

export type ShopifyProductPriceRangeSchema = z.infer<
  typeof shopifyProductPriceRangeSchema
>

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

export const shopifyItemSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    image: shopifyImageSchema.nullable(),
    featuredImage: shopifyImageSchema.nullable(),
    priceRange: shopifyProductPriceRangeSchema,
    compareAtPriceRange: shopifyProductPriceRangeSchema,
  })
  .partial()

export type ShopifyItemSchema = z.infer<typeof shopifyItemSchema>

// --------------------------------------------------------------------------
// Block
// --------------------------------------------------------------------------

export const shopifyBlockSchema = z
  .object({
    type: z.string(),
    fields: z.array(
      z
        .object({
          key: z.string(),
          value: z.string(),
          reference: z
            .object({
              image: shopifyImageSchema.nullable(),
            })
            .nullable(),
          references: z
            .object({
              nodes: z.array(
                z
                  .object({
                    id: z.string(),
                    handle: z.string(),
                    title: z.string(),
                    image: shopifyImageSchema.nullable(),
                    featuredImage: shopifyImageSchema.nullable(),
                    priceRange: shopifyProductPriceRangeSchema,
                    compareAtPriceRange: shopifyProductPriceRangeSchema,
                  })
                  .partial()
              ),
            })
            .nullable(),
        })
        .partial()
    ),
  })
  .partial()

export type ShopifyBlockSchema = z.infer<typeof shopifyBlockSchema>

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export const shopifyPageSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    image: shopifyImageSchema.nullable(),
    featuredImage: shopifyImageSchema.nullable(),
    images: z.object({
      nodes: z.array(shopifyImageSchema),
    }),
    priceRange: shopifyProductPriceRangeSchema,
    compareAtPriceRange: shopifyProductPriceRangeSchema,
    products: z.object({
      nodes: z
        .object({
          id: z.string(),
          handle: z.string(),
          title: z.string(),
          featuredImage: shopifyImageSchema.nullable(),
          priceRange: shopifyProductPriceRangeSchema,
          compareAtPriceRange: shopifyProductPriceRangeSchema,
        })
        .array(),
    }),
    variants: z.object({
      nodes: z
        .object({
          id: z.string(),
          selectedOptions: z
            .object({
              value: z.string(),
              name: z.string(),
            })
            .array(),
        })
        .array(),
    }),
    metafield: z
      .object({
        references: z
          .object({
            nodes: z.array(shopifyBlockSchema),
          })
          .nullable(),
      })
      .nullable(),
    seo: z.object({
      title: z.string().nullable(),
      description: z.string().nullable(),
    }),
    descriptionHtml: z.string(),
    body: z.string(),
  })
  .partial()

export type ShopifyPageSchema = z.infer<typeof shopifyPageSchema>

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

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
          image: shopifyImageSchema.nullable(),
        })
        .nullable(),
      references: z
        .object({
          nodes: shopifyMenuSchema.array(),
        })
        .nullable(),
    })
    .partial()
    .array(),
})

export type ShopifyLayoutSchema = z.infer<typeof shopifyLayoutSchema>

// --------------------------------------------------------------------------
// Responses
// --------------------------------------------------------------------------

export const shopifyPagesResponseSchema = z.object({
  pages: z.object({
    nodes: z.array(shopifyPageSchema),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string(),
    }),
  }),
})

export const shopifyProductsResponseSchema = z.object({
  products: z.object({
    nodes: z.array(shopifyPageSchema),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string(),
    }),
  }),
})

export const shopifyCollectionsResponseSchema = z.object({
  collections: z.object({
    nodes: z.array(shopifyPageSchema),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string(),
    }),
  }),
})

export const shopifyLayoutResponseSchema = z.object({
  metaobject: shopifyLayoutSchema,
})
