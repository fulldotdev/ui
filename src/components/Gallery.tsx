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
      <div className={cn('w-full flex flex-col bg-muted', className)}>
        <CarouselRoot
          className="relative"
          setApi={setEmblaMainApi}
        >
          <CarouselContent className="ml-0 mr-4 mt-4">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-4"
              >
                <img
                  className="rounded-md"
                  src={image.src}
                  alt={image.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 max-md:hidden" />
          <CarouselNext className="right-1 max-md:hidden" />
        </CarouselRoot>

        <CarouselRoot setApi={setEmblaThumbnailApi}>
          <CarouselContent className="flex ml-2 mr-4">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 pl-2"
              >
                <img
                  className={cn(
                    'cursor-pointer rounded-sm ring-1 my-4',
                    index === selectedIndex ? 'ring-ring' : 'ring-transparent'
                  )}
                  onClick={() => onThumbClick(index)}
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
