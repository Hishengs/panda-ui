<template>
  <div class="panda-option-group">
    <h1 v-if="label" class="panda-option-group-label">
      {{ label }}
    </h1>
    <div class="panda-option-group-list">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, provide } from 'vue';

defineOptions({
  name: 'panda-option-group',
});

// PROPS
const props = defineProps({
  label: String,
  disabled: Boolean,
});

// PROVIDE
const $OptionGroupContext = reactive({
  props,
});
export type OptionGroupContext = typeof $OptionGroupContext;
provide('$OptionGroupContext', $OptionGroupContext);
</script>
