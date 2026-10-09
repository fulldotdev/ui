// Build the gallery once per style into the docs site's dist/react folder:
// vega at /react/, every other style at /react/<style>/.
import { build } from "vite"

import { STYLES } from "../../scripts/styles.mjs"

const root = "/react/"
const output = new URL("../../dist/react/", import.meta.url).pathname

for (const style of ["vega", ...STYLES.filter((style) => style !== "vega")]) {
  const path = style === "vega" ? "" : `${style}/`
  Object.assign(process.env, {
    STYLE: style,
    BASE: root + path,
    GALLERY_ROOT: root,
    OUT_DIR: output + path,
  })
  await build({
    configFile: new URL("../vite.config.ts", import.meta.url).pathname,
  })
  console.log(`Built the ${style} gallery.`)
}
