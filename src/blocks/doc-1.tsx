import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"
import { SidebarNav } from "@/components/sidebar-nav"

export default function ({ menus, title, description, children }: BlockProps) {
  return (
    <Section className="min-h-min py-0">
      <SectionContainer className="flex items-start">
        <SidebarNav
          className="sticky top-24 h-[calc(100vh-56px)] w-3xs max-lg:hidden"
          items={menus}
        />
        <SectionContent className="mx-auto py-12">
          <SectionTitle className="mb-4">{title}</SectionTitle>
          <SectionDescription className="mb-12 !text-lg">
            {description}
          </SectionDescription>
          {children}
        </SectionContent>
      </SectionContainer>
    </Section>
  )
}
