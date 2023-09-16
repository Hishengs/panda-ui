<template>
  <div v-show="actuallyShow" ref="wrapper" :class="cClass" :style="cStyle">
    <div class="panda-bottom-sheet-mask" @click.self.stop="onMaskClick" />
    <div ref="inner" class="panda-bottom-sheet-inner" :style="innerStyle">
      <div v-if="showHeader" class="panda-bottom-sheet-header">
        <slot name="header">
          <div
            v-if="showClose || !!$slots['header-left']"
            ref="headerLeft"
            class="panda-bottom-sheet-header-left"
          >
            <slot name="header-left">
              <Icon
                v-if="showClose"
                class="panda-bottom-sheet-close-btn"
                type="icon_navigation_close_m"
                size="24"
                @click="close('close-btn')"
              />
            </slot>
          </div>
          <div
            class="panda-bottom-sheet-header-title"
            :style="{ maxWidth: `calc(100% - ${titleMargin * 2}px)` }"
          >
            <slot name="header-title">
              <h1 v-if="title">
                {{ title }}
              </h1>
            </slot>
          </div>
          <div
            v-if="!!$slots['header-right']"
            ref="headerRight"
            class="panda-bottom-sheet-header-right"
          >
            <slot name="header-right" />
          </div>
        </slot>
      </div>
      <div class="panda-bottom-sheet-body">
        <slot />
      </div>
      <div v-if="!!$slots.footer" class="panda-bottom-sheet-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCompInitialZIndex } from '../../utils/comp';
const initalZIndex = getCompInitialZIndex('panda-bottom-sheet');
</script>

<script lang="ts" setup>
import _once from 'lodash/once';
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeMount,
  useSlots,
  nextTick,
} from 'vue';
import Icon from '../icon';
import { on, off, lockOuterScroll, unlockOuterScroll } from '../../utils/dom';
import Touch from '../../utils/touch';

const ANIMATION_TIME = 350;

defineOptions({
  name: 'panda-bottom-sheet',
});

const props = defineProps({
  visible: Boolean,
  title: String,
  showClose: Boolean,
  maskClosable: {
    type: Boolean,
    default: true,
  },
  canPullClose: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: initalZIndex,
  },
  transfer: Boolean,
  minPullDistance: {
    type: Number,
    default: 30,
  },
  height: String,
});

// STATE
const show = ref(false);
const actuallyShow = ref(false);
const transformY = ref(0);
const touch = ref<Touch | null>(null);
const titleMargin = ref(88);
const transfered = ref(false);

const slots = useSlots();

// COMPUTED
const swiping = computed(() => {
  return touch.value && touch.value.swiping;
});
const cClass = computed(() => {
  return {
    'panda-bottom-sheet': true,
    'panda-bottom-sheet-hidden': !show.value,
    'panda-bottom-sheet-swiping': swiping.value,
  };
});
const cStyle = computed(() => {
  return {
    zIndex: props.zIndex,
  };
});
const innerStyle = computed(() => {
  return {
    transform: show.value
      ? `translateY(${transformY.value}px)`
      : 'translateY(100%)',
    height: props.height,
  };
});
const showHeader = computed(() => {
  return (
    !!props.title ||
    props.showClose ||
    !!slots.header ||
    !!slots['header-left'] ||
    !!slots['header-title'] ||
    !!slots['header-right']
  );
});

// EMITS
const emit = defineEmits<{
  'update:visible': [val: any];
  close: [from?: string];
}>();

// REFS
const wrapper = ref<HTMLDivElement | null>(null);
const inner = ref<HTMLDivElement | null>(null);
const headerLeft = ref<HTMLDivElement | null>(null);
const headerRight = ref<HTMLDivElement | null>(null);

// WATCH
watch(
  () => props.visible,
  (val) => {
    if (val) {
      open();
    } else {
      close('visible');
    }
  },
);
watch(
  () => actuallyShow.value,
  (val) => {
    emit('update:visible', val);
  },
);

