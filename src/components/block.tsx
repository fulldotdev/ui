const blockImports = import.meta.glob("./blocks/**/*.tsx", {
  eager: true,
})

function Block({ type, variant = "1", children, ...props }: any) {
  const blockPath = `./blocks/${type}-${variant}.tsx`
  const blockImport = blockImports[blockPath] as any
  const BlockComponent = blockImport?.default
  return BlockComponent ? (
    <BlockComponent {...props}>{children}</BlockComponent>
  ) : null
}

export { Block }
