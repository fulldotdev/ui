export function hrefFromPageId(id: string) {
  if (id === "index") return "/"
  if (id.endsWith("/index")) return `/${id.slice(0, -"/index".length)}/`
  return `/${id}/`
}
