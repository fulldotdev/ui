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
  name,
}: BlockProps) {
  return (
    <Section className="py-0">
      <SectionContainer className="flex flex-col">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(30px,1fr))] justify-between gap-16 py-16">
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
              <div className="flex flex-col items-start gap-2 not-first:mt-8">
                {channels.map((channel, i) => (
                  <div className="flex items-center gap-3 text-sm" key={i}>
                    <Social variant="outline" href={channel.href} />
                    {channel.text}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4 not-first:mt-8">
              {socials?.map((social, i) => (
                <Social
                  className="text-muted-foreground hover:text-foreground size-5"
                  key={i}
                  variant="link"
                  href={social}
                />
              ))}
            </div>
          </div>
          {menus?.map((menu, i) => (
            <div className="menu flex flex-col items-start gap-4" key={i}>
              <h4 className="text-foreground text-sm font-semibold whitespace-nowrap">
                {menu.text}
              </h4>
              <menu className="flex w-full flex-col items-start gap-3">
                {menu.links?.map(({ href, text }) => (
                  <a
                    className="text-muted-foreground hover:text-foreground text-sm font-normal transition-colors"
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
        <div className="flex flex-col flex-wrap items-start justify-between gap-x-6 gap-y-4 border-t py-8 md:flex-row md:items-center">
          {name && (
            <p className="text-muted-foreground mr-auto text-xs">
              © {new Date().getFullYear()} {name}
            </p>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
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
