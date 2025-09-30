const blockImports = import.meta.glob("./blocks/**/*.tsx", {
  eager: true,
})

function Block({ type, variant = "1", ...props }: any) {
  const blockPath = `./blocks/${type}-${variant}.tsx`
  const blockImport = blockImports[blockPath] as any
  const BlockComponent = blockImport?.default
  return BlockComponent ? <BlockComponent {...props} /> : null
}

export { Block }
