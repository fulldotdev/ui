import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { Meteors } from "@/components/magicui/meteors"
import { Particles } from "@/components/magicui/particles"
import { RetroGrid } from "@/components/magicui/retro-grid"
import { Ripple } from "@/components/magicui/ripple"
import { WarpBackground } from "@/components/magicui/warp-background"

function GradientBackground({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_closest-side_at_center,color-mix(in_srgb,var(--primary)_50%,transparent)_0%,transparent_100%)] opacity-50",
        className
      )}
      {...props}
    />
  )
}

function AiBackground({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_closest-side_at_center,hsla(292,91.4%,72.5%,0.3)_25%,hsla(47.9,95.8%,53.1%,0.3)_50%,hsla(158.1,64.4%,51.6%,0.25)_75%,transparent_100%)] opacity-40",
        className
      )}
      {...props}
    />
  )
}

type Props =
  | ({
      variant?: "grid"
    } & React.ComponentProps<typeof GridPattern>)
  | ({
      variant?: "animated-grid"
    } & React.ComponentProps<typeof AnimatedGridPattern>)
  | ({
      variant?: "flickering-grid"
    } & React.ComponentProps<typeof FlickeringGrid>)
  | ({
      variant?: "retro-grid"
    } & React.ComponentProps<typeof RetroGrid>)
  | ({
      variant?: "dots"
    } & React.ComponentProps<typeof DotPattern>)
  | ({
      variant?: "meteors"
    } & React.ComponentProps<typeof Meteors>)
  | ({
      variant?: "particles"
    } & React.ComponentProps<typeof Particles>)
  | ({
      variant?: "ripple"
    } & React.ComponentProps<typeof Ripple>)
  | ({
      variant?: "warp"
    } & React.ComponentProps<typeof WarpBackground>)
  | ({
      variant?: "gradient"
    } & React.ComponentProps<typeof GradientBackground>)
  | ({
      variant?: "ai"
    } & React.ComponentProps<typeof AiBackground>)

const COMPONENTS = {
  grid: GridPattern,
  "animated-grid": AnimatedGridPattern,
  "flickering-grid": FlickeringGrid,
  "retro-grid": RetroGrid,
  dots: DotPattern,
  meteors: Meteors,
  particles: Particles,
  ripple: Ripple,
  warp: WarpBackground,
  gradient: GradientBackground,
  ai: AiBackground,
} as const

const backgroundVariants = cva("", {
  variants: {
    variant: {
      grid: "",
      "animated-grid": "opacity-50",
      "flickering-grid": "opacity-50",
      "retro-grid": "",
      dots: "",
      meteors: "",
      particles: "",
      ripple: "lg:scale-200",
      warp: "absolute inset-0",
      gradient: "",
      ai: "",
    },
  },
})

function Background({ variant, className, ...props }: Omit<Props, "children">) {
  if (!variant) return null
  const Comp = COMPONENTS[variant]
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <Comp
        className={cn(backgroundVariants({ variant }))}
        {...(props as any)}
      />
    </div>
  )
}

export { Background }
