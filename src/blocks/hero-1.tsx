import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

export interface Hero1Props extends React.ComponentProps<"section"> {
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

function Hero1({ className, children, buttons, image, ...props }: Hero1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        {children && (
          <Writeup className="text-center" size="7xl">
            {children}
          </Writeup>
        )}
        {buttons && buttons.length > 0 && (
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
        {image && <img className="mt-16 rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero1 }
