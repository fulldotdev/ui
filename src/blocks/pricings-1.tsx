import { useState } from "react"
import { Check, X } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { money } from "@/lib/utils"
import { Link } from "@/components/ui/link"
import { List, ListItem } from "@/components/ui/list"
import { Paragraph } from "@/components/ui/paragraph"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tile,
  TileContent,
  TileFooter,
  TileTagline,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, items }: BlockProps) {
  const [duration, setDuration] = useState<string>("month")
  const hasPrices = items?.some((item) => "prices" in item)
  return (
    <Section>
      <SectionContainer className="flex flex-col">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {children && <SectionContent size="4xl">{children}</SectionContent>}
          {hasPrices && (
            <Select
              value={duration}
              onValueChange={(value) => setDuration(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Maand abonnement</SelectItem>
                <SelectItem value="year">Jaarlijks abonnement</SelectItem>
                <SelectItem value="twoyears">2 jaarlijks abonnement</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <SectionGrid className="not-first:mt-12">
          {items?.map(
            ({
              tagline,
              title,
              description,
              price,
              prices,
              unit,
              list,
              links,
              icon = "check",
            }) => (
              <Tile key={title} className="justify-between">
                <TileContent>
                  {tagline && (
                    <TileTagline className="text-sm">{tagline}</TileTagline>
                  )}
                  <TileTitle>{title}</TileTitle>
                  {description && <Paragraph>{description}</Paragraph>}
                  {(price || prices?.[duration]) && (
                    <div className="mt-4">
                      <span className="text-2xl font-medium">
                        {money(prices?.[duration] || price)}
                      </span>
                      {unit && <span className="text-sm">/ {unit}</span>}
                    </div>
                  )}
                  {list && list.length > 0 && (
                    <List className="mt-6 text-sm">
                      {list.map((item) => (
                        <ListItem key={item}>
                          {icon === "check" && (
                            <Check className="text-primary" />
                          )}
                          {icon === "cross" && (
                            <X className="text-muted-foreground" />
                          )}
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  )}
                </TileContent>
                {links && links.length > 0 && (
                  <TileFooter className="flex flex-col gap-2">
                    {links.map(({ href, text }, id) => (
                      <Link
                        key={href}
                        href={href}
                        variant={id === 0 ? "default" : "outline"}
                      >
                        {text}
                      </Link>
                    ))}
                  </TileFooter>
                )}
              </Tile>
            )
          )}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
