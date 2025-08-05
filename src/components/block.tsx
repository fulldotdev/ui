// Get all blocks as an object
const blockImports = import.meta.glob("../blocks/**/*.tsx", {
  eager: true,
})

// Render all blocks
function Block({ block, ...props }: any) {
  // Find the block in the blockImports object
  const blockPath = `../blocks/${block}.tsx`
  const blockImport = blockImports[blockPath] as any
  const BlockComponent = blockImport?.default

  // Render the block
  return BlockComponent ? <BlockComponent {...props} /> : null
}

export { Block }
