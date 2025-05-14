import { z } from "zod"

export const pathSchema = z.string().transform(async (path) => {
  const contentPath = path.split("content/")[1]
  const filePath = contentPath.split("/").slice(1).join("/")
  const id = filePath.split(".")[0]
  return id
})
