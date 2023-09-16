<template>
  <div class="panda-date-picker-year-view">
    <span v-for="(year, i) in years" :key="i" :class="getClass(year)" @click="onYearSelect(year)">
      <span class="panda-date-picker-year-inner">
        {{ year }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
export const YEAR_RANGE = 12;
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDatePicker } from '../hook';

// TODO
const DatePickerContext = useDatePicker()!;

const props = defineProps({
  viewDate: {
    type: Date,
    required: true,
  },
});

// COMPUTED
const years = computed(() => {
  const year = props.viewDate.getFullYear();
  const years: number[] = [];
  let i = YEAR_RANGE;
  while (i--) {
    years.push(year - i);
  }
  return years;
});

// EMITS
const emit = defineEmits(['year-select']);

const onYearSelect = (year: number) => {
  if (isDisabled(year)) return;
  emit('year-select', year);
}
const isDisabled = (year: number) => {
  let disabled = false;
  const { computed: { canSwitchView } } = DatePickerContext;
  if (!canSwitchView) return false;
  const { props: {minDate, maxDate} } = DatePickerContext;
  if (minDate) disabled = year < minDate.getFullYear();
  if (!disabled && maxDate) disabled = year > maxDate.getFullYear();
  return disabled;
}
const isSelected = (year: number) => {
  let selected = false;
  const { state: { curDate }, computed: { range, canSwitchView } } = DatePickerContext;
  if (!canSwitchView) return false;

  if (!curDate) return false;

  function isSame(year: number, date: Date) {
    if (!date) return false;
    return year === date.getFullYear();
  }

  selected = range
    ? isSame(year, (curDate as Date[])[0]) || isSame(year, (curDate as Date[])[1])
    : isSame(year, (curDate as Date));

  return selected;
}
const isStart = (year: number) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  return range && curDate && (curDate as Date[]).length && (curDate as Date[])[0].getFullYear() === year;
}
const isEnd = (year: number) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  return range && curDate && (curDate as Date[]).length > 1 && (curDate as Date[])[1].getFullYear() === year;
}
const inRange = (year: number) => {
  const { state: { curDate } } = DatePickerContext;
  if (curDate && (curDate as Date[]).length > 1) {
    return year >= (curDate as Date[])[0].getFullYear() && year <= (curDate as Date[])[1].getFullYear();
  } else return false;
}
const getClass = (year: number) => {
  return {
    'panda-date-picker-year': true,
    'panda-date-picker-year-selected': isSelected(year),
    'panda-date-picker-year-disabled': isDisabled(year),
    // 'panda-date-picker-year-start': this.isStart(year),
    // 'panda-date-picker-year-end': this.isEnd(year),
    // 'panda-date-picker-year-in-range': this.inRange(year),
  };
}

defineExpose({
  isStart,
  isEnd,
  inRange,
});
</script>
