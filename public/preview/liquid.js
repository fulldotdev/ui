// Docs-only bridge. The component controllers come from the native library.
const report = () =>
  parent.postMessage(
    { type: "fulldev:liquid-height", height: document.body.scrollHeight },
    location.origin
  )
new ResizeObserver(report).observe(document.querySelector("#example"))
window.addEventListener("load", report)
window.addEventListener("message", ({ source, origin, data }) => {
  if (
    source !== parent ||
    origin !== location.origin ||
    data?.type !== "fulldev:liquid-theme"
  )
    return
  document.documentElement.classList.toggle("dark", data.dark)
  document.documentElement.style.colorScheme = data.dark ? "dark" : "light"
  document.querySelector("#preview-theme").textContent = data.css
  for (const href of data.fonts ?? []) {
    if (
      [...document.querySelectorAll("link[data-font]")].some(
        (link) => link.href === href
      )
    )
      continue
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    link.dataset.font = ""
    document.head.append(link)
  }
  report()
})
parent.postMessage({ type: "fulldev:liquid-ready" }, location.origin)
