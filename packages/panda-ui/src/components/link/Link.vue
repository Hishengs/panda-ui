<template>
  <a
    :href="href"
    :target="target"
    v-bind="$attrs"
    :class="cClass"
    :style="cStyle"
    @click="onClick"
  >
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'panda-link',
});

// PROPS
const props = defineProps({
  href: String,
  underline: {
    type: Boolean,
    default: true,
  },
  color: String,
  target: String,
  disabled: Boolean,
});

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-link': true,
    'panda-link-no-underline': !props.underline,
    'panda-link-disabled': props.disabled,
  };
});
const cStyle = computed(() => {
  return props.color
    ? {
        color: `${props.color} !important`,
      }
    : null;
});

// EMITS
const emit = defineEmits<{
  click: [e?: Event];
}>();

// METHODS
const onClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.preventDefault();
    return;
  }
  emit('click');
};
</script>
