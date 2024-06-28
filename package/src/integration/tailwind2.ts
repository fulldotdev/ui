import plugin from 'tailwindcss/plugin'

export default plugin(({ matchUtilities, theme }) => {}, {
  theme: {
    colors: {
      test: 'green',
    },
  },
})
