<template>
  <div ref="wrapperRef" :class="cClass" :style="cStyle">
    <!-- prev -->
    <div
      v-if="!hideControllers"
      v-show="showPrevBtn"
      :class="prevCls"
      @click="onPrev"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="prev" :disabled="prevDisabled">
        <button class="panda-carousel-prev-btn">
          <Icon :name="`chevron-${isRtl ? 'right' : 'left'}`" :size="16" />
        </button>
      </slot>
    </div>
    <!-- items wrapper -->
    <div
      class="panda-carousel-items-wrapper"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- items -->
      <div ref="itemsRef" class="panda-carousel-items" :style="itemsStyle">
        <slot />
      </div>
    </div>
    <!-- next -->
    <div
      v-if="!hideControllers"
      v-show="showNextBtn"
      :class="nextCls"
      @click="onNext"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="next" :disabled="nextDisabled">
        <button class="panda-carousel-next-btn">
          <Icon :name="`chevron-${isRtl ? 'left' : 'right'}`" :size="16" />
        </button>
      </slot>
    </div>
    <!-- indicators -->
    <div
      v-if="showIndicators"
      :class="indicatorsCls"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot
        name="indicators"
        :items="state.items"
        :current="state.currentIndex"
      >
        <template v-if="indicatorsType === 'dot'">
          <span
            v-for="i in state.items.length"
            :key="i"
            class="panda-carousel-indicator"
            :class="{
              'panda-carousel-indicator-active': state.currentIndex === i,
            }"
            @click="onIndicatorClick(i)"
            @mouseenter="onIndicatorHover(i)"
          />
        </template>
        <template v-else-if="indicatorsType === 'number' && state.items.length">
          <span class="panda-carousel-indicator-current"
            >{{ state.currentIndex + 1 }}&nbsp;</span
          >
          <span class="panda-carousel-indicator-total"
            >/&nbsp;{{ state.items.length }}</span
          >
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  provide,
} from 'vue';
import Icon from '../icon';
import { on, off } from '../../utils/dom';
import { useGlobal } from '../../utils/hooks';
import _throttle from 'lodash/throttle';
import type { CarouselItemContext } from './CarouselItem.vue';

const prefixCls = 'panda-carousel';

const ANIMATION_TIME = 250;

defineOptions({
  name: 'panda-carousel',
});

// INJECT
const { isRtl } = useGlobal();

// PROPS
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  // 自动切换间隔
  autoplayInterval: {
    type: Number,
    default: 5000,
    validator(val: number) {
      return val >= 0;
    },
  },
  indicatorsType: {
    type: String,
    default: 'dot',
    validator(type: string) {
      return ['dot', 'number'].includes(type);
    },
  },
  indicatorsOutside: Boolean,
  // 指示器触发方式
  indicatorsTrigger: {
    type: String,
    default: 'click',
    validator(val: string) {
      return ['click', 'hover', 'none'].includes(val);
    },
  },
  hideIndicators: Boolean,
  controllersOutside: {
    type: Boolean,
    // default: true,
  },
  hideControllers: Boolean,
  size: {
    type: String,
    default: 'normal',
    validator(val: string) {
      return ['normal', 'small'].includes(val);
    },
  },
  width: {
    type: [Number, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: '',
  },
  controllerPosition: {
    type: String,
    validator(pos: string) {
      return ['outside', 'intersect', 'inside'].includes(pos);
    },
  },
});

// REFS
const wrapperRef = ref<HTMLDivElement>();
const itemsRef = ref<HTMLDivElement>();

// STATES
const state = reactive({
  currentIndex: props.active,
  items: [] as CarouselItemContext[],
  translateX: 0,
  clientWidth: 0,
  scrollWidth: 0,
  autoplayTimer: null as number | null,
  // mobile swipe support
  swiping: false,
  pageX: 0,
  pageY: 0,
  swipeDistance: 0,
  swipeTime: null as number | null,
  // current arrow direction
  ctrlDirection: 'next',
  animating: false,
  // loop
  isLoopLeft: false,
  isLoopRight: false,
});

