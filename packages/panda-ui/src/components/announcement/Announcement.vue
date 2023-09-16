<template>
  <div
    v-if="itemsNum > 0"
    :class="cls()"
    :style="cStyle"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @click="onClick"
  >
    <div :class="cls.join('main')" :style="mainStyle">
      <NotifyIcon :class="cls.join('warning-icon')" />
      <AnnouncementItems
        v-if="renderItems"
        v-model:loop-fix="loopFix"
        v-model:max-item-height="maxItemHeight"
        :cur-index="curIndex"
        :items="items"
        :max-lines="maxLines"
      />
      <Icon :class="cls.join('link-icon')" name="arrow-right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import Icon from '../icon';
import { cls } from './shared';
import NotifyIcon from './NotifyIcon.vue';
import AnnouncementItems from './Items.vue';
import { error } from '../../utils/log';
import { getCompInitialZIndex } from '../../utils/comp';

const initialZIndex = getCompInitialZIndex('panda-announcement');

defineOptions({
  name: 'panda-announcement',
});

// PROPS
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  maxContentWidth: {
    type: [String, Number],
    default: '100%',
  },
  fixed: Boolean,
  offsetTop: {
    type: Number,
    default: 0,
  },
  maxLines: {
    type: Number,
    default: 1,
    validator(lines: number) {
      if ([1, 3].includes(lines)) return true;
      else {
        error('prop: max-lines can only be 1 or 3');
        return false;
      }
    },
  },
});

// STATES
const curIndex = ref(0);
const autoplayTimer = ref();
const autoplayInterval = ref(3000);
const loopFix = ref(false);
const maxItemHeight = ref();
const renderItems = ref(true);

// COMPUTED
const cStyle = computed(() => {
  return props.fixed
    ? {
        position: 'fixed' as any,
        top: `${props.offsetTop}px`,
        left: 0,
        right: 0,
        zIndex: initialZIndex,
      }
    : undefined;
});
const mainStyle = computed(() => {
  const maxWidth =
    typeof props.maxContentWidth === 'number'
      ? `${props.maxContentWidth}px`
      : props.maxContentWidth;
  return {
    maxWidth,
    maxHeight: maxItemHeight.value ? `${maxItemHeight.value}px` : '',
  };
});
const itemsNum = computed(() => {
  return props.items.length;
});

// WATCH
watch(
  () => props.items,
  (val, oldVal) => {
    if (val.length > 1) {
      startAutoplay();
    } else stopAutoplay();
    // when items change
    reRender();
  },
);

// LIFECYCLES
onMounted(() => {
  startAutoplay();
});
onBeforeUnmount(() => {
  stopAutoplay();
});

// EMITS
const emit = defineEmits<{
  click: [index: number];
}>();

// METHODS
const startAutoplay = () => {
  if (itemsNum.value <= 1) return;
  // clear previous timer
  stopAutoplay();
  autoplay();
};
const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearTimeout(autoplayTimer.value);
    autoplayTimer.value = null;
  }
};
const autoplay = () => {
  autoplayTimer.value = setTimeout(() => {
    setIndex(curIndex.value + 1);
    autoplay();
  }, autoplayInterval.value);
};
const setIndex = (index: number) => {
  if (index === curIndex.value) return;
  loopFix.value = false;
  // handle edge cases
  if (index > itemsNum.value - 1) {
    curIndex.value = 0;
    loopFix.value = true;
  } else curIndex.value = index;
};
const onClick = () => {
  const item: any = props.items[curIndex.value];
  if (item && item.link) {
    window.open(item.link);
  }
  emit('click', curIndex.value);
};
// handle cases that when items change and item's height not set right.
const reRender = () => {
  curIndex.value = 0;
  loopFix.value = false;
  maxItemHeight.value = null;
  renderItems.value = false;
  stopAutoplay();
  nextTick(() => {
    renderItems.value = true;
    startAutoplay();
  });
};
</script>
