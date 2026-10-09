"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel from "embla-carousel-react"
import { PauseIcon, PlayIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

type MarqueeContextProps = {
  // Rows may move: motion is allowed and a toggle can pause them.
  canMove: boolean
  playing: boolean
  hovered: boolean
  moving: boolean
  pause: () => void
  toggle: () => void
  setHovered: (hovered: boolean) => void
  setRowMoving: (id: string, moving: boolean) => void
  registerToggle: (toggle: HTMLButtonElement) => () => void
}

const MarqueeContext = React.createContext<MarqueeContextProps | null>(null)

function useMarquee() {
  const context = React.useContext(MarqueeContext)
  if (!context) {
    throw new Error("useMarquee must be used within a <Marquee />")
  }
  return context
}

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node)
  else if (ref) ref.current = node
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

// The server renders the static fallback; the browser decides after hydration.
function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true
  )
}

const visible = (element: Element) =>
  element.checkVisibility?.({ visibilityProperty: true }) ??
  element.getClientRects().length > 0

// A toggle pauses the marquee when it can be pressed and seen. The marquee
// hides a toggle through its own wrapper, so visibility is read from the
// button's styles and from the wrapper's parent.
function usable(toggle: HTMLButtonElement) {
  const style = getComputedStyle(toggle)
  const outside = toggle.closest("[data-marquee-control]")?.parentElement
  return (
    !toggle.matches(":disabled") &&
    toggle.getAttribute("aria-disabled") !== "true" &&
    !toggle.closest("[inert]") &&
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    outside != null &&
    visible(outside)
  )
}

function Marquee({
  className,
  ref,
  onFocus,
  ...props
}: React.ComponentProps<"div">) {
  const root = React.useRef<HTMLDivElement>(null)
  const setRoot = React.useCallback(
    (node: HTMLDivElement | null) => {
      root.current = node
      assignRef(ref, node)
    },
    [ref]
  )
  const reducedMotion = useReducedMotion()
  const [toggles, setToggles] = React.useState<HTMLButtonElement[]>([])
  const [controllable, setControllable] = React.useState(false)
  // Focus, dragging and the toggle pause the rows until the toggle plays
  // them again; hovering pauses them only while the pointer is over a row.
  const [playing, setPlaying] = React.useState(true)
  const [hovered, setHovered] = React.useState(false)
  const [movingRows, setMovingRows] = React.useState<ReadonlySet<string>>(
    () => new Set()
  )

  const registerToggle = React.useCallback((toggle: HTMLButtonElement) => {
    setToggles((current) => [...current, toggle])
    return () =>
      setToggles((current) => current.filter((item) => item !== toggle))
  }, [])

  const setRowMoving = React.useCallback((id: string, moving: boolean) => {
    setMovingRows((current) => {
      if (current.has(id) === moving) return current
      const next = new Set(current)
      if (moving) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  // Follow whether a toggle can still be pressed and seen: changes to the
  // toggle and its ancestors, and breakpoints that hide it or its container.
  React.useEffect(() => {
    const element = root.current
    if (!element || toggles.length === 0) {
      setControllable(false)
      return
    }
    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setControllable(toggles.some(usable)))
    }
    const resizes = new ResizeObserver(refresh)
    const mutations = new MutationObserver(refresh)
    for (const toggle of toggles) {
      for (let node: Element | null = toggle; node; node = node.parentElement) {
        if (node.hasAttribute("data-marquee-control")) continue
        mutations.observe(node, {
          attributeFilter: [
            "class",
            "style",
            "hidden",
            "disabled",
            "aria-disabled",
            "inert",
          ],
        })
        if (element.contains(node)) resizes.observe(node)
      }
    }
    setControllable(toggles.some(usable))
    return () => {
      cancelAnimationFrame(frame)
      resizes.disconnect()
      mutations.disconnect()
    }
  }, [toggles])

  const value = React.useMemo<MarqueeContextProps>(
    () => ({
      canMove: controllable && !reducedMotion,
      playing,
      hovered,
      moving: movingRows.size > 0,
      pause: () => setPlaying(false),
      toggle: () => setPlaying((current) => !current),
      setHovered,
      setRowMoving,
      registerToggle,
    }),
    [
      controllable,
      reducedMotion,
      playing,
      hovered,
      movingRows,
      setRowMoving,
      registerToggle,
    ]
  )

  return (
    <MarqueeContext.Provider value={value}>
      <div
        ref={setRoot}
        data-slot="marquee"
        className={cn("relative", className)}
        onFocus={(event) => {
          onFocus?.(event)
          const target = event.target
          if (!toggles.some((toggle) => toggle.contains(target))) {
            setPlaying(false)
          }
        }}
        {...props}
      />
    </MarqueeContext.Provider>
  )
}

const focusableSelector =
  "a[href], area[href], button, input, select, textarea, iframe, summary, [contenteditable], [tabindex]"

const reachable = (element: HTMLElement) =>
  element.tabIndex >= 0 &&
  !element.matches(":disabled") &&
  !element.closest("[inert]") &&
  visible(element)

function MarqueeContent({
  className,
  children,
  reverse = false,
  ref,
  tabIndex,
  onPointerEnter,
  onPointerLeave,
  ...props
}: React.ComponentProps<"div"> & {
  reverse?: boolean
}) {
  const marquee = useMarquee()
  const { canMove, playing, hovered, pause, setHovered, setRowMoving } = marquee
  const id = React.useId()
  const viewport = React.useRef<HTMLDivElement>(null)
  // Embla turns its loop off when the items do not fill the viewport; the row
  // then stays static until its size changes.
  const [fits, setFits] = React.useState(true)
  const [rtl, setRtl] = React.useState(false)
  const [looping, setLooping] = React.useState(false)
  const [generation, setGeneration] = React.useState(0)
  const [tabStop, setTabStop] = React.useState(false)
  const active = canMove && fits

  const options = React.useMemo(
    () => ({
      loop: true,
      dragFree: true,
      active,
      direction: rtl ? ("rtl" as const) : ("ltr" as const),
    }),
    [active, rtl]
  )
  const plugins = React.useMemo(
    () => [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        playOnInit: false,
        stopOnFocusIn: false,
        stopOnInteraction: true,
        direction: reverse ? "backward" : "forward",
      }),
    ],
    [reverse]
  )
  const [emblaRef, api] = useEmblaCarousel(options, plugins)

  const setViewport = React.useCallback(
    (node: HTMLDivElement | null) => {
      viewport.current = node
      emblaRef(node)
      assignRef(ref, node)
    },
    [emblaRef, ref]
  )

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      const loops =
        api.internalEngine().options.active &&
        api.internalEngine().options.loop &&
        api.scrollSnapList().length > 1
      if (api.internalEngine().options.active && !loops) setFits(false)
      setLooping(loops)
      setGeneration((current) => current + 1)
    }
    update()
    api.on("init", update).on("reInit", update).on("pointerDown", pause)
    return () => {
      api.off("init", update).off("reInit", update).off("pointerDown", pause)
    }
  }, [api, pause])

  React.useEffect(() => {
    setRowMoving(id, looping)
    return () => setRowMoving(id, false)
  }, [id, looping, setRowMoving])

  React.useEffect(() => {
    if (!api || !looping) return
    const autoScroll = api.plugins().autoScroll
    if (playing && !hovered) autoScroll?.play()
    else autoScroll?.stop()
  }, [api, looping, playing, hovered, generation])

  // A static row scrolls natively. It gets a tab stop when it overflows and
  // has no reachable content of its own, unless the caller set tabIndex.
  React.useEffect(() => {
    const element = viewport.current
    if (!element) return
    const measure = () => {
      setRtl(getComputedStyle(element).direction === "rtl")
      setTabStop(
        element.scrollWidth > element.clientWidth &&
          ![...element.querySelectorAll<HTMLElement>(focusableSelector)].some(
            reachable
          )
      )
    }
    const observer = new ResizeObserver(() => {
      measure()
      setFits(true)
    })
    observer.observe(element)
    for (const item of element.firstElementChild?.children ?? []) {
      observer.observe(item)
    }
    measure()
    return () => observer.disconnect()
  }, [children])

  return (
    <div
      ref={setViewport}
      data-slot="marquee-content"
      data-reverse={reverse ? "" : undefined}
      data-active={looping ? "" : undefined}
      tabIndex={tabIndex ?? (!looping && tabStop ? 0 : undefined)}
      className={cn(
        "overflow-x-auto contain-inline-size outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-active:overflow-hidden",
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.pointerType === "mouse") setHovered(true)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        setHovered(false)
      }}
      {...props}
    >
      <div className="-ms-[var(--marquee-gap,--spacing(4))] flex justify-center-safe">
        {children}
      </div>
    </div>
  )
}

function MarqueeItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="marquee-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 ps-[var(--marquee-gap,--spacing(4))]",
        className
      )}
      {...props}
    />
  )
}

function MarqueeToggle({
  className,
  variant = "outline",
  size = "icon-sm",
  playLabel,
  pauseLabel,
  ref,
  onClick,
  ...props
}: Omit<React.ComponentProps<"button">, "type"> &
  VariantProps<typeof buttonVariants> & {
    playLabel: string
    pauseLabel: string
  }) {
  const { moving, playing, toggle, registerToggle } = useMarquee()
  const button = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (button.current) return registerToggle(button.current)
  }, [registerToggle])

  const setButton = React.useCallback(
    (node: HTMLButtonElement | null) => {
      button.current = node
      assignRef(ref, node)
    },
    [ref]
  )

  // The wrapper shows the toggle while a row moves, so the button's own
  // hidden attribute, class and style stay the caller's.
  return (
    <span data-marquee-control hidden={!moving} className="contents">
      <button
        ref={setButton}
        type="button"
        data-slot="marquee-toggle"
        data-state={playing ? "playing" : "paused"}
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size }),
          "group/marquee-toggle",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) toggle()
        }}
        {...props}
      >
        <PauseIcon className="group-data-[state=paused]/marquee-toggle:hidden" />
        <PlayIcon className="hidden group-data-[state=paused]/marquee-toggle:block" />
        <span className="sr-only">{playing ? pauseLabel : playLabel}</span>
      </button>
    </span>
  )
}

export { Marquee, MarqueeContent, MarqueeItem, MarqueeToggle, useMarquee }
