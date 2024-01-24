export default (bookshopName: string | undefined): object | undefined => {
  if (!bookshopName) return
  const files = import.meta.glob('/src/components/**/*.bookshop.yml', {
    eager: true,
  })
  const path = `/src/components/${bookshopName}.bookshop.yml`
  const file: any = files[path]
  if (!file) return
  return file.default.config
}
