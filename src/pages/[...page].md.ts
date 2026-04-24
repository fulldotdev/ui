import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { hrefFromPageId } from "@/lib/pages"

export async function getStaticPaths() {
  const pages = await getCollection("pages")
  return pages.map(async (page) => ({
    params: {
      page: hrefFromPageId(page.id) === "/" ? undefined : page.id,
    },
    props: {
      body: page.body,
    },
  }))
}

export const GET: APIRoute = ({ props }) => {
  return new Response(props.body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
