import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/elements/header"
import { Link } from "@/components/elements/link"
import { Logo, LogoImage } from "@/components/elements/logo"
import { MainMenu } from "@/components/elements/main-menu"
import { MobileMenu } from "@/components/elements/menu"
import { Social } from "@/components/elements/social"
import Locales from "@/components/locale-selector"

export default function ({
  image,
  title,
  menus,
  links,
  socials,
  locales,
}: BlockProps) {
  return (
    <>
      <Header className="-mb-2.5 lg:relative">
        <HeaderContainer className="flex h-14 w-full items-center gap-2">
          {menus && menus.length > 0 && (
            <MobileMenu className="lg:hidden" items={menus} />
          )}
          {(image || title) && (
            <Logo href="/" className="mr-4 max-sm:hidden">
              {image?.src && <LogoImage {...image} />}
              {title}
            </Logo>
          )}
          {links && links.length > 0 && (
            <div className="ml-auto inline-flex flex-nowrap items-center gap-2">
              {socials?.map((social, i) => (
                <Social
                  className="-ml-1.5"
                  key={i}
                  variant="ghost"
                  href={social}
                />
              ))}
              {locales && <Locales locales={locales} />}
              {links.map(({ text, href }, i) => (
                <Link
                  className={i < links.length - 1 ? "max-sm:hidden" : ""}
                  key={i}
                  href={href}
                  variant={i === links.length - 1 ? "outline" : "ghost"}
                >
                  {text}
                </Link>
              ))}
            </div>
          )}
        </HeaderContainer>
      </Header>
      <Header className="max-lg:hidden">
        <HeaderContainer>
          {menus && <MainMenu className="mx-auto" items={menus} />}
        </HeaderContainer>
      </Header>
    </>
  )
}
