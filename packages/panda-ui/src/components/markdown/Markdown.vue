<template>
  <div class="panda-markdown" v-html="parsedMD" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { marked } from 'marked';

defineOptions({
  name: 'panda-markdown',
});

const props = defineProps({
  content: String,
});

const parsedMD = computed(() => {
  return marked(props.content || '');
});
</script>
