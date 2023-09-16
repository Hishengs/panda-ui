<template>
  <div class="panda-col" :class="cClass" :style="cStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, computed, getCurrentInstance } from 'vue';
import Row from './Row.vue';
import { findComponentUpward } from '../../utils/comp';

defineOptions({
  name: 'panda-col',
});

const props = defineProps({
  span: {
    type: Number,
    default: 24,
  },
  /* offset: Number,
  pull: Number,
  push: Number,
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object] */
});

const row: ComponentPublicInstance<typeof Row> | null | undefined =
  findComponentUpward<typeof Row>(getCurrentInstance(), 'panda-row');

const gutter = computed(() => {
  return row ? row.gutter : 0;
});
const cClass = computed(() => {
  const classList: string[] = [];

  const PropTypes = ['span' /* , 'offset', 'pull', 'push' */] as const;

  PropTypes.forEach((prop: (typeof PropTypes)[number]) => {
    if (props[prop] || props[prop] === 0) {
      classList.push(
        prop !== 'span'
          ? `panda-col-${prop}-${props[prop]}`
          : `panda-col-${props[prop]}`,
      );
    }
  });

  /* ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
    if (typeof this[size] === 'number') {
      classList.push(`panda-col-${size}-${this[size]}`);
    } else if (typeof this[size] === 'object') {
      let props = this[size];
      Object.keys(props).forEach(prop => {
        classList.push(
          prop !== 'span'
            ? `panda-col-${size}-${prop}-${props[prop]}`
            : `panda-col-${size}-${props[prop]}`
        );
      });
    }
  }); */

  return classList;
});
const cStyle = computed(() => {
  const style: any = {};

  if (gutter.value) {
    style.paddingLeft = gutter.value / 2 + 'px';
    style.paddingRight = style.paddingLeft;
  }

  return style;
});
</script>
