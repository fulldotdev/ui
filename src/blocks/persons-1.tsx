import type { BlockProps } from "@/lib/types"
import { Section, SectionContainer } from "@/components/ui/section"
import { Tile, TileImage, TileTagline, TileTitle } from "@/components/ui/tile"
import { Writeup } from "@/components/ui/writeup"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {children && <Writeup className="text-center">{children}</Writeup>}
        <div className="flex flex-wrap justify-center gap-16 not-first:mt-16">
          {items?.map(({ href, image, title, tagline }, i) => (
            <Tile
              className="relative flex shrink-1 basis-3xs flex-col items-center"
              key={i}
              href={href}
              panel={false}
            >
              <TileImage
                className="aspect-square !rounded-full object-cover"
                alt={`${title} ${tagline}`}
                {...image}
              />
              <TileTitle>{title}</TileTitle>
              <TileTagline className="text-muted-foreground text-center text-sm">
                {tagline}
              </TileTagline>
            </Tile>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
