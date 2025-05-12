import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

export interface Hero4Props extends React.ComponentProps<"section"> {
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

function Hero4({ className, children, buttons, image, ...props }: Hero4Props) {
  return (
    <section
      className={cn(
        "bg-background relative flex min-h-screen items-center py-32",
        className
      )}
      {...props}
    >
      {image && (
        <img
          className="absolute top-0 left-0 size-full object-cover"
          {...image}
        />
      )}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col justify-center px-4 lg:px-8">
        {children && <Writeup size="7xl">{children}</Writeup>}
        {buttons && (
          <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
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
      </div>
    </section>
  )
}

export { Hero4 }
