import { getCollection } from "astro:content"

import { transformAstroPage } from "./transforms"

export async function getPages() {
  const pages = await getCollection("pages")
  const transformedPages = pages.map(transformAstroPage)
  return transformedPages
}
