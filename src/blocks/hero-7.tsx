import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

export interface Hero7Props extends React.ComponentProps<"section"> {
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  image?: {
    src: string
    alt: string
  }
}

function Hero7({ className, children, buttons, image, ...props }: Hero7Props) {
  return (
    <section
      className={cn("relative flex flex-col gap-16 pb-16", className)}
      {...props}
    >
      {children && <Writeup size="6xl">{children}</Writeup>}
      {buttons && (
        <div className="inline-flex flex-wrap justify-center gap-2 not-first:mt-8">
          {buttons.map(({ href, text, ...button }, i) => (
            <Button
              key={href}
              variant={i === 0 ? "default" : "ghost"}
              size="lg"
              asChild
              {...button}
            >
              <a href={href}>{text}</a>
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}

export { Hero7 }
