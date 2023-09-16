<template>
  <div ref="wrapperRef" :class="cClass" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useCarousel } from './hook';

const $carousel = useCarousel();

defineOptions({
  name: 'panda-carousel-item',
});

// REFS
const wrapperRef = ref<HTMLDivElement>();

const cClass = computed(() => {
  const { loop } = $carousel?.props || {};
  const { currentIndex = 0, items = [] } = $carousel?.state || {};
  const len = items.length;
  const index = items.indexOf($CarouselItemContext);
  const isCurrent = index === currentIndex;
  const isPrev =
    currentIndex - 1 === index ||
    (loop && currentIndex === 0 && index === len - 1);
  const isNext =
    currentIndex + 1 === index ||
    (loop && currentIndex === len - 1 && index === 0);
  return {
    'panda-carousel-item': true,
    'panda-carousel-item-prev': isPrev,
    'panda-carousel-item-current': isCurrent,
    'panda-carousel-item-next': isNext,
  };
});

// CONTEXT FOR Carousel
const $CarouselItemContext: CarouselItemContext = reactive({
  $el: wrapperRef,
});
export interface CarouselItemContext {
  $el: HTMLDivElement | undefined;
}

// EMITS
const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

onMounted(() => {
  $carousel?.addItem($CarouselItemContext);
});
onBeforeUnmount(() => {
  $carousel?.removeItem($CarouselItemContext);
});

const onClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>
