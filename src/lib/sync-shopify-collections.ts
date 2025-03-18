import fs from "fs"
import path from "path"
import type { Collection } from "@shopify/hydrogen-react/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import yaml from "yaml"

const CollectionsQuery = `#graphql
  query {
    collections(first: 250) {
      nodes {
        id
        handle
        title
        descriptionHtml
        image {
          url
          altText
        }
        seo {
          title
          description
        }
      }
    }
  }
`

export async function syncShopifyCollections({
  storeDomain,
  publicAccessToken,
  collectionsFolder,
}: {
  storeDomain: string
  publicAccessToken: string
  collectionsFolder: string
}) {
  const client = createStorefrontApiClient({
    apiVersion: "2025-01",
    storeDomain,
    publicAccessToken,
  })

  const response = await client.request(CollectionsQuery)
  const collections = response.data.collections.nodes as Partial<Collection>[]

  // Delete all files in the collections folder
  const folderPath = path.join("src/content/pages", collectionsFolder)
  fs.readdirSync(folderPath).forEach((file) => {
    fs.unlinkSync(path.join(folderPath, file))
  })

  for (const collection of collections) {
    if (!collection.handle) return
    if (!collection.id) return

    const frontmatter = yaml.stringify({
      type: "collection",
      id: collection.id,
      title: collection.title,
      image: {
        src: collection.image?.url,
        alt: collection.image?.altText ?? undefined,
      },
      seo: {
        title: collection.seo?.title ?? undefined,
        description: collection.seo?.description ?? undefined,
      },
    })

    const content = collection.descriptionHtml || ""

    // Create the folder if it doesn't exist
    fs.mkdirSync(folderPath, { recursive: true })
    // Create the file
    const filePath = path.join(folderPath, `${collection.handle}.md`)
    const fileContent = `---
${frontmatter}
---
${content}`

    fs.writeFileSync(filePath, fileContent)
  }
}
