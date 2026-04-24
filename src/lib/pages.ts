export function hrefFromPageId(id: string) {
  if (id === "index") return "/"
  return `/${id}/`
}
