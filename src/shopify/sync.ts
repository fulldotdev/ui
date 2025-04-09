import { createEntries, deleteFolder } from "../lib/markdown"
import {
  getArticles,
  getBlogs,
  getCollections,
  getPolicies,
  getProducts,
} from "./api"

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

export async function syncBlogs() {
  await deleteFolder("pages", "blogs")
  const blogs = await getBlogs()
  await createEntries(blogs)
}

export async function syncArticles() {
  const articles = await getArticles()
  await createEntries(articles)
}

export async function syncPolicies() {
  await deleteFolder("pages", "policies")
  const policies = await getPolicies()
  await createEntries(policies)
}
