import type { APIRoute } from "astro"

import { getLlms } from "@/lib/llms"

export const prerender = true

export const GET: APIRoute = async ({ site }) =>
  new Response(await getLlms(site?.origin ?? ""), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
