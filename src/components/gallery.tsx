import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselRoot,
  type CarouselApi,
} from "@/components/ui/carousel"

import { Image } from "./image"

interface Props extends React.ComponentProps<"div"> {
  images?: React.ComponentProps<typeof Image>[]
}

function Gallery({ images, className, ...props }: Props) {
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>()
  const [emblaThumbnailApi, setEmblaThumbnailApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaMainApi || !emblaThumbnailApi) return

    const onSelect = () => {
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbnailApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }

    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)

    // Initial selection
    onSelect()

    return () => {
      emblaMainApi.off("select", onSelect)
      emblaMainApi.off("reInit", onSelect)
    }
  }, [emblaMainApi, emblaThumbnailApi])

  const onThumbClick = (index: number) => {
    if (!emblaMainApi) return
    emblaMainApi.scrollTo(index)
  }

  return (
    images && (
      <div
        className={cn("bg-muted flex w-full flex-col pb-2", className)}
        {...props}
      >
        <CarouselRoot className="relative" setApi={setEmblaMainApi}>
          <CarouselContent className="mt-4 mr-4 mb-2 ml-0">
            {images.map((image) => (
              <CarouselItem className="pl-4" key={uuidv4()}>
                <Image className="rounded-md" {...image} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-1 max-md:hidden" />
              <CarouselNext className="right-1 max-md:hidden" />
            </>
          )}
        </CarouselRoot>
        {images.length > 1 && (
          <CarouselRoot setApi={setEmblaThumbnailApi}>
            <CarouselContent className="mr-4 ml-2 flex">
              {images.map((image, index) => (
                <CarouselItem className="basis-1/5 pl-2" key={uuidv4()}>
                  <Image
                    className={cn(
                      "my-2 cursor-pointer rounded-sm ring-1 ring-transparent",
                      {
                        "ring-ring": index === selectedIndex,
                      }
                    )}
                    onClick={() => onThumbClick(index)}
                    {...image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </CarouselRoot>
        )}
      </div>
    )
  )
}

export { Gallery }
