<template>
  <div :class="cClass">
    <!-- prev btn -->
    <span
      :class="prevCls"
      :style="{
        visibility: (DatePickerContext.props.doublePanel && rightPanel) ? 'hidden' : 'visible'
      }"
      @click="prev"
    >
      <Icon :name="`chevron-${isRtl ? 'right' : 'left'}`" />
    </span>
    <!-- main -->
    <div class="panda-date-picker-panel-header-main">
      <span class="panda-date-picker-panel-header-title" :class="{ [`is-${DatePickerContext.state.view}`]: true }" @click="switchView()">
        <template v-if="DatePickerContext.state.view === 'date'">
          <span>{{ mon }}</span>&nbsp;<span>{{ year }}</span>
        </template>
        <template v-else-if="DatePickerContext.state.view === 'month'">
          <span>{{ year }}</span>
        </template>
        <template v-else-if="DatePickerContext.state.view === 'year'">
          <span>{{ Number(year) - YEAR_RANGE + 1 }}-{{ year }}</span>
        </template>
        <Arrow v-if="DatePickerContext.computed.canSwitchView && DatePickerContext.state.view !== 'year'" />
      </span>
    </div>
    <!-- next btn -->
    <span
      :class="nextCls"
      :style="{
        visibility: (DatePickerContext.props.doublePanel && !rightPanel) ? 'hidden' : 'visible'
      }"
      @click="next"
    >
      <Icon :name="`chevron-${isRtl ? 'left' : 'right'}`" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Icon from '../../icon';
import Arrow from './Arrow.vue';
import { t } from '../../../locale';
import { useDatePicker } from '../hook';
import * as dateUtils from '../dateUtils';
import { YEAR_RANGE } from './YearView.vue';
import { useGlobal } from '../../../utils/hooks';

// INJECT
const { isRtl } = useGlobal();

// TODO
const DatePickerContext = useDatePicker()!;

const props = defineProps({
  viewDate: {
    type: Date,
    default: () => new Date()
  },
  rightPanel: Boolean,
});

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-date-picker-panel-header': true,
    'panda-date-picker-panel-header-switchable': DatePickerContext.computed.canSwitchView,
  };
});
const mon = computed(() => {
  return t('datePicker.monthsShort')[props.viewDate!.getMonth()];
});
const year = computed(() => {
  return props.viewDate!.getFullYear();
});
const prevDisabled = computed(() => {
  const { state: { view, viewDate }, props: { minDate } } = DatePickerContext;
  if (minDate) {
    if (view === 'month') {
      return viewDate!.getFullYear() - 1 < minDate.getFullYear();
    } else if (view === 'year') {
      const startYear = viewDate!.getFullYear() - YEAR_RANGE + 1;
      return startYear - 1 < minDate.getFullYear();
    } else {
      const lastDateOfPrevMon = dateUtils.addDays(viewDate!, -1);
      return dateUtils.isBeforeDate(lastDateOfPrevMon, minDate);
    }
  }
  return false;
});
const nextDisabled = computed(() => {
  const { state: { view, viewDate }, props: { maxDate } } = DatePickerContext;
  if (maxDate) {
    if (view === 'month') {
      return viewDate!.getFullYear() + 1 > maxDate.getFullYear();
    } else if (view === 'year') {
      return viewDate!.getFullYear() + 1 > maxDate.getFullYear();
    } else {
      const firstDateOfNextMon = dateUtils.addMonths(viewDate!, +1);
      return dateUtils.isAfterDate(firstDateOfNextMon, maxDate) as boolean;
    }
  }
  return false;
});
const prevCls = computed(() => {
  return {
    'panda-date-picker-prev-btn': true,
    'panda-date-picker-prev-btn-disabled': prevDisabled.value,
  };
});
const nextCls = computed(() => {
  return {
    'panda-date-picker-next-btn': true,
    'panda-date-picker-next-btn-disabled': nextDisabled.value,
  };
});

// METHODS
const switchView = () => {
  const { state: { view }, computed: { canSwitchView } } = DatePickerContext;
  if (!canSwitchView || !['date', 'month'].includes(view)) return;
  DatePickerContext.switchView(view === 'date' ? 'month' : 'year');
}
const prev = () => {
  if (prevDisabled.value) return;
  slide(-1);
}
const next = () => {
  if (nextDisabled.value) return;
  slide(+1);
}
const slide = (offset: number) => {
  let viewDate;
  if (DatePickerContext.state.view === 'month') {
    viewDate = dateUtils.addYears(props.viewDate, offset);
  } else if (DatePickerContext.state.view === 'year') {
    viewDate = dateUtils.addYears(props.viewDate, offset * YEAR_RANGE);
  } else viewDate = dateUtils.addMonths(props.viewDate, props.rightPanel ? 0 : offset);
  DatePickerContext.setViewDate(viewDate);
}
</script>
