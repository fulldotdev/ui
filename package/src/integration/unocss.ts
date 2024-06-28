import { definePreset } from 'unocss'

export default definePreset((options?: any) => {
  return {
    name: 'fullUI',
    rules: [
      ['.space-1', { margin: 'var(--space-1)' }],
      ['.space-2', { margin: 'var(--space-2)' }],
      ['.space-3', { margin: 'var(--space-3)' }],
      ['.space-4', { margin: 'var(--space-4)' }],
      ['.space-5', { margin: 'var(--space-5)' }],
      ['.space-6', { margin: 'var(--space-6)' }],
      ['.element-1', { padding: 'var(--element-1)' }],
      ['.element-2', { padding: 'var(--element-2)' }],
      ['.element-3', { padding: 'var(--element-3)' }],
      ['.radius-1', { 'border-radius': 'var(--radius-1)' }],
      ['.radius-2', { 'border-radius': 'var(--radius-2)' }],
      ['.radius-3', { 'border-radius': 'var(--radius-3)' }],
    ],
  }
})
