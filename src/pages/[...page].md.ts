import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { getPageMarkdown } from "@/lib/markdown"

export const prerender = true

export async function getStaticPaths() {
  const pages = await getCollection("pages")
  return Promise.all(
    pages.map(async (page) => ({
      params: { page: page.id },
      props: { source: await getPageMarkdown(page) },
    }))
  )
}

export const GET: APIRoute = ({ props }) => {
  return new Response(props.source, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
