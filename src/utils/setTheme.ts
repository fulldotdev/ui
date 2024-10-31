export default function setTheme(newValue?: string) {
  newValue && localStorage.setItem('theme', newValue)
  const value = localStorage.getItem('theme')

  const isDark =
    value === 'dark' ||
    (value === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  console.log({ value, isDark })

  document.documentElement.classList.toggle('dark', isDark)

  document.querySelectorAll('.themer').forEach((themer) => {
    themer.classList.toggle('dark', isDark)
    themer?.querySelectorAll('option').forEach((option) => {
      option.selected = option.value === value
    })
  })
}
