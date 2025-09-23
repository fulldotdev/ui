import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({ children, links, size, align = "center" }: Props) {
  return (
    <section className="container py-24">
      <div
        className={cn(
          "bg-card text-card-foreground flex flex-col items-center rounded-lg border px-4 py-16 lg:px-8",
          {
            "items-start text-start": align === "start",
            "items-center text-center": align === "center",
            "items-end text-end": align === "end",
          }
        )}
      >
        <Writeup className="max-w-3xl" size={size}>
          {children}
        </Writeup>
        <Links className="not-first:mt-10" size={size} links={links} />
      </div>
    </section>
  )
}
