import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Writeup } from "@/components/ui/writeup"

export interface Media2Props extends React.ComponentProps<"section"> {
  tagline?: string
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

function Media2({
  className,
  children,
  tagline,
  buttons,
  image,
  ...props
}: Media2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="relative mx-auto grid w-full max-w-screen-xl items-center gap-y-8 px-4 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 lg:px-8">
        <div className="flex flex-col items-start">
          {children && (
            <Writeup className="text-center" size="5xl">
              {children}
            </Writeup>
          )}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 not-first:mt-6">
              {buttons.map(({ text, href, ...button }, i) => (
                <Button
                  key={href}
                  variant={i === 0 ? "default" : "ghost"}
                  asChild
                  {...button}
                >
                  <a href={href}>{text}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
        {image && <img className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Media2 }
