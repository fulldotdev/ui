import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"

        className="absolute inset-0 size-full rounded-lg object-cover grayscale dark:brightness-20"
      />
    </AspectRatio>
  )
}
