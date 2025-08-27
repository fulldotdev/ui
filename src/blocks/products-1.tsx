import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import { Tile, TileContent, TileImage, TileTitle } from "@/components/ui/tile"

export default function ({
  children,
  items,
  title,
  description,
  image,
}: BlockProps) {
  return (
    <Section>
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <SectionContainer>
        {(title || description) && (
          <SectionContent className="mx-auto text-center" size="lg">
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
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
        {children && (
          <SectionContent className="mx-auto not-first:mt-16">
            {children}
          </SectionContent>
        )}
      </SectionContainer>
    </Section>
  )
}
