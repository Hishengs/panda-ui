<template>
  <div ref="itemsRef" :class="cls.join('items')" :style="itemsStyle">
    <div
      v-for="(item, i) in items"
      :key="i"
      ref="item"
      :class="[
        cls.joinIf('item', true),
        cls.joinIf('item-current', i === curIndex),
      ]"
      :style="itemStyle"
    >
      <span v-if="items.length > 1" :class="cls.join('count')">
        ({{ curIndex + 1 }}/{{ items.length }})&nbsp;
      </span>
      {{ (item as any).content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import type { PropType } from 'vue';
import { cls } from './shared';

const TRANSITION_TIME = 300;
const LINE_HEIGHT = 20;

defineOptions({
  name: 'panda-announcement-item',
});

// PROPS
const props = defineProps({
  items: {
    type: Array as PropType<unknown[]>,
    default: () => [],
  },
  curIndex: {
    type: Number,
    default: 0,
  },
  maxLines: {
    type: Number,
    default: 3,
  },
  loopFix: Boolean,
  maxItemHeight: Number,
});

// STATES
const translateY = ref(0);
const animating = ref(false);

// COMPUTED
const itemsStyle = computed(() => {
  return {
    transform: `translateY(-${translateY.value}px)`,
    transition: animating.value ? '' : `transform 0ms`,
  };
});
const itemStyle = computed(() => {
  return {
    '-webkit-line-clamp': props.maxLines,
  };
});

// WATCH
watch(
  () => props.curIndex,
  () => {
    updateTranslate();
  },
);

// LIFECYCLES
onMounted(() => {
  initLoop();
  syncHeight();
});

// REFS
const itemsRef = ref<HTMLDivElement>();

// EMITS
const emit = defineEmits<{
  'update:loop-fix': [val: boolean];
  'update:max-item-height': [height: number];
}>();

// METHODS
const initLoop = () => {
  if (!itemsRef.value) return;
  if (itemsRef.value.querySelector('.panda-announcement-item-copy')) return;
  const items = itemsRef.value.querySelectorAll('.panda-announcement-item');
  const appendItem = items[0].cloneNode(true) as HTMLElement;
  appendItem.className += ' panda-announcement-item-copy';
  itemsRef.value.append(appendItem);
};
const loopAdjust = () => {
  if (animating.value) return;
  updateTranslate(props.curIndex);
};
const updateTranslate = (index?: number) => {
  if (!itemsRef.value) return;
  animating.value = index === undefined ? true : false;
  const items: NodeListOf<HTMLDivElement> = itemsRef.value.querySelectorAll(
    '.panda-announcement-item',
  );
  const idx = props.loopFix
    ? items.length - 1
    : index === undefined
    ? props.curIndex
    : index;
  const item = items[idx];
  const _translateY =
    item.offsetParent === item.parentNode
      ? item.offsetTop
      : item.offsetTop - (item.parentNode as HTMLElement).offsetTop;
  translateY.value = _translateY || 0;
  // stop animating and fix loop
  if (animating.value) {
    setTimeout(() => {
      animating.value = false;
      if (props.loopFix) {
        emit('update:loop-fix', false);
        nextTick(loopAdjust);
      }
    }, TRANSITION_TIME);
  }
};
const syncHeight = () => {
  if (!itemsRef.value) return;
  let maxItemHeight = LINE_HEIGHT; // set default
  function getItemHeight(item: HTMLDivElement) {
    const {
      height = 0,
      paddingTop = 0,
      paddingBottom = 0,
    } = window.getComputedStyle(item);
    if (height) {
      return (
        parseFloat(height) -
        parseFloat(paddingTop + '') -
        parseFloat(paddingBottom + '')
      );
    } else return 0;
  }
  const items: NodeListOf<HTMLDivElement> = itemsRef.value.querySelectorAll(
    '.panda-announcement-item',
  );
  items.forEach((item) => {
    maxItemHeight = Math.max(maxItemHeight, getItemHeight(item));
  });
  const MAX_ITEM_HEIGHT = props.maxLines * LINE_HEIGHT;
  maxItemHeight =
    maxItemHeight <= MAX_ITEM_HEIGHT ? maxItemHeight : MAX_ITEM_HEIGHT;
  updateMaxItemHeight(maxItemHeight);
  items.forEach((item) => {
    const padding = maxItemHeight - getItemHeight(item);
    item.style.paddingTop = `${padding / 2}px`;
    item.style.paddingBottom = `${padding / 2}px`;
    item.style.maxHeight = `${maxItemHeight}px`;
  });
};
const updateMaxItemHeight = (height: number) => {
  emit('update:max-item-height', height);
};
</script>
