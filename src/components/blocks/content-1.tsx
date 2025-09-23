import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Prose from "@/components/elements/prose"

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
    <section className="overflow-hidden py-24">
      <div
        className={cn("container flex flex-col", {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        })}
      >
        <Prose className="not-first:mt-6" size={size}>
          {children}
        </Prose>
        <Links className="not-first:mt-8" size={size} links={links} />
        <Image className="rounded-lg not-first:mt-16" {...image} />
      </div>
    </section>
  )
}
