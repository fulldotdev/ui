import type { BlockProps } from "@/lib/types"
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Icon } from "@/components/elements/icon"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Tile } from "@/components/elements/tile"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"
import { Safari } from "@/components/magicui/safari"

export default function ({
  children,
  tagline,
  links,
  items,
  size,
  align,
}: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center">
        <Column align={align}>
          {tagline && (
            <span className="text-accent-foreground text-sm font-medium">
              {tagline}
            </span>
          )}
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
          <div className="grid gap-x-8 gap-y-16 not-first:mt-12 md:grid-cols-2">
            {items?.map(({ title, description, image, href }, i) => (
              <Tile key={i} href={href} className="relative">
                {image?.src && (
                  <Safari className="h-auto w-full" imageSrc={image?.src} />
                )}
                <Abstract className="not-first:mt-6" size={size} align={align}>
                  {title && <h3>{title}</h3>}
                  {description && <p>{description}</p>}
                </Abstract>
              </Tile>
            ))}
          </div>
        </Column>
      </Container>
    </Section>
  )
}
