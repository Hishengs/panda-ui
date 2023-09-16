<template>
  <div ref="wrapperRef" :class="cClass" :style="cStyle">
    <!-- week -->
    <Week v-if="verticalScroll" :weeks="weeks" />
    <!-- panels -->
    <div ref="panelsRef" class="panda-date-picker-panels">
      <Panel
        v-for="(panel, i) in panels"
        :key="i"
        ref="panel"
        :view-date="panel.viewDate"
        :right-panel="doublePanel && i === 1"
        @view-switch="switchView"
        @mouseleave="state.hoveringDate = null"
      />
    </div>
    <!-- footer -->
    <div class="panda-date-picker-footer">
      <!-- tip -->
      <div v-if="!!tip || $slots.tip" class="panda-date-picker-tip">
        <slot name="tip">
          <Icon type="icon_tips_tips" />
          <div>{{ tip }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<script lang="ts" setup>
import { ref, computed, watch, provide, onMounted, nextTick, reactive } from 'vue';
import Icon from '../icon';
import Week from './Panel/Week.vue';
import Panel from './Panel/index.vue';
import * as dateUtils from './dateUtils';
import { useGlobal } from '../../utils/hooks';
import { isValidDate } from './shared';
import { warning } from '../../utils/log';
import { createNamespaceClass } from '../../utils/class';
import { props as rawProps, useState } from './hook';

const cls = createNamespaceClass('panda-date-picker');

defineOptions({
  name: 'panda-date-picker',
});

const props = defineProps(rawProps);

// INJECT
const { isRtl } = useGlobal();

// STATES
const date = new Date();
const state = useState(props.date || (props.type === 'date-range' ? [new Date(date.getTime() - 86400 * 1000), date] : date));

// COMPUTED
const range = computed(() => {
  return /range$/.test(props.type);
});
const cClass = computed(() => {
  return {
    [cls()]: true,
    [cls.join('vertical-scroll')]: props.verticalScroll,
    [cls.join('shadow')]: props.shadow,
    [cls.join('rtl')]: isRtl,
  };
});
// if it's double panel
const isDoublePanel = computed(() => {
  return props.doublePanel && !props.verticalScroll;
});
const weeks = computed(() => {
  return dateUtils.dateTimeFormat.getWeekDayArray(props.firstDayOfWeek);
});
const panels = computed(() => {
  const panels: any[] = [];
  let startDate = dateUtils.cloneDate(state.viewDate || props.defaultViewDate);
  startDate.setDate(1);
  if (props.verticalScroll) {
    let offset = 12;
    if (props.minDate && props.maxDate) {
      startDate = dateUtils.cloneDate(props.minDate);
      // 这里 setDate(1) 是为了解决以下特殊情况：
      // 当传递的日期入如 '2021-01-30'，此时下面月份加一操作会有问题，addMonths('2021-01-30', 1) 的结果会变成：'2021-03-02'
      // 是由于 setMonth 的 API 所导致，2 月份没有 30 天，会自动加2天到 3 月份：
      // https://developer.mozilla.org/zh-cn/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth#description
      startDate.setDate(1);
      offset = dateUtils.monthDiff(props.maxDate, startDate);
    }
    let i = 0;
    while (i <= offset) {
      const viewDate = dateUtils.addMonths(startDate, i);
      panels.push({
        viewDate,
      });
      i++;
    }
  } else {
    if (isDoublePanel.value) {
      panels.push({ viewDate: startDate });
      panels.push({ viewDate: dateUtils.addMonths(startDate, 1) });
    } else {
      panels.push({ viewDate: startDate });
    }
  }
  return panels;
});
const cStyle = computed(() => {
  let width = props.width;
  const factor = isDoublePanel.value ? 2 : 1;
  // if it's digital string
  if (typeof width === 'string' && !Number.isNaN(parseFloat(width))) {
    width = parseFloat(width);
  }
  width = typeof width === 'number' ? `${width * factor}px` : width;
  return {
    width,
  };
});
const canSwitchView = computed(() => {
  // view switch is not supported in double panel, vertical or range mode.
  const canSwitch = props.viewSwitchable && !isDoublePanel.value && !props.verticalScroll && !range.value;
  if (props.viewSwitchable && !canSwitch) {
    warning('view-switchable is not supported in double panel, vertical or range mode.');
  }
  return canSwitch;
});

// EMITS
const emit = defineEmits(['change', 'update:date']);

// WATCH
watch(() => state.curDate, (val: any, oldVal: any) => {
  if (range.value && (!val || val.length < 2)) return;
  const oldRangeDate = oldVal && oldVal.length < 2 && state.prevRangeDate
    ? state.prevRangeDate
    : oldVal;
  // check if same date
  if (stillSameDate(val, range.value ? oldRangeDate : oldVal)) return;
  nextTick(() => {
    emit('change', val);
  });
  emit('update:date', val);
  if (range.value) state.prevRangeDate = val;
});
watch(() => props.date, (val: any) => {
  // 避免日期相同但是不同 Date 对象导致的不必要的事件触发
  if (stillSameDate(val, state.curDate)) return;
  state.curDate = val;
});
watch(() => props.defaultViewDate, (val) => {
  if (val && !state.curDate) {
    setViewDate(val);
  }
});

// REFS
const panelsRef = ref<HTMLDivElement>();
const wrapperRef = ref<HTMLDivElement>();

const initViewDate = () => {
  let viewDate;
  if (props.defaultViewDate && !state.curDate) {
    viewDate = dateUtils.cloneDate(props.defaultViewDate);
  } else {
    const _curDate = state.curDate;
    if (range.value) {
      viewDate = _curDate && (_curDate as Date[]).length
        ? (_curDate as Date[])[0]
        : new Date();
    } else {
      viewDate = _curDate || new Date();
    }
    // get a copy
    viewDate = dateUtils.cloneDate(viewDate as Date);
  }
  setViewDate(viewDate);
}
const setViewDate = (date: Date) => {
  if (!isValidDate(date)) return;
  if (dateUtils.isEqualDate(date, state.viewDate as Date)) return;
  const d = dateUtils.cloneDate(date);
  d.setDate(1);
  state.viewDate = d;
}
const setCurDate = (date: Date | Date[]) => {
  state.curDate = date;
}
const setHoveringDate = (date?: Date) => {
  if (date) {
    state.hoveringDate = date;
  }
}
const scrollToCurrentMonth = () => {
  if (!panelsRef.value) return;
  const selected = wrapperRef.value?.querySelector('.panda-date-picker-date-selected');
  if (!selected) return;
  const isPanel = (el: HTMLElement) => el && Array.from(el.classList).includes('panda-date-picker-panel');
  let target = selected.parentElement;
  while (target && target !== wrapperRef.value) {
    if (isPanel(target)) break;
    else target = target.parentElement;
  }
  if (isPanel(target as HTMLElement)) {
    const scrollTop = (target as HTMLElement).offsetTop - panelsRef.value.offsetTop;
    panelsRef.value.scrollTo({
      top: scrollTop,
      // behavior: 'smooth'
    });
  }
}
const switchView = (_view: string, viewDate?: Date) => {
  state.view = _view;
  if (viewDate) {
    setViewDate(viewDate);
  }
}
const stillSameDate = (d1: Date | Date[], d2: Date | Date[]) => {
  if (d1 && d2) {
    if (d1 === d2) return true;
    if (range.value) {
      if ((d1 as Date[]).length === (d2 as Date[]).length) {
        const len = (d1 as Date[]).length;
        if (len === 0) return true;
        else return (d1 as Date[]).every((d, i) => dateUtils.isEqualDate(d, (d2 as Date[])[i]));
      } else return false;
    } else return dateUtils.isEqualDate((d1 as Date), (d2 as Date));
  } else return d1 === d2;
}

// LIFECYCLES
onMounted(() => {
  if (props.verticalScroll) {
    scrollToCurrentMonth();
  }
});
const created = () => {
  initViewDate();
}

created();

// PROVIDE
const $DatePickerContext = reactive({
  props,
  state,
  computed: {
    range,
    isDoublePanel,
    weeks,
    panels,
    canSwitchView,
  },
  canSwitchView,
  switchView,
  setCurDate,
  setViewDate,
  setHoveringDate,
});
// export type DatePickerContext = typeof $DatePickerContext;
provide('$DatePickerContext', $DatePickerContext);
</script>
