const plugin = require('tailwindcss/plugin')

const tailwindPlugin = plugin(function ({
  addUtilities,
}: {
  addUtilities: any
}) {
  const newUtilities = {
    '.space-test': {
      margin: 'var(--space-1)',
    },

    '.rounded-1': {
      borderRadius: 'var(--radius-1)',
    },
    '.rounded-2': {
      borderRadius: 'var(--radius-2)',
    },
    '.rounded-3': {
      borderRadius: 'var(--radius-3)',
    },

    '.background': {
      backgroundColor: 'var(--background)',
    },
  }

  addUtilities(newUtilities)
})

module.exports = tailwindPlugin
