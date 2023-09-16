<template>
  <div
    ref="poptipRef"
    v-click-outside="onClickOutside"
    :class="cClass"
    :data-placement="realPlacement"
  >
    <div
      ref="referenceRef"
      class="panda-poptip-reference"
      @click="onClick"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      @mousedown="onFocus(false)"
      @mouseup="onBlur(false)"
    >
      <slot />
    </div>
    <!-- <panda-fade-transition> -->
    <div
      v-show="
        showPopper && (!!title || $slots.title || !!content || $slots.content)
      "
      ref="popperRef"
      :class="{
        'panda-poptip-popper': true,
        dark: dark,
      }"
      :style="{
        zIndex: zIndex,
      }"
      @click.stop="() => {}"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <!-- inner -->
      <div class="panda-poptip-popper-inner" :style="innerStyle">
        <div v-if="title || $slots.title" class="panda-poptip-popper-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="panda-poptip-popper-content">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </div>
      <!-- close btn -->
      <Icon
        v-if="closable"
        class="panda-poptip-popper-close-btn"
        name="x"
        @click="close"
      />
    </div>
    <!-- </panda-fade-transition> -->
  </div>
</template>

<script lang="ts">
import { getCompInitialZIndex } from '../../utils/comp';
import { Placements } from '../../utils/const';
import type { Placement } from '../../utils/const';

const initalZIndex = getCompInitialZIndex('panda-poptip');
</script>

<script lang="ts" setup>
import Icon from '../icon';
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  nextTick,
  useSlots,
} from 'vue';
import type { PropType } from 'vue';
import { createPopper as _createPopper } from '@popperjs/core';
import type {
  Instance as PopperInstance,
  OptionsGeneric,
} from '@popperjs/core';
import { isServer } from '../../utils';
import { useGlobal } from '../../utils/hooks';
import { on, off, parseWidth } from '../../utils/dom';
import clickOutside from '../../directives/click-outside';

defineOptions({
  name: 'panda-poptip',
  directives: {
    clickOutside,
  },
});

// PROPS
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
    validator(val: Placement) {
      return Placements.includes(val);
    },
  },
  trigger: {
    type: String,
    validator(val: string) {
      return ['hover', 'click', 'focus', 'none'].includes(val);
    },
    default: 'hover',
  },
  offset: {
    type: [Number, Array],
    default: 10,
  },
  popperEl: {
    type: Object,
  },
  referenceEl: {
    type: Object,
  },
  disabled: Boolean,
  arrow: {
    type: Boolean,
    default: true,
  },
  closable: Boolean,
  width: Number,
  maxWidth: {
    type: Number,
    default: 360,
  },
  height: Number,
  maxHeight: {
    type: Number,
    default: 168,
  },
  zIndex: {
    type: Number,
    default: initalZIndex,
  },
  dark: Boolean,
  appendToBody: Boolean,
  flip: Boolean,
  preventOverflow: Boolean,
  hideDelay: {
    type: Number,
    default: 50,
  },
});

// INJECT
const { isRtl } = useGlobal();

// REFS
const referenceRef = ref<HTMLDivElement>();
const popperRef = ref<HTMLDivElement>();

// SLOTS
const slots = useSlots();

// STATE
const showPopper = ref(props.value);
const popperIns = ref<PopperInstance>();
// for focus trigger
const inputEl = ref<HTMLInputElement | HTMLTextAreaElement | undefined>();
const popperClicked = ref(false);
const closeDelay = ref(props.hideDelay);
const closeDelayTimer = ref();

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-poptip': true,
    'panda-poptip-dark': props.dark,
    'panda-poptip-closable': props.closable,
    'panda-poptip-with-title': !!(props.title || slots.title),
    'panda-poptip-no-arrow': !props.arrow,
    'panda-poptip-rtl': isRtl,
  };
});
const innerStyle = computed(() => {
  return {
    width: parseWidth(props.width + ''),
    maxWidth: parseWidth(props.maxWidth),
    height: parseWidth(props.height + '', -24),
    maxHeight: parseWidth(props.maxHeight, -24),
  };
});
const realPlacement = computed(() => {
  return isRtl
    ? /^(top|bottom)\-start$/.test(props.placement)
      ? props.placement.replace('start', 'end')
      : /^(top|bottom)\-end$/.test(props.placement)
      ? props.placement.replace('end', 'start')
      : props.placement
    : props.placement;
});

// EMITS
const emit = defineEmits<{
  input: [val: boolean];
  show: [];
  hide: [];
}>();

