import { inject } from 'vue';
import type { CarouselContext } from './Carousel.vue';

export function useCarousel() {
  return inject<CarouselContext | undefined>('$CarouselContext', undefined);
}
