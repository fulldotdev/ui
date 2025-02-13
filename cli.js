#! /usr/bin/env node
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Items to copy with source and target paths
const items = [
  {
    source: './src/blocks',
    target: 'src/blocks',
  },
  {
    source: './src/components',
    target: 'src/components',
  },
  {
    source: './src/lib',
    target: 'src/lib',
  },
  {
    source: './src/schemas',
    target: 'src/schemas',
  },
  {
    source: './src/styles',
    target: 'src/styles',
  },
  {
    source: './components.json',
    target: 'components.json',
  },
  {
    source: './tailwind.config.js',
    target: 'tailwind.config.js',
  },
]

items.forEach((item) => {
  const sourcePath = path.join(__dirname, item.source)
  const targetPath = path.join(process.cwd(), item.target)

  // Create parent directory for files
  const targetDir = fs.statSync(sourcePath).isDirectory() ? targetPath : path.dirname(targetPath)
  fs.ensureDirSync(targetDir)

  // Copy item
  fs.copySync(sourcePath, targetPath)
  console.log(`${item.target} copied successfully!`)
})
