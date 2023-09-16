<template>
  <div class="panda-date-picker-month-view">
    <span v-for="(mon, i) in months" :key="i" :class="getClass(i)" @click="onMonthSelect(i)">
      <span class="panda-date-picker-month-inner">
        {{ mon }}
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import { t } from '../../../locale';
import { useDatePicker } from '../hook';

// TODO
const DatePickerContext = useDatePicker()!;

// PROPS
const props = defineProps({
  viewDate: {
    type: Date as PropType<Date>,
    required: true,
  },
});

// COMPUTED
const months = computed(() => {
  const months: string[] = [];
  let i = 0;
  while (i < 12) {
    months.push(t('datePicker.monthsShort')[i]);
    i++;
  }
  return months;
});

// EMITS
const emit = defineEmits(['month-select']);

// METHODS
const onMonthSelect = (mon: number) => {
  if (isDisabled(mon)) return;
  emit('month-select', mon);
}
const isDisabled = (mon: number) => {
  let disabled = false;
  if (!DatePickerContext.computed.canSwitchView) return false;
  const { props: {minDate, maxDate}, state: { viewDate } } = DatePickerContext;
  if (minDate) {
    disabled = viewDate!.getFullYear() < minDate.getFullYear()
      || (viewDate!.getFullYear() === minDate.getFullYear() && mon < minDate.getMonth());
  }
  if (!disabled && maxDate) {
    disabled = viewDate!.getFullYear() > maxDate.getFullYear()
      || (viewDate!.getFullYear() === maxDate.getFullYear() && mon > maxDate.getMonth());
  }
  return disabled;
}
const isSelected = (mon: number) => {
  let selected = false;
  if (!DatePickerContext.computed.canSwitchView) return false;
  const { state: { curDate, viewDate }, computed: { range } } = DatePickerContext;

  if (!curDate) return false;

  function isSame(mon: number, date: Date) {
    if (!date) return false;
    return viewDate!.getFullYear() === date.getFullYear()
      && mon === date.getMonth();
  }

  selected = range
    ? isSame(mon, (curDate as Date[])[0]) || isSame(mon, (curDate as Date[])[1])
    : isSame(mon, (curDate as Date));

  if (!range && curDate) {
    selected = viewDate!.getFullYear() === (curDate as Date).getFullYear()
      && mon === (curDate as Date).getMonth();
  }
  return selected;
}
const isStart = (mon: number) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  if (range && curDate && (curDate as Date[]).length) {
    return props.viewDate.getFullYear() === (curDate as Date[])[0].getFullYear() && mon === (curDate as Date[])[0].getMonth();
  } else return false;
}
const isEnd = (mon: number) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  if (range && curDate && (curDate as Date[]).length > 1) {
    return props.viewDate.getFullYear() === (curDate as Date[])[1].getFullYear() && mon === (curDate as Date[])[1].getMonth();
  } else return false;
}
const inRange = (mon: number) => {
  const { state: { curDate } } = DatePickerContext;
  if (curDate && (curDate as Date[]).length > 1) {
    const start = new Date(`${(curDate as Date[])[0].getFullYear()}-${(curDate as Date[])[0].getMonth() + 1}-01 00:00:00`);
    const end = new Date(`${(curDate as Date[])[1].getFullYear()}-${(curDate as Date[])[1].getMonth() + 1}-01 00:00:00`);
    const date = new Date(`${props.viewDate.getFullYear()}-${mon + 1}-01 00:00:00`);
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return false;
}
const getClass = (mon: number) => {
  return {
    'panda-date-picker-month': true,
    'panda-date-picker-month-selected': isSelected(mon),
    'panda-date-picker-month-disabled': isDisabled(mon),
    // 'panda-date-picker-month-start': this.isStart(mon),
    // 'panda-date-picker-month-end': this.isEnd(mon),
    // 'panda-date-picker-month-in-range': this.inRange(mon),
  };
}

defineExpose({
  isStart,
  isEnd,
  inRange,
});
</script>
