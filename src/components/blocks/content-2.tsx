import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({
  align = "center",
  children,
  links,
  image,
  size,
}: Props) {
  return (
    <section className="py-24">
      <div className="container">
        <div
          className={cn(
            "grid w-full auto-cols-fr items-start gap-y-8 lg:grid-flow-col lg:gap-x-16",
            {
              "items-start": align === "start",
              "items-center": align === "center",
              "items-end": align === "end",
            }
          )}
        >
          <div className="flex w-full flex-col items-start">
            <Writeup size={size}>{children}</Writeup>
            <Links size={size} links={links} />
          </div>
          <Image className="rounded-lg" {...image} />
        </div>
      </div>
    </section>
  )
}
