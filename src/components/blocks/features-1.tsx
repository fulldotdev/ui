import type { FeaturesProps } from "@/schemas/blocks/features"
import { cn } from "@/lib/utils"
import { Abstract } from "@/components/elements/abstract"
import { Icon } from "@/components/elements/icon"
import { Link } from "@/components/elements/link"
import { Links } from "@/components/elements/links"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  align = "center",
  children,
  links,
  features,
  size,
}: FeaturesProps) {
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
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 not-first:mt-12">
            {features?.map(({ title, description, icon, link }, i) => (
              <div
                key={i}
                className={cn(
                  "flex max-w-md grow-1 basis-2xs flex-col items-center",
                  {
                    "max-w-sm min-w-3xs basis-3xs": size === "sm",
                    "min-w-5xs basis-5xs max-w-lg": size === "lg",
                    "items-start text-start": align === "start",
                    "items-center text-center": align === "center",
                    "items-end text-end": align === "end",
                  }
                )}
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
