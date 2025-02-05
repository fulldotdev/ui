import { cva, type VariantProps } from 'class-variance-authority'

export { default as Textarea } from './Textarea.vue'

export const textareaVariants = cva(
  'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
