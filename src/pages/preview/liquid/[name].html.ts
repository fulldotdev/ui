import type { APIRoute } from "astro"

import { renderLiquidExample } from "@/lib/liquid"

const examples = import.meta.glob<string>("/liquid/examples/*.liquid", {
  query: "?raw",
  import: "default",
  eager: true,
})

export const getStaticPaths = () =>
  Object.entries(examples).map(([path, source]) => ({
    params: {
      name: path
        .split("/")
        .at(-1)!
        .replace(/\.liquid$/, ""),
    },
    props: { source },
  }))

export const GET: APIRoute = async ({ props }) =>
  new Response(await renderLiquidExample(props.source), {
    headers: { "content-type": "text/html; charset=utf-8" },
  })
