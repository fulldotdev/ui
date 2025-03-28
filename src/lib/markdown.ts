import fs, { promises as fsPromises } from "fs"
import path from "path"
import yaml from "yaml"

// --------------------------------------------------------------------------
// Read
// --------------------------------------------------------------------------

export async function readEntry(collection: string, id: string) {
  const allEntries = import.meta.glob("/src/content/**/*.{md,mdx}")
  const path = `${collection}/${id}.md`

  const foundKey = Object.keys(allEntries).find((key) => key.endsWith(path))
  const foundValue = foundKey ? allEntries[foundKey] : undefined
  const loadedFile = foundValue
    ? ((await foundValue()) as {
        frontmatter: Record<string, any>
      })
    : undefined

  return {
    collection: collection,
    id: id,
    data: loadedFile && loadedFile?.frontmatter,
  }
}

export async function readEntries(collection: string, ids: string[]) {
  const entriesPromises = ids.map((id) => readEntry(collection, id))
  return await Promise.all(entriesPromises)
}

export async function readCollection(collection: string) {
  const allEntries = import.meta.glob("/src/content/**/*.{md,mdx}")
  const collectionPath = `/src/content/${collection}/`
  const filteredKeys = Object.keys(allEntries).filter((key) =>
    key.includes(collectionPath)
  )

  const entryPromises = filteredKeys.map((key) => {
    const id = key.split("/").pop()?.split(".")[0] || ""
    return readEntry(collection, id)
  })

  const entries = await Promise.all(entryPromises)
  return entries.filter(Boolean)
}

// --------------------------------------------------------------------------
// Create
// --------------------------------------------------------------------------

export async function createEntry(entry: {
  collection: string
  id: string
  data?: Record<string, unknown>
  body?: string
}) {
  const folderPath = path.join("src/content/", entry.collection)

  // Create the file content
  const fileContent = `---\n${yaml.stringify(entry.data)}---\n\n${entry.body || ""}`

  // Create the full path including any nested directories
  const filePath = path.join(folderPath, `${entry.id}.md`)
  const dirPath = path.dirname(filePath)

  // Create all necessary directories
  await fsPromises.mkdir(dirPath, { recursive: true })

  // Write the file
  await fsPromises.writeFile(filePath, fileContent)
}

export async function createEntries(
  entries: Parameters<typeof createEntry>[0][]
) {
  const promises = entries.map((entry) => createEntry(entry))
  await Promise.all(promises)
}

// --------------------------------------------------------------------------
// Delete
// --------------------------------------------------------------------------

export async function deleteFolder(collection: string, folder: string) {
  const fullPath = path.join(process.cwd(), "src/content", collection, folder)

  if (fs.existsSync(fullPath)) {
    await fsPromises.rm(fullPath, { recursive: true, force: true })
  }
}
