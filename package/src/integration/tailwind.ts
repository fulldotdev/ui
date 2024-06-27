import plugin from 'tailwindcss/plugin'

export const tailwindPlugin = plugin(
  () => {
    // Your plugin logic here
  },
  {
    theme: {
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',

        'element-1': 'var(--element-1)',
        'element-2': 'var(--element-2)',
        'element-3': 'var(--element-3)',
      },
    },
  }
)
