import { createEntries, deleteFolder } from "../lib/markdown"
import { getCollections, getProducts } from "./api"

export async function syncCollections() {
  await deleteFolder("pages", "collections")
  const collections = await getCollections()
  await createEntries(collections)
}

export async function syncProducts() {
  await deleteFolder("pages", "products")
  const products = await getProducts()
  await createEntries(products)
}
