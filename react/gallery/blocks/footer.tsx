import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Footer1 } from "@/components/blocks/footer-1"
import { Footer2 } from "@/components/blocks/footer-2"
import { Footer3 } from "@/components/blocks/footer-3"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "footer-1": () => {
    return (
      <>
        <Footer1
          brandName="Fulldev UI"
          brandHref="/"
          description="Beautiful React components built with Tailwind CSS. Open source and ready to copy into your projects."
          socials={[
            {
              label: "GitHub",
              href: "https://github.com/fulldotdev/ui",
              icon: "github",
            },
            { label: "Discord", href: "https://discord.gg/", icon: "discord" },
            { label: "X", href: "https://x.com/", icon: "x" },
          ]}
          columns={[
            {
              title: "Product",
              links: [
                { label: "Components", href: "/components/" },
                { label: "Blocks", href: "/blocks/" },
                { label: "Pricing", href: "/blocks/pricing/" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Documentation", href: "/docs/" },
                { label: "Guides", href: "/docs/" },
                { label: "Examples", href: "/blocks/" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/" },
                { label: "Contact", href: "/blocks/contact/" },
                { label: "GitHub", href: "https://github.com/fulldotdev/ui" },
              ],
            },
          ]}
          copyright="© 2026 fulldev/ui"
        />
      </>
    )
  },
  "footer-2": () => {
    return (
      <>
        <Footer2
          brandName="Fulldev UI"
          brandHref="/"
          description="Beautiful React components built with Tailwind CSS. Open source and ready to use."
          links={[
            { label: "Components", href: "/components/" },
            { label: "Blocks", href: "/blocks/" },
            { label: "Docs", href: "/docs/" },
            { label: "GitHub", href: "https://github.com/fulldotdev/ui" },
          ]}
          socials={[
            {
              label: "GitHub",
              href: "https://github.com/fulldotdev/ui",
              icon: "github",
            },
            { label: "Discord", href: "https://discord.gg/", icon: "discord" },
            { label: "X", href: "https://x.com/", icon: "x" },
          ]}
          copyright="© 2026 fulldev/ui"
          navigationLabel="Footer 2 navigation"
        />
      </>
    )
  },
  "footer-3": () => {
    return (
      <>
        <Footer3
          brandName="Fulldev UI"
          brandHref="/"
          description="Beautiful React components built with Tailwind CSS. Open source and ready to copy into your projects."
          socials={[
            {
              label: "GitHub",
              href: "https://github.com/fulldotdev/ui",
              icon: "github",
            },
            { label: "Discord", href: "https://discord.gg/", icon: "discord" },
            { label: "X", href: "https://x.com/", icon: "x" },
          ]}
          columns={[
            {
              title: "Product",
              links: [
                { label: "Components", href: "/components/" },
                { label: "Blocks", href: "/blocks/" },
                { label: "Pricing", href: "/blocks/pricing/" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Documentation", href: "/docs/" },
                { label: "Guides", href: "/docs/" },
                { label: "Examples", href: "/blocks/" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/" },
                { label: "Contact", href: "/blocks/contact/" },
                { label: "GitHub", href: "https://github.com/fulldotdev/ui" },
              ],
            },
          ]}
          copyright="© 2026 fulldev/ui"
          bottomLinks={[
            { label: "Privacy", href: "/" },
            { label: "Terms", href: "/" },
            { label: "Sitemap", href: "/" },
          ]}
          navigationLabel="Footer 3 navigation"
        />
      </>
    )
  },
}

export default demos
