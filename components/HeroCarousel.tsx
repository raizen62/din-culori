'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

interface CarouselSlide {
  id: number;
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoplayInterval?: number;
}

export default function HeroCarousel({
  slides,
  autoplayInterval = 5000,
}: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="relative w-full h-full"
      plugins={[
        Autoplay({
          delay: autoplayInterval,
          stopOnInteraction: false,
        }),
        Fade(),
      ]}
      opts={{
        loop: true,
        align: 'center',
      }}
    >
      <CarouselContent className="h-screen m-0">
        {slides.map((slide) => (
          <CarouselItem
            key={slide.id}
            className="w-full h-screen p-0 basis-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                className="object-cover"
                quality={90}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
