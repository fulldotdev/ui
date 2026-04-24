import { getCollection, type CollectionEntry } from "astro:content"
import type { APIRoute } from "astro"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

export const prerender = true

function rawRouteFromId(id: string) {
  if (id === "index") return "index"
  if (id.endsWith("/index")) return id.slice(0, -"/index".length)
  return id
}

async function readPageSource(page: CollectionEntry<"pages">) {
  if (!page.filePath) return page.body

  return readFile(resolve(page.filePath), "utf8")
}

export async function getStaticPaths() {
  const pages = await getCollection("pages")

  return Promise.all(
    pages.map(async (page) => ({
      params: {
        page: rawRouteFromId(page.id),
      },
      props: {
        source: await readPageSource(page),
      },
    }))
  )
}

export const GET: APIRoute = ({ props }) => {
  return new Response(props.source, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
