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

export default function ({
  children,
  links,
  background,
  size,
  align = "center",
}: Props) {
  return (
    <section className="container overflow-hidden">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <div
        className={cn("bg-background rounded-2xl border p-4 lg:p-8", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <div className="py-12 lg:py-16">
          <Writeup className="text-balance" size={size}>
            {children}
          </Writeup>
          <Links size={size} links={links} />
        </div>
      </div>
    </section>
  )
}
