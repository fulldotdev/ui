import type { BlockProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Icon } from "@/components/elements/icon"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Tile } from "@/components/elements/tile"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  links,
  items,
  size,
  align = "center",
}: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center">
        <Column align={align}>
          {children && (
            <Writeup className="not-first:mt-4" size={size} align={align}>
              {children}
            </Writeup>
          )}
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-8 not-last:mb-4" align={align}>
              {links.map((link, i) => (
                <Link
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size={size}
                  {...link}
                />
              ))}
            </Wrap>
          )}
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 not-first:mt-12">
            {items?.map(({ title, description, icon }, i) => (
              <Tile
                className={cn(
                  "flex max-w-md grow-1 basis-2xs flex-col items-center",
                  {
                    "max-w-sm min-w-3xs basis-3xs": size === "sm",
                    "min-w-5xs basis-5xs max-w-lg": size === "lg",
                  }
                )}
                key={i}
              >
                <Column align={align}>
                  {icon && (
                    <div className="bg-accent rounded-full p-2">
                      <Icon name={icon} />
                    </div>
                  )}
                  <Abstract
                    className="not-first:mt-6"
                    size={size}
                    align={align}
                  >
                    {title && <h3>{title}</h3>}
                    {description && <p>{description}</p>}
                  </Abstract>
                </Column>
              </Tile>
            ))}
          </div>
        </Column>
      </Container>
    </Section>
  )
}
