import type { BlockProps } from "@/lib/types"
import { Logo, LogoImage } from "@/components/ui/logo"
import { Paragraph } from "@/components/ui/paragraph"
import { Section, SectionContainer } from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import { Channels } from "@/components/channels"
import { Menu } from "@/components/menu"

export default function ({
  logo,
  description,
  links,
  socials,
  channels,
  menus,
  copyright,
  hours,
}: BlockProps) {
  return (
    <Section className="py-0">
      <SectionContainer className="flex flex-col">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(30px,1fr))] justify-between gap-16 border-t py-16">
          <div className="col-span-3 flex max-w-xs flex-col">
            {logo && (
              <Logo href="/">
                {logo?.src && <LogoImage {...logo} />}
                {logo?.title && logo.title}
              </Logo>
            )}
            {description && (
              <Paragraph
                className="text-muted-foreground not-first:mt-3"
                size="sm"
              >
                {description}
              </Paragraph>
            )}
            {channels && <Channels className="not-first:mt-6" {...channels} />}
            <div className="mt-6 flex gap-4">
              {socials?.map((social) => (
                <Social
                  className="text-muted-foreground hover:text-foreground !size-auto"
                  variant="link"
                  href={social}
                />
              ))}
            </div>
          </div>
          {hours && (
            <div className="text-muted-foreground col-span-3 flex basis-[192px] flex-col gap-2 text-sm">
              <h4 className="text-foreground text-sm font-semibold">
                Drukke tijden
              </h4>
              <img src="/images/busy.webp" alt="Drukke tijden" />
            </div>
          )}
          {hours && (
            <div className="text-muted-foreground col-span-2 flex basis-[192px] flex-col gap-2 text-sm">
              <h4 className="text-foreground text-sm font-semibold">
                {hours.title}
              </h4>
              <p className="text-muted-foreground mb-2 text-xs">
                {hours.description}
              </p>
              <p className="flex justify-between">
                <span>ma.</span> {hours.ma}
              </p>
              <p className="flex justify-between">
                <span>di.</span> {hours.di}
              </p>
              <p className="flex justify-between">
                <span>wo.</span> {hours.wo}
              </p>
              <p className="flex justify-between">
                <span>do.</span> {hours.do}
              </p>
              <p className="flex justify-between">
                <span>vr.</span> {hours.vr}
              </p>
              <p className="flex justify-between">
                <span>za.</span> {hours.za}
              </p>
              <p className="flex justify-between">
                <span>zo.</span> {hours.zo}
              </p>
            </div>
          )}
          {menus?.map((menu) => (
            <Menu
              className="col-span-2 basis-[300px] text-sm"
              key={menu.text}
              {...menu}
            />
          ))}
        </div>
        <div className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t py-6 md:flex-row md:items-center">
          {copyright && (
            <p className="text-muted-foreground mr-auto text-xs">
              © {new Date().getFullYear()} {copyright}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links?.map(({ text, href }) => (
              <a
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                key={href}
                href={href}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}
