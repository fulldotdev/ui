import { taglineField } from "stackbit/components/tagline-field"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Hero7Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  tagline?: string
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

function Hero7({
  className,
  level = 1,
  title,
  description,
  tagline,
  buttons,
  image,
  ...props
}: Hero7Props) {
  return (
    <section
      className={cn("relative flex flex-col gap-16 pb-16", className)}
      {...props}
    >
      {/* {image && <img className="h-auto w-full" {...image} />} */}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-start px-4 lg:px-8">
        <div className="bg-foreground ring-foreground mt-8 mb-12 aspect-[2.5170603675] w-full overflow-hidden rounded-lg ring-4 ring-inset">
          <iframe
            className="aspect-[2.5170603675] h-full w-full max-w-screen-xl"
            src="https://player.vimeo.com/video/831834222?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1&amp;autoplay=1&amp;muted=1"
            width="1918"
            height="762"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; loop"
            title="anti-slip-profiles video noaudio"
          ></iframe>
        </div>

        {taglineField && (
          <Paragraph size="sm" className="text-primary">
            {tagline}
          </Paragraph>
        )}
        <Heading className="max-w-4xl not-first:mt-4" size="6xl" level={level}>
          {title}
        </Heading>
        {description && (
          <Paragraph size="xl" className="mt-4">
            {description}
          </Paragraph>
        )}
        {buttons && (
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
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

export { Hero7 }
