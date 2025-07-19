import type { BlockProps } from "@/lib/types"

// Get all blocks as an object
const blockImports = import.meta.glob("../blocks/**/*.tsx", {
  eager: true,
})

// Render all blocks
function Block({
  _bookshop_name,
  ...props
}: BlockProps & {
  _bookshop_name?: string
  "bookshop:live"?: boolean
}) {
  // Find the block in the blockImports object
  const blockPath = `../blocks/${_bookshop_name}.tsx`
  const blockImport = blockImports[blockPath] as any
  const BlockComponent = blockImport?.default

  // Render the block
  return BlockComponent ? <BlockComponent {...props} /> : null
}

export { Block }
