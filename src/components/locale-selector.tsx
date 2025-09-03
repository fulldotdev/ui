import { Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "@/components/elements/link"

const labels = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
  fr: "Français",
}

export default function Locales({
  locales,
}: {
  locales: (keyof typeof labels)[]
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Flag className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[200px] flex-col gap-2 p-1.5">
        {locales.map((locale) => (
          <Link
            className="justify-start"
            variant="ghost"
            key={locale}
            href={`/${locale === "nl" ? "" : locale}`}
          >
            {labels[locale]}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )
}
