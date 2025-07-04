// Get all blocks as an object
const blockImports = import.meta.glob("../blocks/**/*.tsx", {
  eager: true,
})

// Render all blocks
function Blocks({ blocks }: { blocks?: (any & { block: string })[] }) {
  return (
    <>
      {blocks?.map(({ block, variant, ...props }, i) => {
        // Find the block in the blockImports object
        const blockPath = `../blocks/${block}-${variant}.tsx`
        const blockImport = blockImports[blockPath] as any
        const BlockComponent = blockImport?.default

        // Render the block
        return BlockComponent ? (
          <BlockComponent key={blockPath} {...props} />
        ) : null
      })}
    </>
  )
}

export { Blocks }
