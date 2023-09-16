import normalizeWheel from 'normalize-wheel';
import { isFirefox } from '../utils/bom';

const mousewheel = function (element: Element, callback: Function) {
  if (element && element.addEventListener) {
    element.addEventListener(
      isFirefox() ? 'DOMMouseScroll' : 'mousewheel',
      function (this: any, event: Event) {
        const normalized = normalizeWheel(event);
        callback && callback.apply(this, [event, normalized]);
      },
    );
  }
};

export default {
  bind(el: Element, binding: any) {
    mousewheel(el, binding.value);
  },
};