onMounted(() => {
  wrapper.value && (touch.value = new Touch(wrapper.value, true));

  // fix: initial visible
  if (props.visible) {
    open();
  }

  if (props.transfer && !transfered.value && wrapper.value) {
    document.body.appendChild(wrapper.value);
    transfered.value = true;
  }
});

onBeforeMount(() => {
  close();
  unbindSwipe();
  if (props.transfer && transfered.value && wrapper.value) {
    if (wrapper.value.parentNode)
      wrapper.value.parentNode.removeChild(wrapper.value);
  }
  // avoid directly route change causes body scroll still be locked
  if (show.value) {
    close('destroy');
  }
});

// METHODS
const open = () => {
  if (show.value || !inner.value) return;
  actuallyShow.value = true;
  setTimeout(() => {
    show.value = true;
    nextTick(bindSwipe);
    inner.value && lockOuterScroll(inner.value, false);
    updateTitleMargin();
  }, 0);
};
const close = (from?: string) => {
  if (!show.value) return;
  show.value = false;
  setTimeout(() => {
    actuallyShow.value = false;
    inner.value && unlockOuterScroll();
    if (from !== 'destroy') {
      emit('close', from);
    }
  }, ANIMATION_TIME);
};
const bindSwipe = _once(() => {
  // no need to bind if unvisible
  if (!inner.value || !show.value) return;
  on(inner.value, 'touchstart', onSwipeStart);
  on(inner.value, 'touchmove', onSwiping);
  on(inner.value, 'touchend', onSwipeEnd);
  on(inner.value, 'touchcancel', onSwipeCancel);
});
const unbindSwipe = () => {
  if (!inner.value) return;
  off(inner.value, 'touchstart', onSwipeStart);
  off(inner.value, 'touchmove', onSwiping);
  off(inner.value, 'touchend', onSwipeEnd);
  off(inner.value, 'touchcancel', onSwipeCancel);
};
const onMaskClick = () => {
  if (!props.maskClosable) return;
  close('mask');
};
const onSwipeStart = (e: Event) => {
  touch.value!.touchstart(e as TouchEvent);
};
const onSwiping = (e: Event) => {
  touch.value!.touchmove(e as TouchEvent);

  const { scrollableEl, scrollableElInfo, swipeDistance } = touch.value!;

  const scrollable = !!scrollableEl;
  const { atTop, atBottom } = scrollableElInfo;
  if (swipeDistance > 0 && Math.abs(swipeDistance) > props.minPullDistance) {
    if (props.canPullClose && (!scrollable || atTop)) {
      transformY.value = swipeDistance;
    }
  }

  const shouldPrevent =
    !inner.value!.contains(e.target as Node) ||
    !scrollable ||
    (scrollable && atTop && swipeDistance > 0) ||
    (scrollable && atBottom && swipeDistance < 0);

  if (e.cancelable && shouldPrevent) {
    e.preventDefault();
  }
};
const onSwipeEnd = (e: Event) => {
  const _transformY = transformY.value;
  if (_transformY <= 0) {
    onSwipeCancel(e as TouchEvent);
    return;
  }
  if (props.canPullClose) {
    const { clientHeight } = inner.value!;
    const speedEnough =
      _transformY / (Date.now() - (touch.value!.swipeStartTime || 0)) >= 0.8;
    const distanceEnough = _transformY >= clientHeight / 2;
    if (speedEnough || distanceEnough) {
      nextTick(() => {
        close('pull');
      });
    }
  }
  onSwipeCancel(e as TouchEvent);
};
const onSwipeCancel = (e: Event) => {
  transformY.value = 0;
  touch.value!.touchcancel(e as TouchEvent);
};
const updateTitleMargin = () => {
  let leftWidth = 0,
    rightWidth = 0;
  if (headerLeft.value!) {
    leftWidth = headerLeft.value!.offsetWidth;
  }
  if (headerRight.value!) {
    rightWidth = headerRight.value!.offsetWidth;
  }
  titleMargin.value = Math.max(leftWidth, rightWidth) + 10;
};
</script>
