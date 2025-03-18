import fs from "fs"
import path from "path"
import type { Product } from "@shopify/hydrogen-react/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import yaml from "yaml"

const ProductsQuery = `#graphql
    query {
      products(first: 250) {
        nodes {
          id
          handle
          title
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 50) {
            nodes {
              url
              altText
            }
          }
          collections(first: 50) {
            nodes {
              handle
            }
          }
          seo {
            title
            description
          }
          options(first: 50) {
            name
            optionValues {
              id
              name
            }
          }
          variants(first: 250) {
            nodes {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              quantityAvailable
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

export async function syncShopifyProducts({
  storeDomain,
  publicAccessToken,
  productsFolder,
}: {
  storeDomain: string
  publicAccessToken: string
  productsFolder: string
}) {
  const client = createStorefrontApiClient({
    apiVersion: "2025-01",
    storeDomain,
    publicAccessToken,
  })

  // Delete all files in the products folder
  const folderPath = path.join("src/content/pages", productsFolder)
  fs.readdirSync(folderPath).forEach((file) => {
    fs.unlinkSync(path.join(folderPath, file))
  })

  const response = await client.request(ProductsQuery)
  const products = response.data.products.nodes as Partial<Product>[]

  for (const product of products) {
    if (!product.handle) return
    if (!product.id) return

    const frontmatter = yaml.stringify({
      type: "product",
      id: product.id,
      title: product.title,
      price: {
        amount: Number(product.priceRange?.minVariantPrice?.amount),
        compare: Number(product.compareAtPriceRange?.minVariantPrice?.amount),
        currency: product.priceRange?.minVariantPrice?.currencyCode,
      },
      images: product.images?.nodes.map((image) => ({
        src: image.url,
        alt: image.altText ?? undefined,
      })),
      collections: product.collections?.nodes.map(
        (collection) => collection.handle
      ),
      seo: {
        title: product.seo?.title ?? undefined,
        description: product.seo?.description ?? undefined,
      },
      variants: product.variants,
    })

    const content = product.descriptionHtml || ""

    // Create the folder if it doesn't exist
    fs.mkdirSync(folderPath, { recursive: true })
    // Create the file
    const filePath = path.join(folderPath, `${product.handle}.md`)
    const fileContent = `---
${frontmatter}
---
${content}`

    fs.writeFileSync(filePath, fileContent)
  }
}
