<template>
  <!-- <panda-fade-transition> -->
  <div v-if="!closed" class="panda-alert" :class="cClass">
    <div v-if="showIcon && iconName" class="panda-alert-icon">
      <Icon :type="iconName" :size="20" />
    </div>
    <div class="panda-alert-main">
      <div v-if="title || $slots.title" class="panda-alert-title">
        <slot name="title">
          <h6>{{ title }}</h6>
        </slot>
      </div>
      <div class="panda-alert-content">
        <slot />
      </div>
    </div>
    <Close v-if="closable" class="panda-alert-close-btn" @click="onClose" />
  </div>
  <!-- </panda-fade-transition> -->
</template>

<script lang="ts" setup>
import Icon from '../icon';
import Close from './Close.vue';
import { computed, ref } from 'vue';

defineOptions({
  name: 'panda-alert',
});

const props = defineProps({
  type: {
    type: String,
    validator(val: string) {
      return ['success', 'info', 'warning', 'error'].includes(val);
    },
  },
  title: String,
  closable: Boolean,
  icon: String,
  showIcon: Boolean,
});

const closed = ref(false);
const statusIcon = computed(() => {
  const statusMap = {
    success: 'icon_feedback_success_fill',
    info: 'icon_tips_tips_fill',
    warning: 'icon_feedback_warning_fill',
    error: 'icon_feedback_failure_fill',
  };
  return statusMap[props.type as keyof typeof statusMap] || '';
});
const iconName = computed(() => props.icon || statusIcon);
const cClass = computed(() => {
  return {
    [`panda-alert-closable`]: props.closable,
    [`panda-alert-${props.type}`]: !!props.type,
  };
});

const emit = defineEmits({
  close: (e: MouseEvent) => e instanceof MouseEvent,
});

const onClose = (e: MouseEvent) => {
  closed.value = true;
  emit('close', e);
};
</script>
