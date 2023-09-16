<template>
  <span v-if="name" class="panda-icon" :style="wrapperStyle" @click="onClick">
    <i :data-feather="name" :style="style">
      <!--  -->
    </i>
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

defineOptions({
  name: 'panda-icon',
});

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
  },
  color: {
    type: String,
  },
});

const wrapperStyle = computed(() => {
  return {
    height: props.size ? parseInt(props.size + '', 10) + 'px' : '14px',
  };
});
const style = computed(() => {
  const style: {
    width: string;
    height: string;
    color?: string;
  } = {
    width: '14px',
    height: '14px',
  };
  if (props.color) {
    style.color = props.color.trim();
  }
  if (props.size) {
    const size = parseInt(props.size + '', 10);
    style.width = `${size}px`;
    style.height = `${size}px`;
  }
  return style;
});

onMounted(() => {
  if (window.feather) window.feather.replace();
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();
const onClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>
