"use client"

import * as React from "react"
import { cn } from "cn"
import { MoonIcon, SunIcon } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

// Puts the theme in a `dark` class on <html>, follows the system until the
// visitor picks one, and remembers that choice.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

const subscribe = () => () => {}

function ThemeToggle({
  className,
  variant = "ghost",
  size = "icon-sm",
  label = "Toggle theme",
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  label?: string
}) {
  const { resolvedTheme, setTheme } = useTheme()
  // The theme is only known in the browser, so the server renders no state.
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const dark = mounted ? resolvedTheme === "dark" : undefined

  return (
    <Button
      data-slot="theme-toggle"
      variant={variant}
      size={size}
      aria-pressed={dark}
      data-pressed={dark ? "" : undefined}
      className={cn("relative", className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setTheme(dark ? "light" : "dark")
      }}
      {...props}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export { ThemeProvider, ThemeToggle }
