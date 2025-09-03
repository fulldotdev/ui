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

function RainbowBackground({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes rainbow-smooth-1 {
          0%, 100% { background-position: 0% 0% }
          25% { background-position: 100% 25% }
          50% { background-position: 200% 50% }
          75% { background-position: 100% 75% }
        }
        @keyframes rainbow-smooth-2 {
          0%, 100% { background-position: 0% 100% }
          33% { background-position: 150% 0% }
          66% { background-position: 300% 100% }
        }
        @keyframes rainbow-smooth-3 {
          0%, 100% { background-position: 50% 50% }
          50% { background-position: 150% 150% }
        }
      `}</style>

      {/* Primary seamless rainbow gradient */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          background:
            "linear-gradient(120deg, var(--color-1), var(--color-2), var(--color-3), var(--color-4), var(--color-5), var(--color-1), var(--color-2), var(--color-3))",
          backgroundSize: "400% 400%",
          animation: "rainbow-smooth-1 25s ease-in-out infinite",
        }}
      />

      {/* Secondary layer with different seamless pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "linear-gradient(-60deg, transparent 0%, var(--color-3) 20%, transparent 40%, var(--color-5) 60%, transparent 80%, var(--color-1) 100%)",
          backgroundSize: "500% 500%",
          animation: "rainbow-smooth-2 35s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle slow-moving radial overlay */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, var(--color-2) 0%, transparent 35%, var(--color-4) 65%, transparent 100%)",
          backgroundSize: "300% 300%",
          animation: "rainbow-smooth-3 50s ease-in-out infinite",
        }}
      />
    </div>
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
  | ({
      variant?: "rainbow"
    } & React.ComponentProps<typeof RainbowBackground>)
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
  rainbow: RainbowBackground,
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
      rainbow: "",
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
