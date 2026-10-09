import * as React from "react"

import { Banner, BannerContainer, bannerVariants } from "@/components/ui/banner"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <Example title="Closable, remembered for the session">
        <Banner storageKey="gallery-banner" className="border-y">
          <BannerContainer
            className="items-center py-2"
            closeLabel="Close banner"
          >
            <p className="text-sm">
              Fulldev UI now ships React components and blocks.
            </p>
          </BannerContainer>
        </Banner>
      </Example>
      <Example title="Floating, without a close button">
        <Banner variant="floating">
          <BannerContainer showClose={false} className="items-center py-2">
            <p className="text-sm">Scheduled maintenance on Sunday night.</p>
          </BannerContainer>
        </Banner>
      </Example>
      <Example title="Variant classes">
        <code className="text-xs text-muted-foreground">
          {bannerVariants({ variant: "floating" })}
        </code>
      </Example>
    </div>
  )
}
