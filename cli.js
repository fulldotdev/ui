#! /usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const base = {
  dependencies: [
    '@astrojs/tailwind@6.0.0',
    '@astrojs/vue',
    '@iconify-json/tabler',
    '@internationalized/date',
    '@vee-validate/zod',
    '@vueuse/core',
    'astro',
    'astro-seo',
    'class-variance-authority',
    'clsx',
    'embla-carousel-vue',
    'lucide-vue-next',
    'marked',
    'node-html-parser',
    'radix-vue',
    'tailwind-merge@2.6.0',
    'tailwindcss@3.4.17',
    'tailwindcss-animate@1.0.7',
    'typescript',
    'vaul-vue',
    'vee-validate',
    'vue',
    'zod',
  ],
  devDependencies: [],
  files: [
    'components.json',
    'tailwind.config.js',
    'astro.config.ts',
    'src/blocks',
    'src/components',
    'src/lib',
    'src/schemas',
    'src/styles',
    'src/pages',
  ],
}

const advanced = {
  dependencies: ['@astrojs/netlify', '@astrojs/sitemap', 'astro-robots-txt', '@stackbit/cms-git'],
  devDependencies: [
    '@stackbit/types',
    '@astrojs/check',
    'prettier',
    'prettier-plugin-astro',
    'prettier-plugin-astro-organize-imports',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  files: [
    '.gitignore',
    '.prettierignore',
    '.prettierrc.yaml',
    'tsconfig.json',
    'netlify',
    'netlify.toml',
    'renovate.json',
    'stackbit',
    'stackbit.config.ts',
    'src/content.config.ts',
  ],
}

function addFiles(files) {
  files.forEach((file) => {
    const sourcePath = path.join(__dirname, `./${file}`)
    const targetPath = path.join(process.cwd(), file)

    // Create parent directory for files
    const targetDir = fs.statSync(sourcePath).isDirectory() ? targetPath : path.dirname(targetPath)
    fs.ensureDirSync(targetDir)

    // Copy item
    fs.copySync(sourcePath, targetPath)
    console.log(`added successfully: "${file}"`)
  })
}

function installDependencies(dependencies) {
  console.log(`Installing dependencies: "${dependencies}"...`)
  const command = `pnpm i ${dependencies.join(' ')}`
  execSync(command, { cwd: process.cwd(), stdio: 'inherit' })
}

function installDevDependencies(devDependencies) {
  console.log(`Installing dev dependencies: "${devDependencies}"...`)
  const command = `pnpm i ${devDependencies.join(' ')} --save-dev`
  execSync(command, { cwd: process.cwd(), stdio: 'inherit' })
}

yargs(hideBin(process.argv))
  .command('init', 'Initialize fulldev-ui', () => {
    console.log('initializing fulldev-ui...')
    installDependencies(base.dependencies)
    installDevDependencies(base.devDependencies)
    addFiles(base.files)
  })
  .command('add', 'Add project files', () => {
    console.log('adding project files...')
    addFiles(base.files)
  })
  .command('advanced-init', 'UNSTABLE: Initialize advanced files', () => {
    console.log('initializing advanced...')
    installDependencies([...base.dependencies, ...advanced.dependencies])
    installDevDependencies([...base.devDependencies, ...advanced.devDependencies])
    addFiles([...base.files, ...advanced.files])
  })
  .command('advanced-add', 'UNSTABLE: Update advanced files', () => {
    console.log('updating advanced...')
    addFiles([...base.files, ...advanced.files])
  })
  .demandCommand(1, 'You need to specify either "init" or "add"')
  .parse()
