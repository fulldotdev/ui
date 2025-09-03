import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
  SectionGrid,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileImage,
  TileTitle,
} from "@/components/elements/tile"

export default function ({
  children,
  items,
  title,
  description,
  image,
}: BlockProps) {
  return (
    <Section id="products">
      {image?.src && (
        <img
          {...image}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <Container>
        {(title || description) && (
          <SectionContent className="mx-auto text-center" size="lg">
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </SectionContent>
        )}
        <SectionGrid className="not-first:mt-16">
          {items?.map(({ title, image, images, href, price }, i) => (
            <Tile key={i} href={href} panel={false}>
              <div className="relative">
                <img
                  className="absolute right-2 bottom-2 h-6 transition-opacity group-hover:opacity-0"
                  src="/logo.svg"
                  alt="logo"
                />
                <TileImage
                  className="aspect-4/3 object-cover group-hover:opacity-35"
                  {...(image || images?.[0])}
                />
                <span className="text-accent-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium opacity-0 transition-opacity group-hover:opacity-100">
                  + Bekijk product
                </span>
              </div>
              <TileContent>
                <span className="text-muted-foreground text-sm lg:hidden">
                  + Bekijk product
                </span>
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
      </Container>
    </Section>
  )
}
