<template>
  <div :class="cClass">
    <slot />
    <sup
      v-show="!hidden && (content || content === 0 || isDot || !!$slots.value)"
      class="panda-badge-content"
      :style="cStyle"
    >
      <slot name="value">{{ content }}</slot>
    </sup>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import type { PropType } from 'vue';
import { useGlobal } from '../../utils/hooks';

const { isRtl } = useGlobal();

defineOptions({
  name: 'panda-badge',
});

// PROPS
const props = defineProps({
  value: [String, Number],
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 99,
  },
  isDot: Boolean,
  hidden: Boolean,
  color: String,
  offset: {
    type: Array as PropType<number[]>,
    validator(val: number[]) {
      return val.length === 2;
    },
  },
});

const slots = useSlots();

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-badge': true,
    'panda-badge-fixed': !!slots.default,
    'panda-badge-dot': props.isDot,
    'panda-badge-rtl': isRtl,
  };
});
const cStyle = computed(() => {
  let sty: any = {
    backgroundColor: !!props.color ? props.color : '',
  };
  if (props.offset) {
    const [x, y] = props.offset;
    sty = {
      marginTop: `${y}px`,
      marginRight: `${-x}px`,
      ...sty,
    };
  }
  return sty;
});
const content = computed(() => {
  if (props.isDot) return;
  let { value, min, max } = props;
  if (typeof value === 'number') {
    if (min !== undefined) {
      value = value < min ? min : value;
    }
    if (max !== undefined) {
      value = value > max ? `${max}+` : value;
    }
  }
  return value;
});
</script>