// WATCH
watch(
  () => props.value,
  (val) => {
    showPopper.value = val;
    emit('input', val);
  },
  {
    immediate: true,
  },
);
watch(
  () => showPopper.value,
  (show) => {
    if (show) {
      updatePopper();
      emit('show');
    } else {
      emit('hide');
    }
    emit('input', show);
  },
);
watch(
  () => props.placement,
  () => {
    onPopperOptionsUpdate();
  },
);
watch(
  () => props.offset,
  () => {
    onPopperOptionsUpdate();
  },
);

// LIFECYCLES
onMounted(() => {
  initFocus();
});
onUpdated(() => {
  nextTick(() => updatePopper());
});
onBeforeUnmount(() => {
  if (inputEl.value) {
    off(inputEl.value, 'focus', onInputFocus);
    off(inputEl.value, 'blur', onInputBlur);
  }
  if (!isServer && popperIns.value) {
    popperIns.value.destroy();
    popperIns.value = undefined;
  }
  if (props.appendToBody) {
    const popperEl = getPopperEl();
    if (popperEl && popperEl.parentNode === document.body) {
      document.body.removeChild(popperEl);
    }
  }
});

// METHODS
const updatePopper = () => {
  if (isServer) return;
  if (!popperIns.value) {
    createPopper();
  } else {
    popperIns.value.update();
  }
};
const onPopperOptionsUpdate = () => {
  popperIns.value && popperIns.value.setOptions(getPopperOptions());
};
const getPopperOptions = () => {
  return {
    placement: realPlacement.value,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: (/* { placement, reference, popper } */) => {
            // 添加偏移
            return Array.isArray(props.offset)
              ? props.offset
              : [0, props.offset];
          },
        },
      },
      {
        name: 'flip',
        enabled: props.flip,
      },
      {
        name: 'preventOverflow',
        enabled: props.preventOverflow,
      },
    ],
  } as OptionsGeneric<{
    name: string;
    enabled: boolean;
    options: any;
  }>;
};
const createPopper = () => {
  if (isServer) return;
  if (popperIns.value) return;
  const _reference = (props.referenceEl ||
    referenceRef.value) as HTMLDivElement;
  const popper = getPopperEl();
  if (!_reference || !popper) return;
  if (props.appendToBody) document.body.appendChild(popper);
  const options = getPopperOptions();
  popperIns.value = _createPopper(_reference, popper, options);
};
const initFocus = () => {
  if (shouldResponse('focus')) {
    nextTick(() => {
      const input = referenceRef.value!.querySelectorAll('input');
      const textarea = referenceRef.value!.querySelectorAll('textarea');
      inputEl.value = input ? input[0] : textarea ? textarea[0] : undefined;
      if (inputEl.value) {
        on(inputEl.value, 'focus', onInputFocus);
        on(inputEl.value, 'blur', onInputBlur);
      }
    });
  }
};
const getPopperEl = () => {
  return (props.popperEl || popperRef.value) as HTMLElement;
};
const shouldResponse = (trigger = '') => {
  return !(isServer || props.disabled || props.trigger !== trigger);
};
const onClick = () => {
  if (shouldResponse('click')) {
    showPopper.value = !showPopper.value;
  }
};
const onClickOutside = (e: MouseEvent) => {
  if (props.appendToBody) {
    const popperEl = getPopperEl();
    if (e && (e.target === popperEl || popperEl!.contains(e.target as Node))) {
      popperClicked.value = true;
    } else {
      popperClicked.value = false;
    }
  } else {
    popperClicked.value = false;
  }
  if (shouldResponse('click')) {
    close();
  }
};
const onMouseenter = () => {
  clearTimeout(closeDelayTimer.value);
  if (shouldResponse('hover')) {
    open();
  }
};
const onMouseleave = () => {
  clearTimeout(closeDelayTimer.value);
  if (shouldResponse('hover')) {
    closeDelayTimer.value = setTimeout(() => {
      close();
    }, closeDelay.value);
  }
};
const onFocus = (fromInput = true) => {
  if (inputEl.value && !fromInput) return;
  if (shouldResponse('focus')) {
    open();
  }
};
const onInputFocus = (e: Event) => {
  onFocus(true);
};
const onBlur = (fromInput = true) => {
  if (inputEl.value && !fromInput) return;
  if (shouldResponse('focus')) {
    close();
  }
};
const onInputBlur = (e: Event) => {
  onBlur(true);
};
const open = () => {
  showPopper.value = true;
};
const show = () => {
  open();
};
const close = () => {
  if (
    props.appendToBody &&
    popperClicked.value &&
    ['click'].includes(props.trigger)
  ) {
    return;
  }
  showPopper.value = false;
};
const hide = () => {
  close();
};

defineExpose({
  show,
  hide,
});
</script>
