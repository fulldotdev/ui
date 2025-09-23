import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Icon from "@/components/elements/icon"
import Link from "@/components/elements/link"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  features?: {
    title?: string
    description?: string
    icon?: string
    link?: React.ComponentProps<typeof Link>
  }[]
}

export default function ({
  align = "start",
  size = "default",
  children,
  links,
  features,
}: Props) {
  return (
    <section className="py-16">
      <div
        className={cn("container flex flex-col items-center", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="not-first:mt-4" size={size}>
          {children}
        </Writeup>
        <Links size={size} links={links} />
        {features && features.length > 0 && (
          <div
            className={cn(
              "grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-16 gap-y-8 not-first:mt-16",
              {
                "justify-between": align === "start",
                "justify-center": align === "center",
                "justify-end": align === "end",
              }
            )}
          >
            {features?.map(({ title, description, icon, link }, i) => (
              <div
                key={i}
                className={cn("flex flex-col items-center", {
                  "items-start text-start": align === "start",
                  "items-center text-center": align === "center",
                  "items-end text-end": align === "end",
                })}
              >
                {icon && (
                  <div className="bg-accent rounded-full p-2">
                    <Icon name={icon} />
                  </div>
                )}
                <Abstract className="not-first:mt-6" size={size} align={align}>
                  {title && <h3>{title}</h3>}
                  {description && <p>{description}</p>}
                </Abstract>
                <Link size={size} {...link} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
