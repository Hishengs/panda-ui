<template>
  <div class="panda-date-picker-date-view">
    <div
      v-for="(row, j) in dateRows"
      :key="j"
      ref="rowRef"
      :class="cls.join('date-row')"
      :style="{
        minHeight: maxRowHeight > 0 ? `${maxRowHeight}px` : ''
      }"
    >
      <span
        v-for="(date, k) in row"
        :key="k"
        ref="dateRef"
        :class="getDateClass(date)"
        @click="onDateClick(date)"
        @mouseenter="onDateHover(date)"
      >
        <template v-if="!!date">
          <CustomDate name="day" v-bind="getSlotArgs(date)">
            <!-- date prepend -->
            <CustomDate v-if="date" name="date-prepend" v-bind="getSlotArgs(date)" />
            <!-- date main -->
            <span :class="cls.join('date-main')">
              <span :class="cls.join('date-inner')">
                {{ date.getDate() }}
              </span>
            </span>
            <!-- date append -->
            <CustomDate v-if="date" name="date-append" v-bind="getSlotArgs(date)" />
          </CustomDate>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import type { Slot, SetupContext } from 'vue';
import { useDatePicker } from '../hook';
import * as dateUtils from '../dateUtils';
import { getStyle } from '../../../utils/dom';
import { createNamespaceClass } from '../../../utils/class';

const cls = createNamespaceClass('panda-date-picker');

const ins = getCurrentInstance();

// console.log({ slots, ins }, slots['date-append'], ins?.parent?.parent?.slots['date-append']);

function CustomDate (props: Record<string, any>, context: SetupContext) {
  const slot = ins?.parent?.parent?.slots[props.name] as Slot;
  return slot ? slot({
    ...props,
  }) : context.slots.default ? context.slots.default() : null;
}

// PROPS
const props = defineProps({
  viewDate: {
    type: Date,
    required: true,
  },
});

// REFS
const rowRef = ref<HTMLDivElement[]>([]);
const dateRef = ref<HTMLSpanElement[]>([]);

// STATES
const maxRowHeight = ref(0);

// TODO
const DatePickerContext = useDatePicker()!;

const dateRows = computed(() => {
  return dateUtils.getWeekArray(props.viewDate, DatePickerContext.props.firstDayOfWeek);
});

onMounted(() => {
  syncRowHeight();
})

