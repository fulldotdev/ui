import * as React from "react"

import { Video } from "@/components/ui/video"

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
    <div className="flex flex-col gap-10 p-6">
      <Example title="YouTube watch link">
        <Video
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="Example video"
          className="max-w-2xl rounded-xl"
        />
      </Example>
      <Example title="Short">
        <Video
          src="https://www.youtube.com/shorts/aqz-KE-bpKQ"
          title="Example short"
          className="rounded-xl"
        />
      </Example>
      <Example title="Unsupported link renders nothing">
        <Video src="https://example.com/video.mp4" />
        <p className="text-sm text-muted-foreground">
          Only YouTube links become embeds.
        </p>
      </Example>
    </div>
  )
}
