import type { AstroComponentFactory } from "astro/runtime/server/index.js"

import type { PageType } from "@/lib/pages"

import Block from "./block.astro"
import Doc from "./doc.astro"
import Home from "./home.astro"
import Overview from "./overview.astro"

export const layouts = {
  block: Block,
  doc: Doc,
  home: Home,
  overview: Overview,
} satisfies Record<PageType, AstroComponentFactory>
