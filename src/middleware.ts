import { defineMiddleware } from "astro:middleware"

import { applyStyle, defaultStyle } from "@/lib/styles"

// Components use cn-* placeholders; render the docs in the default style.
export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next()
  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response
  }
  const html = applyStyle(await response.text(), defaultStyle)
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
})
