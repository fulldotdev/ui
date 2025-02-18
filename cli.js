#! /usr/bin/env node
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

console.log('running fulldev-ui cli...')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const components = [
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

const content = [
  {
    source: './netlify',
    target: 'netlify',
  },
  {
    source: './src/content.config.ts',
    target: 'src/content.config.ts',
  },
  {
    source: './stackbit',
    target: 'stackbit',
  },
  {
    source: './netlify.toml',
    target: 'netlify.toml',
  },
  {
    source: './renovate.json',
    target: 'renovate.json',
  },
  {
    source: './stackbit.config.ts',
    target: 'stackbit.config.ts',
  },
]

function copyItems(items) {
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
}

yargs(hideBin(process.argv))
  .command('components', 'Copy components and related files', () => {
    console.log('copying components...')
    copyItems(components)
  })
  .command('content', 'Copy content and related files', () => {
    console.log('copying content...')
    copyItems(content)
  })
  .command('all', 'Copy both components and content files', () => {
    console.log('copying all files...')
    copyItems([...components, ...content])
  })
  .demandCommand(1, 'You need to specify either "components", "content", or "all"')
  .parse()
