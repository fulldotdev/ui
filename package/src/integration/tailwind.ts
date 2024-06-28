import plugin from 'tailwindcss/plugin'

export default plugin(() => {}, {
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
    borderRadius: {
      'radius-1': 'var(--radius-1)',
      'radius-2': 'var(--radius-2)',
      'radius-3': 'var(--radius-3)',
    },
    border: {
      default: '1px solid var(--border)',
      outline: '1px solid var(--border-outline)',
      hover: '1px solid var(--border-hover)',
    },
    color: {
      surface: 'var(--background-surface)',
      subtle: 'var(--background-subtle)',
      soft: 'var(--background-soft)',
      hover: 'var(--background-hover)',
      active: 'var(--background-active)',
      solid: 'var(--solid)',
      'solid-hover': 'var(--solid-hover)',
      'solid-contrast': 'var(--solid-contrast)',
      foreground: 'var(--foreground)',
      'foreground-contrast': 'var(--foreground-contrast)',
    },
  },
})