// COMPUTED
const cClass = computed(() => {
  const controllerPosition = props.controllerPosition;
  return {
    'panda-carousel': true,
    [`panda-carousel-${props.size}`]: !!props.size,
    'panda-carousel-indicators-outside': props.indicatorsOutside,
    [`panda-carousel-controllers-${controllerPosition}`]: !!controllerPosition,
    'panda-carousel-swiping': state.swiping,
    'panda-carousel-rtl': isRtl,
  };
});
const cStyle = computed(() => {
  return {
    height:
      typeof props.height === 'string' ? props.height : `${props.height}px`,
    width: typeof props.width === 'string' ? props.width : `${props.width}px`,
  };
});
const itemsStyle = computed(() => {
  const swipeDistance = isRtl ? -state.swipeDistance : state.swipeDistance;
  const translateX = (state.translateX - swipeDistance) * (isRtl ? 1 : -1);
  // const translateX = isRtl ? -(state.translateX - state.swipeDistance) : (state.swipeDistance - state.translateX);
  return {
    transform: `translateX(${translateX}px)`,
    transition: state.animating ? '' : `transform 0ms`,
  };
});
const prevCls = computed(() => {
  return {
    [`${prefixCls}-prev`]: true,
    [`${prefixCls}-prev-disabled`]: prevDisabled.value,
  };
});
const nextCls = computed(() => {
  return {
    [`${prefixCls}-next`]: true,
    [`${prefixCls}-next-disabled`]: nextDisabled.value,
  };
});
const showPrevBtn = computed(() => {
  return !prevDisabled.value && state.items.length > 1;
});
const showNextBtn = computed(() => {
  return !nextDisabled.value && state.items.length > 1;
});
const nextDisabled = computed(() => {
  return props.loop ? false : state.currentIndex === state.items.length - 1;
});
const prevDisabled = computed(() => {
  return props.loop ? false : state.currentIndex === 0;
});
const showIndicators = computed(() => {
  return !props.hideIndicators && state.items.length > 1;
});
const indicatorsCls = computed(() => {
  return {
    'panda-carousel-indicators': true,
    'panda-carousel-indicators-number': props.indicatorsType === 'number',
  };
});

// EMITS
const emit = defineEmits<{
  change: [index: number];
  'update:active': [index: number];
}>();

// WATCH
watch(
  () => props.active,
  (val) => {
    slideTo(val);
  },
);
watch(
  () => props.autoplay,
  (val) => {
    if (val) {
      startAutoplay();
    } else stopAutoplay();
  },
);
watch(
  () => state.currentIndex,
  (index) => {
    updateTranslate();
    emit('change', index);
    emit('update:active', index);
  },
);

// LIFECYCLES
onMounted(() => {
  on(wrapperRef?.value as HTMLElement, 'touchstart', onSwipeStart);
  on(wrapperRef?.value as HTMLElement, 'touchmove', onSwiping);
  on(wrapperRef?.value as HTMLElement, 'touchend', onSwipeEnd);
  on(wrapperRef?.value as HTMLElement, 'touchcancel', onSwipeCancel);

  if (props.autoplay) {
    startAutoplay();
  }

  if (props.loop) {
    nextTick(initLoop);
  }

  nextTick(updateTranslate);
});
onBeforeUnmount(() => {
  off(wrapperRef?.value as HTMLElement, 'touchstart', onSwipeStart);
  off(wrapperRef?.value as HTMLElement, 'touchmove', onSwiping);
  off(wrapperRef?.value as HTMLElement, 'touchend', onSwipeEnd);
  off(wrapperRef?.value as HTMLElement, 'touchcancel', onSwipeCancel);

  if (props.autoplay) {
    stopAutoplay();
  }
});

