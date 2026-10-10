import type { APIRoute } from "astro"

import { getLlmsFull } from "@/lib/llms"
import { frameworks, type Framework } from "@/lib/pages"

export const prerender = true

export const getStaticPaths = () =>
  frameworks.map((edition) => ({ params: { edition } }))

export const GET: APIRoute = async ({ site, params }) =>
  new Response(
    await getLlmsFull(site?.origin ?? "", params.edition as Framework),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  )
