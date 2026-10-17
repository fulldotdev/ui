import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { APIRoute } from "astro"

import { liquidAssets } from "@/lib/liquid"

export const getStaticPaths = () =>
  liquidAssets.map(([file, path]) => ({ params: { file }, props: { path } }))

export const GET: APIRoute = async ({ params, props }) =>
  new Response(await readFile(resolve("liquid", props.path), "utf8"), {
    headers: {
      "content-type": params.file!.endsWith(".js")
        ? "text/javascript"
        : params.file!.endsWith(".css")
          ? "text/css"
          : "application/json",
    },
  })
