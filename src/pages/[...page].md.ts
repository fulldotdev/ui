import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

export const prerender = true

const navigationPreamble = "Navigation: [/sitemap.md](/sitemap.md)\n\n"

export async function getStaticPaths() {
  const pages = await getCollection("pages")
  return Promise.all(
    pages.map(async (page) => ({
      params: {
        page: page.id === "index" ? undefined : page.id,
      },
      props: {
        source: await readPageSource(page.filePath),
      },
    }))
  )
}

async function readPageSource(filePath: string | undefined) {
  if (!filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }

  return readFile(filePath, "utf-8")
}

export const GET: APIRoute = ({ props }) => {
  return new Response(`${navigationPreamble}${props.source}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
