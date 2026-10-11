import { StrictMode, useEffect } from "react"
import { useTheme } from "next-themes"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/ui/theme-toggle"
import { TooltipProvider } from "@/components/ui/tooltip"

import "@/styles/globals.css"

import { App } from "./app"

// next-themes ignores a cleared storage (a storage event without a key), which
// the docs around the previews treat as a return to the system theme.
function FollowClearedStorage() {
  const { setTheme } = useTheme()
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === null)
        setTheme("system")
    }
    addEventListener("storage", onStorage)
    return () => removeEventListener("storage", onStorage)
  }, [setTheme])
  return null
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* The gallery renders only in the browser, where React warns about the
    theme script that server rendering needs; keep it inert here. */}
    <ThemeProvider scriptProps={{ type: "application/json" }}>
      <FollowClearedStorage />
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
