import * as React from "react"
import { cn } from "cn"

// YouTube watch, short and share links become privacy-enhanced embeds.
function getEmbedSrc(value?: string) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^www\./, "")
    let id: string | null | undefined
    if (host === "youtube.com" && url.pathname === "/watch") {
      id = url.searchParams.get("v")
    } else if (host === "youtube.com" && url.pathname.startsWith("/shorts/")) {
      id = url.pathname.split("/")[2]
    } else if (host === "youtu.be") {
      id = url.pathname.slice(1)
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined
  } catch {
    return undefined
  }
}

function Video({
  className,
  src,
  title = "Embedded video",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  allowFullScreen = true,
  ...props
}: React.ComponentProps<"iframe">) {
  const embedSrc = getEmbedSrc(src)
  if (!embedSrc) return null
  return (
    <iframe
      data-slot="video"
      src={embedSrc}
      title={title}
      allow={allow}
      allowFullScreen={allowFullScreen}
      className={cn(
        "cn-video w-full",
        src?.includes("/shorts/") ? "aspect-9/16 max-w-xs" : "aspect-video",
        className
      )}
      {...props}
    />
  )
}

export { Video }
