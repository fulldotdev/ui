import plugin from 'tailwindcss/plugin'

export const tailwindPlugin = plugin(
  () => {
    // Your plugin logic here
  },
  {
    extend: {
      colors: {
        test: 'red',
      },
      borderRadius: {
        'radius-1': 'var(--radius-1)',
        'radius-2': 'var(--radius-2)',
        'radius-3': 'var(--radius-3)',
      },
    },
  }
)
