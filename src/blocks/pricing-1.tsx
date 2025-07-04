import { Check } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { money } from "@/lib/utils"
import { Link } from "@/components/ui/link"
import { List, ListItem } from "@/components/ui/list"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileFooter,
  TileTitle,
} from "@/components/ui/tile"

export default function ({
  children,
  title,
  description,
  price,
  unit,
  list,
  links,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        <Tile className="not-first:mt-12">
          <TileContent>
            <TileTitle className="text-xl">{title}</TileTitle>
            {description && (
              <TileDescription className="mt-3">{description}</TileDescription>
            )}
            {price && (
              <div className="mt-4">
                <span className="text-2xl font-medium">{money(price)}</span>
                {unit && <span className="ml-1.5 text-sm">/ {unit}</span>}
              </div>
            )}
            {list && list.length > 0 && (
              <List className="mt-6">
                {list.map((item) => (
                  <ListItem key={item}>
                    <Check className="text-primary" />
                    {item}
                  </ListItem>
                ))}
              </List>
            )}
          </TileContent>
          <TileFooter className="flex w-full flex-row gap-4">
            {links?.map(({ href, text }, i) => (
              <Link
                className="w-full"
                href={href}
                key={href}
                variant={i === 0 ? "default" : "ghost"}
              >
                {text}
              </Link>
            ))}
          </TileFooter>
        </Tile>
      </SectionContainer>
    </Section>
  )
}
