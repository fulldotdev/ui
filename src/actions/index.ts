import { writeFile } from "fs/promises"
import { join } from "path"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { rehype } from "rehype"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import { remark } from "remark"
import remarkStringify from "remark-stringify"
import { stringify } from "yaml"

import { pageSchema } from "@/schemas/page"

export const server = {
  uploadImage: defineAction({
    accept: "form",
    input: z.object({
      file: z.instanceof(File),
    }),
    handler: async (input) => {
      const { file } = input
      const fileName = `${Date.now()}-${file.name}`
      const filePath = join(process.cwd(), "public", "images", fileName)

      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      return `/images/${fileName}`
    },
  }),
  updatePage: defineAction({
    input: z.object({
      filePath: z.string(),
      data: pageSchema,
      body: z.string().optional(),
    }),
    handler: async (input) => {
      const { filePath, data, body } = input

      // Generate frontmatter with proper YAML formatting
      const frontmatter = stringify(data)
      const markdown = await remark()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .process(body || "")
      const content = `---\n${frontmatter}\n---\n\n${markdown || ""}`
      await writeFile(filePath, content, "utf-8")

      console.log(`Page saved to: ${filePath}`)
      return { success: true, filePath, data }
    },
  }),
}
