<template>
  <div class="panda-row" :class="cClass" :style="cStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { error } from '../../utils/log';

defineOptions({
  name: 'panda-row',
});

const props = defineProps({
  gutter: {
    type: Number,
    default: 20,
    validator(val: number) {
      const valid = [0, 4, 8, 12, 16, 20].includes(val);
      if (!valid) error('gutter can only be one of [0, 4, 8, 12, 16, 20]');
      return valid;
    },
  },
  type: String,
  justifyContent: {
    type: String,
    default: 'flex-start',
  },
  alignItems: {
    type: String,
    default: 'flex-start',
  },
});

const cStyle = computed(() => {
  const style: any = {};

  if (props.gutter) {
    style.marginLeft = `-${props.gutter / 2}px`;
    style.marginRight = style.marginLeft;
  }

  if (props.type === 'flex') {
    if (props.justifyContent !== 'flex-start') {
      style['justify-content'] = props.justifyContent;
    }
    if (props.alignItems !== 'flex-start') {
      style['align-items'] = props.alignItems;
    }
  }

  return style;
});
const cClass = computed(() => {
  return {
    'panda-row-flex': props.type === 'flex',
    // [`panda-row-${this.justifyContent}`]: this.justifyContent && this.justifyContent !== 'flex-start',
    // [`panda-row-${this.alignItems}`]: this.alignItems && this.alignItems !== 'flex-start',
  };
});
</script>
