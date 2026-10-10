import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/ui/theme-toggle"
import { TooltipProvider } from "@/components/ui/tooltip"

import "@/styles/globals.css"

import { App } from "./app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* The gallery renders only in the browser, where React warns about the
    theme script that server rendering needs; keep it inert here. */}
    <ThemeProvider scriptProps={{ type: "application/json" }}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
