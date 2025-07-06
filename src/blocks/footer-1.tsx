import type { BlockProps } from "@/lib/types"
import { Channel } from "@/components/ui/channel"
import { Logo, LogoImage } from "@/components/ui/logo"
import { Section, SectionContainer } from "@/components/ui/section"
import { Social } from "@/components/ui/social"

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
              <p className="text-muted-foreground text-sm not-first:mt-3">
                {description}
              </p>
            )}
            {channels && channels.length > 0 && (
              <div className="flex flex-col items-start gap-3 not-first:mt-8">
                {channels.map((channel, i) => (
                  <Channel key={i} {...channel} />
                ))}
              </div>
            )}{" "}
            <div className="mt-6 flex gap-4">
              {socials?.map((social, i) => (
                <Social
                  className="text-muted-foreground hover:text-foreground !size-auto"
                  key={i}
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
          {menus?.map((menu, i) => (
            <div className="menu flex flex-col items-start gap-4" key={i}>
              <h4 className="text-foreground text-sm font-semibold">
                {menu.text}
              </h4>
              <menu className="flex w-full flex-col items-start gap-3">
                {menu.links?.map(({ href, text }) => (
                  <a
                    className="text-muted-foreground hover:text-foreground font-normal transition-colors"
                    key={href}
                    href={href}
                  >
                    {text}
                  </a>
                ))}
              </menu>
            </div>
          ))}
        </div>
        <div className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t py-6 md:flex-row md:items-center">
          {copyright && (
            <p className="text-muted-foreground mr-auto text-xs">
              © {new Date().getFullYear()} {copyright}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {links?.map(({ text, href }, i) => (
              <a
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                key={i}
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
