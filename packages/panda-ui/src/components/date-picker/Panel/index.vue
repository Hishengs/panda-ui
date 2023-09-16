<template>
  <div class="panda-date-picker-panel">
    <Header v-if="!DatePickerContext.props.verticalScroll" :view-date="viewDate!" :right-panel="rightPanel" />
    <Week v-if="!DatePickerContext.props.verticalScroll && curView === 'date'" :weeks="DatePickerContext.computed.weeks" />
    <VerticalTitle v-if="DatePickerContext.props.verticalScroll" :view-date="viewDate!" />
    <!-- view -->
    <div class="panda-date-picker-view-wrapper">
      <DateView v-if="curView === 'date'" :view-date="viewDate!" />
      <MonthView v-else-if="curView === 'month'" :view-date="viewDate!" @month-select="onMonthSelect" />
      <YearView v-else-if="curView === 'year'" :view-date="viewDate!" @year-select="onYearSelect" />
    </div>
    <!-- no need for panel footer for now -->
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import Week from './Week.vue';
import Header from './Header.vue';
import DateView from './DateView.vue';
import YearView from './YearView.vue';
import MonthView from './MonthView.vue';
import VerticalTitle from './VerticalTitle.vue';
import { useDatePicker } from '../hook';

// TODO
const DatePickerContext = useDatePicker()!;

// PROPS
const props = defineProps({
  viewDate: Date as PropType<Date>,
  rightPanel: Boolean,
});

// COMPUTED
const curView = computed(() => DatePickerContext.state.view);

// EMITS
const emit = defineEmits(['view-switch']);

// METHODS
const onMonthSelect = (mon: number) => {
  if (!DatePickerContext.computed.canSwitchView) return;
  const viewDate = new Date(props.viewDate as Date);
  viewDate.setMonth(props.rightPanel ? mon - 1 : mon);
  emit('view-switch', 'date', viewDate);
}
const onYearSelect = (year: number) => {
  if (!DatePickerContext.computed.canSwitchView) return;
  const viewDate = new Date(props.viewDate as Date);
  viewDate.setFullYear(props.rightPanel ? year - 1 : year);
  emit('view-switch', 'month', viewDate);
}
</script>
