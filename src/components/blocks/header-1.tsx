import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/elements/header"
import { Link } from "@/components/elements/link"
import { Logo, LogoImage } from "@/components/elements/logo"
import { Social } from "@/components/elements/social"
import Locales from "@/components/locale-selector"
import { MainMenu } from "@/components/main-nav"
import { MobileMenu } from "@/components/mobile-nav"

export default function ({
  image,
  title,
  menus,
  links,
  locales,
  socials,
  href,
}: BlockProps) {
  return (
    <Header className="z-50">
      <HeaderContainer className="flex justify-between">
        <div className="flex items-center gap-2">
          {menus && menus.length > 0 && (
            <MobileMenu className="lg:hidden" items={menus} />
          )}
          {(image || title) && (
            <Logo href={href} className="mr-4">
              {image?.src && <LogoImage {...image} />}
              {title}
            </Logo>
          )}
          {menus && (
            <MainMenu className="mr-auto max-lg:hidden" items={menus} />
          )}
        </div>
        <div className="flex items-center gap-2">
          {socials?.map((social, i) => (
            <Social
              className="-ml-1.5 hidden sm:flex lg:hidden xl:flex"
              key={i}
              variant="ghost"
              href={social}
            />
          ))}
          {locales && <Locales locales={locales} />}
          {links && links.length > 0 && (
            <div className="inline-flex flex-nowrap items-center gap-2">
              {links.map((link, i) => (
                <Link
                  key={i}
                  className={i < links.length - 1 ? "max-sm:hidden" : ""}
                  variant={i === links.length - 1 ? "outline" : "ghost"}
                  {...link}
                />
              ))}
            </div>
          )}
        </div>
      </HeaderContainer>
    </Header>
  )
}
