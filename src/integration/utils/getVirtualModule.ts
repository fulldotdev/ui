export default (name: string, content: string) => {
  const virtualModuleId = `virtual:${name}`
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: `virtual-${name}`,
    resolveId(id: any) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: any) {
      if (id === resolvedVirtualModuleId) {
        return `${content}`
      }
    },
  }
}
