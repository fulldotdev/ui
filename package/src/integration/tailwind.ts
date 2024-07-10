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
      'space-7': 'var(--space-7)',
    },
    borderRadius: {
      1: 'var(--radius-1)',
      2: 'var(--radius-2)',
      3: 'var(--radius-3)',
    },
    fontSize: {
      1: 'var(--text-1)',
      2: 'var(--text-2)',
      3: 'var(--text-3)',
      4: 'var(--text-4)',
      5: 'var(--text-5)',
      6: 'var(--text-6)',
      7: 'var(--text-7)',
    },
    colors: {
      background: 'var(--background)',
      text: 'var(--text)',
      border: 'var(--border)',
    },
  },
})
