import { z } from "zod"

// Helper schema for content file references with auto-loaded frontmatter
export const referenceSchema = z
  .string()
  .transform(async (path) => {
    const contentPath = path.split("content/")[1]
    const collection = contentPath.split("/")[0]
    const filePath = contentPath.split("/").slice(1).join("/")
    const id = filePath.split(".")[0]

    return {
      collection,
      id,
    }
  })
  .pipe(
    z.object({
      collection: z.string(),
      id: z.string(),
    })
  )
