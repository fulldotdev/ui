export function getHref({ collection, id }: any) {
  switch (collection) {
    case "pages":
      return id === "index" ? "/" : `/${id}/`
    default:
      return undefined
  }
}
