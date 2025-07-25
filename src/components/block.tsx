import type { CollectionEntry } from "astro:content"

import {
  findEntriesByGlob,
  findEntryByPath,
  getHrefByEntry,
} from "@/lib/collections"
import type { BlockSchema } from "@/lib/schemas"

// Get all blocks as an object
const blockImports = import.meta.glob("../blocks/**/*.tsx", {
  eager: true,
})

// Render all blocks
function Block({
  entries,
  items,
  block,
  ...props
}: BlockSchema & {
  block?: string
  entries: CollectionEntry<"content">[]
}) {
  // Find the block in the blockImports object
  const blockPath = `../blocks/${block}.tsx`
  const blockImport = blockImports[blockPath] as any
  const BlockComponent = blockImport?.default

  // replace the references and glob in the block with the entries
  const referenceEntries =
    props.references
      ?.map((reference) => {
        return findEntryByPath(entries, reference)
      })
      .filter((entry) => entry !== undefined) ?? []

  const globEntries = props.glob ? findEntriesByGlob(entries, props.glob) : []

  const mergedEntries = [...referenceEntries, ...globEntries]

  const itemEntries = mergedEntries.map((entry) => {
    return {
      href: getHrefByEntry(entry),
      ...entry.data,
    }
  })

  // Render the block
  return BlockComponent ? (
    <BlockComponent {...props} items={items ?? itemEntries} />
  ) : null
}

export { Block }
