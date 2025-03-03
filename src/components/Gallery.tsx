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
import { v4 as uuidv4 } from 'uuid'
import { Image } from './image'

interface Props extends React.ComponentProps<'div'> {
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
      <div
        className={cn('w-full flex flex-col bg-muted', className)}
        {...props}
      >
        <CarouselRoot
          className="relative"
          setApi={setEmblaMainApi}
        >
          <CarouselContent className="ml-0 mr-4 mt-4">
            {images.map((image) => (
              <CarouselItem
                className="pl-4"
                key={uuidv4()}
              >
                <Image
                  className="rounded-md"
                  {...image}
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
                className="basis-1/5 pl-2"
                key={uuidv4()}
              >
                <Image
                  className={cn('cursor-pointer rounded-sm ring-1 my-4', {
                    'ring-ring': index === selectedIndex,
                  })}
                  onClick={() => onThumbClick(index)}
                  {...image}
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
