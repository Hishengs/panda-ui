import { App } from 'vue';
import './carousel.scss';
import Carousel from './Carousel.vue';
import CarouselItem from './CarouselItem.vue';

Carousel.install = function (app: App) {
  app.component(Carousel.name, Carousel);
  app.component(CarouselItem.name, CarouselItem);
};

export { Carousel, CarouselItem };

export default Carousel;