const syncRowHeight = () => {
  const rows = rowRef.value;
  if (rows) {
    for (const row of rows) {
      let height: string | number | void = getStyle(row, 'height');
      height = height ? parseFloat(height) : 0;
      maxRowHeight.value = Math.max(maxRowHeight.value, height);
    }
  }
}
const getSlotArgs = (date: Date) => {
  return {
    date,
    disabled: isDateDisabled(date),
    selected: isDateSelected(date),
    now: isToday(date),
  };
}
const isToday = (date: Date) => {
  if (!date) return false;
  return dateUtils.isEqualDate(date, new Date());
}
const isDateSelected = (date: Date) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  if (!curDate) return false;
  return (range ? curDate as Date[] : [curDate]).some(d => {
    return dateUtils.isEqualDate(d as Date, date);
  });
}
const isDateInRange = (date: Date) => {
  const { state: { curDate, hoveringDate }, computed: { range } } = DatePickerContext;
  if (!range || !curDate) return false;
  let startDate, endDate;
  let inRange = false;
  const len = (curDate as Date[]).length;
  if (len === 1 && hoveringDate && dateUtils.isAfterDate(hoveringDate, (curDate as Date[])[0])) {
    startDate = (curDate as Date[])[0];
    endDate = hoveringDate;
  } else if (len >= 2) {
    startDate = (curDate as Date[])[0];
    endDate = (curDate as Date[])[1];
  }
  if (startDate && endDate) {
    inRange = dateUtils.isEqualDate(startDate, endDate)
      ? false
      : dateUtils.isBetweenDates(date, startDate, endDate);
  } else if (startDate) {
    inRange = dateUtils.isEqualDate(date, startDate);
  } else if (endDate) {
    inRange = dateUtils.isEqualDate(date, endDate);
  }
  return inRange;
}
const isStartDate = (date: Date) => {
  const { state: { curDate, hoveringDate }, computed: { range } } = DatePickerContext;
  if (!range || !curDate) return false;
  const len = (curDate as Date[]).length;
  if (len <= 0) return false;
  let isStart = false;
  const isEqual = dateUtils.isEqualDate(date, (curDate as Date[])[0]);
  if (len === 1) {
    if (hoveringDate) {
      isStart = isEqual && dateUtils.isAfterDate(hoveringDate, date);
    } else isStart = isEqual;
  } isStart = isEqual;
  return isStart;
}
const isEndDate = (date: Date) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  if (!range || !curDate) return false;
  const len = (curDate as Date[]).length;
  if (len <= 1) return false;
  return dateUtils.isEqualDate(date, (curDate as Date[])[1]);
}
// range select and select the same day
const isDoubleSelected = (date: Date) => {
  const { state: { curDate }, computed: { range } } = DatePickerContext;
  if (!range || !curDate) return false;
  if (curDate && (curDate as Date[]).length >= 2) {
    const [startDate, endDate] = curDate as Date[];
    return dateUtils.isEqualDate(startDate, endDate) && dateUtils.isEqualDate(startDate, date);
  } else return false;
}
const isHovering = (date: Date) => {
  return dateUtils.isEqualDate(date, DatePickerContext.state.hoveringDate!);
}
const getDateClass = (date?: Date) => {
  if (date) {
    const { state: { curDate }, props: { isSoldOut, hightlightToday } } = DatePickerContext;
    const soldOut = isSoldOut && isSoldOut(date);
    const disabled = soldOut || isDateDisabled(date);
    const _isToday = isToday(date);
    const isStart = isStartDate(date);
    const isHoveringEnd = curDate && (curDate as Date[]).length === 1 && !isStart
      && isHovering(date) && dateUtils.isAfterDate(date, (curDate as Date[])[0]);
    return {
      [cls.join('date')]: true,
      [cls.join('date-end')]: isEndDate(date),
      [cls.join('date-selected')]: isDateSelected(date),
      [cls.join('date-start')]: isStart,
      [cls.join('date-double-selected')]: isDoubleSelected(date),
      [cls.join('date-in-range')]: isDateInRange(date),
      [cls.join('date-hovering-end')]: isHoveringEnd,
      [cls.join('date-disabled')]: disabled,
      [cls.join('date-sold-out')]: soldOut,
      [cls.join('date-today')]: hightlightToday && _isToday,
    };
  } else return {
    [cls.join('date')]: true,
    [cls.join('date-empty')]: true,
  };
}
const isDateDisabled = (date: Date) => {
  let disabled = false;
  const { props: { shouldDisableDate, minDate, maxDate } } = DatePickerContext;
  if (shouldDisableDate) {
    disabled = shouldDisableDate(date);
  }
  if (!disabled) {
    disabled = minDate && dateUtils.isBeforeDate(date, minDate) ||
      maxDate && dateUtils.isAfterDate(date, maxDate);
  }
  return disabled;
}
const onDateClick = (date?: Date) => {
  const { state: { curDate }, props: { isSoldOut, minRangeGap, isSelectable }, computed: { range } } = DatePickerContext;
  if (!date || isDateDisabled(date) || (isSoldOut && isSoldOut(date))) return;
  const selectable = typeof isSelectable === 'function'
    ? isSelectable(date, curDate)
    : true;
  if (!selectable) return;
  let newCurDate: Date | Date[];
  if (range) {
    // TODO: 需检测区间内是否存在禁用日期
    let timeGap = 0;
    if (curDate && (curDate as Date[]).length === 1 && (timeGap = date.getTime() - (curDate as Date[])[0].getTime()) >= 0) {
      if (timeGap >= minRangeGap * 1000) {
        newCurDate = [(curDate as Date[])[0], date];
      }
    } else {
      newCurDate = [date];
    }
  } else newCurDate = date;
  if (newCurDate!) {
    DatePickerContext.setCurDate(newCurDate);
  }
  DatePickerContext.emit('select', date);
}
const onDateHover = (date?: Date) => {
  if (!DatePickerContext.state.view) return;
  DatePickerContext.setHoveringDate(date);
}
</script>
