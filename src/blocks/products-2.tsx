import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import { Tile, TileContent, TileImage, TileTitle } from "@/components/ui/tile"

export default function ({ children, items, title, description }: BlockProps) {
  return (
    <Section id="products">
      <SectionContainer>
        {(title || description || children) && (
          <SectionContent>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
            {children}
          </SectionContent>
        )}
        <SectionGrid className="not-first:mt-16">
          {items?.map(({ title, image, images, href, price }, i) => (
            <Tile key={i} href={href} panel={false}>
              <TileImage
                className="aspect-4/3 object-cover"
                {...(image || images?.[0])}
              />
              <TileContent>
                <TileTitle>{title}</TileTitle>
                {price && <p>{price as string}</p>}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
