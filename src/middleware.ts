import { defineMiddleware } from "astro:middleware"

import { applySiteStyle } from "@/lib/styles"

// Components use cn-* placeholders; render the docs in the default style and
// let the site follow the preset's style (src/lib/styles.ts).
export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next()
  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response
  }
  const html = applySiteStyle(await response.text())
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
})
