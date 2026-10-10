// Build the previews once per style into the docs site's dist/preview/react
// folder: vega at /preview/react/, every other style at /preview/react/<style>/.
import { build } from "vite"

import { STYLES } from "../../scripts/styles.mjs"

const root = "/preview/react/"
const output = new URL("../../dist/preview/react/", import.meta.url).pathname

for (const style of ["vega", ...STYLES.filter((style) => style !== "vega")]) {
  const path = style === "vega" ? "" : `${style}/`
  Object.assign(process.env, {
    STYLE: style,
    BASE: root + path,
    OUT_DIR: output + path,
  })
  await build({
    configFile: new URL("../vite.config.ts", import.meta.url).pathname,
  })
  console.log(`Built the ${style} gallery.`)
}
