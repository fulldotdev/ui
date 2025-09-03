import type { BlockProps } from "@/lib/types"
import { AutoForm } from "@/components/auto-form"
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Section } from "@/components/elements/section"
import { Social } from "@/components/elements/social"
import { Tile } from "@/components/elements/tile"
import { Writeup } from "@/components/elements/writeup"

export default function ({ children, form, size, items, align }: BlockProps) {
  return (
    <Section id="contact">
      <Container className="max-w-screen-md lg:px-12">
        {children && (
          <Writeup size={size} align={align}>
            {children}
          </Writeup>
        )}
        <div className="flex w-full flex-wrap justify-center gap-x-16 gap-y-8 not-first:mt-12">
          {items?.map(({ title, description, href }, i) => (
            <Tile
              className="flex max-w-md min-w-2xs grow-1 basis-2xs flex-col items-center"
              key={i}
            >
              <Column align={align} className="w-full">
                {href && <Social variant="secondary" href={href} />}
                <Abstract className="not-first:mt-6" size={size} align={align}>
                  {title && <h3>{title}</h3>}
                  {description && <p>{description}</p>}
                </Abstract>
              </Column>
            </Tile>
          ))}
        </div>
        {form && <AutoForm className="not-first:mt-16" {...form} />}
      </Container>
    </Section>
  )
}
