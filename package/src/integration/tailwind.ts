import plugin from 'tailwindcss/plugin'

export const tailwindPlugin = plugin(
  () => {
    // Your plugin logic here
  },
  {
    theme: {
      spacing: {
        'space-sm-1': 'var(--space-sm-1)',
        'space-sm-2': 'var(--space-sm-2)',
        'space-sm-3': 'var(--space-sm-3)',
        'space-sm-4': 'var(--space-sm-4)',
        'space-sm-5': 'var(--space-sm-5)',
        'space-sm-6': 'var(--space-sm-6)',
        'space-md-1': 'var(--space-md-1)',
        'space-md-2': 'var(--space-md-2)',
        'space-md-3': 'var(--space-md-3)',
        'space-md-4': 'var(--space-md-4)',
        'space-md-5': 'var(--space-md-5)',
        'space-md-6': 'var(--space-md-6)',
        'space-lg-1': 'var(--space-lg-1)',
        'space-lg-2': 'var(--space-lg-2)',
        'space-lg-3': 'var(--space-lg-3)',
        'space-lg-4': 'var(--space-lg-4)',
        'space-lg-5': 'var(--space-lg-5)',
        'space-lg-6': 'var(--space-lg-6)',

        'element-sm-1': 'var(--element-sm-1)',
        'element-sm-2': 'var(--element-sm-2)',
        'element-sm-3': 'var(--element-sm-3)',
        'element-md-1': 'var(--element-md-1)',
        'element-md-2': 'var(--element-md-2)',
        'element-md-3': 'var(--element-md-3)',
        'element-lg-1': 'var(--element-lg-1)',
        'element-lg-2': 'var(--element-lg-2)',
        'element-lg-3': 'var(--element-lg-3)',
      },
    },
  }
)
