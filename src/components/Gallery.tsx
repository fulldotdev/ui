import {
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselRoot,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
  images?: {
    src?: string
    alt?: string
  }[]
}

function Gallery({ images, className }: Props) {
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>()
  const [emblaThumbnailApi, setEmblaThumbnailApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaMainApi || !emblaThumbnailApi) return

    const onSelect = () => {
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbnailApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }

    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)

    // Initial selection
    onSelect()

    return () => {
      emblaMainApi.off('select', onSelect)
      emblaMainApi.off('reInit', onSelect)
    }
  }, [emblaMainApi, emblaThumbnailApi])

  const onThumbClick = (index: number) => {
    if (!emblaMainApi) return
    emblaMainApi.scrollTo(index)
  }

  return (
    images && (
      <div className={cn('w-full flex flex-col gap-2', className)}>
        <CarouselRoot
          className="relative"
          setApi={setEmblaMainApi}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="rounded-md overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </CarouselRoot>

        <CarouselRoot setApi={setEmblaThumbnailApi}>
          <CarouselContent className="flex gap-2 ml-0">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={`pl-0 basis-1/5 cursor-pointer border rounded-md overflow-hidden ${
                  index === selectedIndex ? 'border-ring border-2' : ''
                }`}
                onClick={() => onThumbClick(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselRoot>
      </div>
    )
  )
}

export { Gallery }
