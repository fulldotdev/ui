import * as React from "react"
import { cn } from "cn"
import * as lucide from "lucide-react"
import {
  siBehance,
  siDiscord,
  siDribbble,
  siFacebook,
  siFlickr,
  siGithub,
  siInstagram,
  siPinterest,
  siReddit,
  siSnapchat,
  siSoundcloud,
  siSpotify,
  siTelegram,
  siTiktok,
  siTumblr,
  siTwitch,
  siVimeo,
  siWhatsapp,
  siX,
  siYelp,
  siYoutube,
  type SimpleIcon,
} from "simple-icons"

// Brand logos for social and contact links. Other Simple Icons are left out,
// because the package bundles every logo into one module.
const brands: Record<string, SimpleIcon> = {
  behance: siBehance,
  discord: siDiscord,
  dribbble: siDribbble,
  facebook: siFacebook,
  flickr: siFlickr,
  github: siGithub,
  instagram: siInstagram,
  pinterest: siPinterest,
  reddit: siReddit,
  snapchat: siSnapchat,
  soundcloud: siSoundcloud,
  spotify: siSpotify,
  telegram: siTelegram,
  tiktok: siTiktok,
  tumblr: siTumblr,
  twitch: siTwitch,
  vimeo: siVimeo,
  whatsapp: siWhatsapp,
  x: siX,
  yelp: siYelp,
  youtube: siYoutube,
}

// The icon for a link, by a part of its href.
const hrefIcons = {
  "x.com": "x",
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  pinterest: "pinterest",
  youtube: "youtube",
  tiktok: "tiktok",
  snapchat: "snapchat",
  reddit: "reddit",
  tumblr: "tumblr",
  "wa.me": "whatsapp",
  telegram: "telegram",
  discord: "discord",
  vimeo: "vimeo",
  flickr: "flickr",
  yelp: "yelp",
  spotify: "spotify",
  behance: "behance",
  dribbble: "dribbble",
  soundcloud: "soundcloud",
  github: "github",
  twitch: "twitch",
  "tel:": "phone",
  "mailto:": "mail",
  "maps.app.goo.gl": "map-pin",
  linkedin: "linkedin",
} as const

type Source = "lucide" | "simple"
type Resolved =
  | { source: "lucide"; icon: lucide.LucideIcon }
  | { source: "simple"; icon: SimpleIcon }

// `map-pin` is the `MapPin` export, aliases included.
function lucideIcon(name: string) {
  const key = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
  const icon = (lucide as Record<string, unknown>)[key]
  if (key === "Icon" || typeof icon !== "object" || icon === null) return
  return icon as lucide.LucideIcon
}

function find(source: Source, name: string): Resolved | undefined {
  if (source === "simple") {
    const icon = brands[name]
    return icon && { source, icon }
  }
  const icon = lucideIcon(name)
  return icon && { source, icon }
}

// Resolve an icon by name, or derive one from a link href. Names may start
// with `lucide:` or `simple:` to pick a set when both have the name.
function resolveIcon(name?: string | number, href?: string) {
  const named = name != null && name !== ""
  let key = named ? String(name) : undefined
  let order: Source[] = ["lucide", "simple"]

  if (!key && href) {
    const match = Object.keys(hrefIcons).find((part) => href.includes(part))
    if (match) {
      key = hrefIcons[match as keyof typeof hrefIcons]
      order = ["simple", "lucide"]
    }
  }

  const link = find("lucide", "link")
  if (!key) return href ? link : undefined

  const [prefix, icon] = key.includes(":") ? key.split(":") : [undefined, key]
  if (prefix === "lucide" || prefix === "simple") order = [prefix]

  for (const source of order) {
    const resolved = find(source, icon)
    if (resolved) return resolved
  }
  // A link always gets an icon, even when its brand has no logo.
  return named ? undefined : link
}

function Icon({
  className,
  name,
  href,
  ...props
}: Omit<React.ComponentProps<"svg">, "name"> & {
  name?: string | number
  href?: string
}) {
  const resolved = resolveIcon(name, href)
  if (!resolved) return null
  const labelled =
    "aria-label" in props || "aria-labelledby" in props || "role" in props
  const shared = {
    "data-slot": "icon",
    width: 24,
    height: 24,
    "aria-hidden": labelled ? undefined : true,
    className: cn("size-[1em] text-base", className),
  }

  if (resolved.source === "lucide") {
    const LucideIcon = resolved.icon
    return <LucideIcon {...shared} {...props} />
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...shared}
      {...props}
    >
      <path d={resolved.icon.path} />
    </svg>
  )
}

export { Icon }
