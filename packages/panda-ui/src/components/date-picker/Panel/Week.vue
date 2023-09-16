<template>
  <div class="panda-date-picker-weeks">
    <span v-for="(week, i) in weeks" :key="i" class="panda-date-picker-week">
      {{ week }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  weeks: Array,
});
</script>
