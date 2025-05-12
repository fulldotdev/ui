import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

export interface Media1Props extends React.ComponentProps<"section"> {
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  image: {
    src: string
    alt: string
  }
}

function Media1({
  className,
  children,
  buttons,
  image,
  ...props
}: Media1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        {children && (
          <Writeup className="text-center" size="5xl">
            {children}
          </Writeup>
        )}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 not-first:mt-8">
            {buttons.map(({ text, href, ...button }, i) => (
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
        <img className="mt-16 rounded-lg" {...image} />
      </div>
    </section>
  )
}

export { Media1 }
