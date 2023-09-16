<template>
  <div class="panda-date-picker-vertical-panel-title">
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { t } from '../../../locale';

// PROPS
const props = defineProps({
  viewDate: {
    type: Date,
    required: true,
  },
});

const title = computed(() => {
  const mon = t('datePicker.monthsShort')[props.viewDate.getMonth()];
  const year = props.viewDate.getFullYear();
  return `${mon} ${year}`;
});
</script>
