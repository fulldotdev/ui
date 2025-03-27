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

const shopifySeoSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
})

export type ShopifySeoSchema = z.infer<typeof shopifySeoSchema>

const shopifyPageInfoSchema = z.object({
  hasNextPage: z.boolean(),
  endCursor: z.string(),
})

export type ShopifyPageInfoSchema = z.infer<typeof shopifyPageInfoSchema>

// --------------------------------------------------------------------------
// Entry
// --------------------------------------------------------------------------

export const shopifyEntrySchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  featuredImage: shopifyImageSchema.nullable(),
  images: z.object({
    nodes: z.array(shopifyImageSchema),
  }),
  priceRange: shopifyProductPriceRangeSchema,
  compareAtPriceRange: shopifyProductPriceRangeSchema,
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
  seo: shopifySeoSchema,
  descriptionHtml: z.string(),
})

// --------------------------------------------------------------------------
// Products
// --------------------------------------------------------------------------

export const shopifyProductsSchema = z.object({
  products: z.object({
    nodes: z
      .object({
        id: z.string(),
        handle: z.string(),
        title: z.string(),
        featuredImage: shopifyImageSchema.nullable(),
        images: z.object({
          nodes: z.array(shopifyImageSchema),
        }),
        priceRange: shopifyProductPriceRangeSchema,
        compareAtPriceRange: shopifyProductPriceRangeSchema,
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
        seo: shopifySeoSchema,
        descriptionHtml: z.string(),
      })
      .array(),
    pageInfo: shopifyPageInfoSchema,
  }),
})

export type ShopifyProductsSchema = z.infer<typeof shopifyProductsSchema>

// --------------------------------------------------------------------------
// Collections
// --------------------------------------------------------------------------

export const shopifyCollectionsSchema = z.object({
  collections: z.object({
    nodes: z
      .object({
        id: z.string(),
        handle: z.string(),
        title: z.string(),
        image: shopifyImageSchema.nullable(),
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
        seo: shopifySeoSchema,
        descriptionHtml: z.string(),
      })
      .array(),
    pageInfo: shopifyPageInfoSchema,
  }),
})

export type ShopifyCollectionsSchema = z.infer<typeof shopifyCollectionsSchema>

// --------------------------------------------------------------------------
// Section
// --------------------------------------------------------------------------

export const shopifySectionSchema = z.object({
  type: z.string(),
  fields: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      reference: z.object({
        image: shopifyImageSchema.nullable(),
      }),
      references: z.object({
        nodes: z.array(
          z.object({
            id: z.string(),
            handle: z.string(),
            title: z.string(),
            image: shopifyImageSchema.nullable(),
            featuredImage: shopifyImageSchema.nullable(),
            priceRange: shopifyProductPriceRangeSchema,
            compareAtPriceRange: shopifyProductPriceRangeSchema,
          })
        ),
      }),
    })
  ),
})

export type ShopifySectionSchema = z.infer<typeof shopifySectionSchema>

// --------------------------------------------------------------------------
// Pages
// --------------------------------------------------------------------------

export const shopifyPagesSchema = z.object({
  pages: z.object({
    nodes: z
      .object({
        id: z.string(),
        handle: z.string(),
        title: z.string(),
        metafield: z.object({
          references: z.object({
            nodes: z.array(shopifySectionSchema),
          }),
        }),
        seo: shopifySeoSchema,
        body: z.string(),
      })
      .array(),
    pageInfo: shopifyPageInfoSchema,
  }),
})

export type ShopifyPagesSchema = z.infer<typeof shopifyPagesSchema>
