import { ArrowRightIcon, CalendarIcon } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, items, link }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="lg">
            {children}
          </SectionContent>
        )}
        {link && (
          <Link
            className="not-first:mt-4"
            href={link.href}
            variant="link"
            size="lg"
          >
            {link.text}
            <ArrowRightIcon />
          </Link>
        )}
        <SectionGrid className="grid-cols-[repeat(auto-fit,minmax(300px,1fr))] not-first:mt-16">
          {items?.map(({ href, title, description, image, published }, i) => (
            <Tile key={i} href={href}>
              {image && (
                <TileImage className="aspect-4/3 object-cover" {...image} />
              )}
              <TileContent>
                {published && (
                  <p className="inline-flex items-center gap-2 text-xs leading-none font-medium">
                    <CalendarIcon className="size-[1em]" />
                    {new Date(published).toLocaleDateString("nl-NL")}
                  </p>
                )}
                <TileTitle className="mt-1 text-lg">{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