// METHODS
const updateTranslate = (index = 0) => {
  if (!state.items.length) return;
  state.animating = index === undefined ? true : false;
  let adjust = false;
  if (state.isLoopLeft) {
    state.translateX = 0;
    adjust = true;
  } else if (state.isLoopRight) {
    const itemEl = state.items[state.items.length - 1].$el as HTMLElement;
    const { offsetWidth } = itemEl;
    const offsetLeft = getItemOffset(itemEl);
    state.translateX = offsetLeft + offsetWidth;
    adjust = true;
  } else {
    const itemEl = state.items[index === undefined ? state.currentIndex : index]
      .$el as HTMLElement;
    const offsetLeft = getItemOffset(itemEl);
    state.translateX = offsetLeft;
  }
  // reset
  state.isLoopLeft = state.isLoopRight = false;
  // stop animating and fix loop
  state.animating &&
    setTimeout(() => {
      state.animating = false;
      if (adjust) {
        loopAdjust();
      }
    }, ANIMATION_TIME);
};
const getItemOffset = (itemEl: HTMLElement) => {
  if (!itemEl || !itemsRef.value || !itemsRef.value.contains(itemEl)) return 0;
  let offset = 0;
  let curEl = itemsRef.value.firstElementChild as HTMLElement;
  while (curEl) {
    if (curEl === itemEl) break;
    if (curEl.nodeType === 1) {
      offset += curEl.offsetWidth || 0;
    }
    curEl = curEl.nextSibling as HTMLElement;
  }
  return offset;
};
const initLoop = () => {
  if (!props.loop || !itemsRef.value) return;
  const items = itemsRef.value.querySelectorAll('.panda-carousel-item');
  if (!items.length) return;
  const prependItem = items[items.length - 1].cloneNode(true) as HTMLElement;
  const appendItem = items[0].cloneNode(true) as HTMLElement;
  prependItem.className += ' panda-carousel-item-copy';
  appendItem.className += ' panda-carousel-item-copy';
  itemsRef.value.prepend(prependItem);
  itemsRef.value.append(appendItem);
};
const loopAdjust = () => {
  if (state.animating) return;
  updateTranslate(state.currentIndex);
};
const startAutoplay = () => {
  if (!props.autoplay) return;
  // clear previous timer
  stopAutoplay();
  state.autoplayTimer = window.setInterval(() => {
    next('autoplay');
  }, props.autoplayInterval);
};
const stopAutoplay = () => {
  if (state.autoplayTimer) {
    clearInterval(state.autoplayTimer);
    state.autoplayTimer = null;
  }
};
const setIndex = (index: number = 0) => {
  if (index === state.currentIndex) return;
  const len = state.items.length;
  // handle edge cases
  if (index < 0) {
    state.currentIndex = props.loop ? len - 1 : 0;
  } else if (index > len - 1) {
    const loopNext =
      props.loop || (props.autoplay && state.autoplayTimer !== null);
    state.currentIndex = loopNext ? 0 : len - 1;
  } else state.currentIndex = index;
  // handle loop
  if (!props.loop) return;
  if (state.ctrlDirection === 'prev' && state.currentIndex === len - 1) {
    state.isLoopLeft = true;
  } else if (state.ctrlDirection === 'next' && state.currentIndex === 0) {
    state.isLoopRight = true;
  } else {
    state.isLoopLeft = state.isLoopRight = false;
  }
};
const onPrev = _throttle(function () {
  prev();
}, ANIMATION_TIME);
const prev = () => {
  if (prevDisabled.value) return;
  state.ctrlDirection = 'prev';
  setIndex(state.currentIndex - 1);
};
const onNext = _throttle(function () {
  next();
}, ANIMATION_TIME);
const next = (callFrom?: string) => {
  if (!(callFrom === 'autoplay') && nextDisabled.value) return;
  state.ctrlDirection = 'next';
  setIndex(state.currentIndex + 1);
};
const slideTo = (index: number) => {
  if (typeof index !== 'number') return;
  if (!(index >= 0 && index < state.items.length)) return;
  setIndex(index);
};
const onMouseEnter = () => {
  stopAutoplay();
};
const onMouseLeave = () => {
  startAutoplay();
};
const onIndicatorClick = (i: number = 0) => {
  if (state.currentIndex === i || props.indicatorsTrigger !== 'click') return;
  slideTo(i);
};
const onIndicatorHover = (i: number = 0) => {
  if (state.currentIndex === i || props.indicatorsTrigger !== 'hover') return;
  slideTo(i);
};
const addItem = (item: CarouselItemContext) => {
  state.items.push(item);
};
const removeItem = (item: CarouselItemContext) => {
  const index = state.items.indexOf(item);
  if (index >= 0) {
    state.items.splice(index, 1);
  }
};
const onSwipeStart = (e: Event) => {
  if (state.items.length <= 1) return;
  state.swiping = true;
  state.swipeDistance = 0;
  state.swipeTime = Date.now();
  const touche = (e as TouchEvent).targetTouches[0];
  const { pageX, pageY } = touche;
  state.pageX = pageX;
  state.pageY = pageY;
  stopAutoplay();
};
const onSwiping = (e: Event) => {
  if (state.items.length <= 1) return;
  const touche = (e as TouchEvent).targetTouches[0];
  const { pageX, pageY } = touche;
  if (Math.abs(pageX - state.pageX) > 5 && Math.abs(pageY - state.pageY) < 50) {
    e.preventDefault();
  }
  state.swipeDistance = pageX - state.pageX;
  // console.log('>>> onSwiping', pageX, state.pageX, state.swipeDistance);
};
const onSwipeEnd = (e: Event) => {
  if (state.items.length <= 1) return;
  const swipeDistance = state.swipeDistance;
  const { clientWidth } = itemsRef.value as HTMLDivElement;
  // trigger next or prev when swipe enough distance or speed
  const distanceEnough = Math.abs(swipeDistance) >= clientWidth * 0.3;
  const speedEnough =
    Math.abs(swipeDistance) / (Date.now() - (state.swipeTime || 0)) > 0.3;
  if (distanceEnough || speedEnough) {
    nextTick(() => {
      if (swipeDistance > 0) {
        isRtl ? next() : prev();
      } else isRtl ? prev() : next();
    });
  }
  onSwipeCancel(e);
};
const onSwipeCancel = (e: Event) => {
  // reset
  state.swiping = false;
  state.swipeDistance = 0;
  state.swipeTime = null;
  state.pageX = 0;
  state.pageY = 0;
  startAutoplay();
};

// PROVIDE
const $CarouselContext = reactive({
  props,
  state,
  addItem,
  removeItem,
});
export type CarouselContext = typeof $CarouselContext;
provide('$CarouselContext', $CarouselContext);
</script>
