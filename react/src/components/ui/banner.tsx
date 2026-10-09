"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"

const bannerVariants = cva("cn-banner relative flex items-center", {
  variants: {
    variant: {
      default: "cn-banner-variant-default w-full",
      floating:
        "cn-banner-variant-floating mx-auto w-[calc(100%-2*var(--gutter,--spacing(4)))] max-w-[calc(var(--container,var(--container-7xl))-2*var(--gutter,--spacing(4)))] overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const BannerContext = React.createContext<(() => void) | null>(null)

// A closed banner stays closed for the browser session when it has a storage key.
const storageToken = (key: string) => `banner:${key}`

function Banner({
  className,
  variant = "default",
  storageKey,
  hidden,
  ...props
}: React.ComponentProps<"aside"> &
  VariantProps<typeof bannerVariants> & {
    storageKey?: string
  }) {
  const [closed, setClosed] = React.useState(false)

  React.useEffect(() => {
    if (storageKey && sessionStorage.getItem(storageToken(storageKey))) {
      setClosed(true)
    }
  }, [storageKey])

  const close = React.useCallback(() => {
    setClosed(true)
    if (storageKey) sessionStorage.setItem(storageToken(storageKey), "hidden")
  }, [storageKey])

  return (
    <BannerContext.Provider value={close}>
      <aside
        data-slot="banner"
        data-variant={variant}
        hidden={closed || hidden}
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      />
    </BannerContext.Provider>
  )
}

function BannerContainer({
  className,
  children,
  showClose = true,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<"div"> & {
  showClose?: boolean
  closeLabel?: string
}) {
  const close = React.useContext(BannerContext)
  return (
    <div
      data-slot="banner-container"
      className={cn(
        "relative mx-auto flex w-full max-w-[var(--container,var(--container-7xl))] gap-4 px-[var(--gutter,--spacing(4))]",
        showClose && "pr-10",
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <button
          type="button"
          data-slot="banner-close"
          aria-label={closeLabel}
          onClick={() => close?.()}
          className="cn-banner-close absolute top-1/2 right-4 z-20 inline-flex shrink-0 -translate-y-1/2 items-center justify-center transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 in-[[data-variant=floating]]:right-5"
        >
          <XIcon className="size-4" />
          <span className="sr-only">{closeLabel}</span>
        </button>
      )}
    </div>
  )
}

export { Banner, BannerContainer, bannerVariants }
