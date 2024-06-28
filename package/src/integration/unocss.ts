import { definePreset, presetUno } from 'unocss'

export default definePreset((options?: any) => {
  return {
    name: 'fullUI',
    presets: [presetUno()],
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
        1: 'var(--radius-1)',
        2: 'var(--radius-2)',
        3: 'var(--radius-3)',
      },
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        border: 'var(--border)',
      },
      backgroundColor: {
        fulldev: 'var(--background)',
      },
      borderColor: {
        fulldev: 'var(--border)',
      },
      textColor: {
        fulldev: 'var(--text)',
      },
    },
  }
})
