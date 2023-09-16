import { inject, reactive } from 'vue';
import type { PropType } from 'vue';
import { error } from '../../utils/log';
import { isValidDate } from './shared';

function dateValidator(date: any) {
  const valid = date instanceof Date && isValidDate(date);
  if (!valid) error('please provide a valid Date');
  return valid;
}

type DatePickerType = 'date' | 'date-range';

export const props = {
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
    validator(val: DatePickerType) {
      return ['date', 'date-range'].includes(val);
    }
  },
  date: {
    type: [Date, Array] as PropType<Date | Date[]>,
    validator(date: any) {
      if (Array.isArray(date)) {
        return date.length > 0 ? date.every(d => d instanceof Date) : true;
      } else return date instanceof Date;
    }
  },
  defaultViewDate: {
    type: Date,
    default: () => new Date(),
    validator: dateValidator,
  },
  doublePanel: Boolean,
  tip: String,
  firstDayOfWeek: {
    type: Number,
    default: 0,
    validator(val: number) {
      return [0, 1, 2, 3, 4, 5, 6].includes(val);
    }
  },
  width: {
    type: [Number, String],
    default: 340,
  },
  maxDate: {
    type: Date,
    validator: dateValidator,
  },
  minDate: {
    type: Date,
    // TODO
    // default() {
    //   return props.defaultViewDate;
    // },
    validator: dateValidator,
  },
  shouldDisableDate: Function,
  isSoldOut: Function,
  hightlightToday: Boolean,
  verticalScroll: Boolean,
  verticalMonthOffset: {
    type: Array,
    default: () => [0, 12],
  },
  minRangeGap: {
    type: Number,
    default: 86400 * 1,
  },
  viewSwitchable: {
    type: Boolean,
    default: false,
  },
  isSelectable: Function,
  shadow: Boolean,
}

export interface DatePickerProps {
  type: DatePickerType;
  date: Date | Date[];
  defaultViewDate: Date;
  doublePanel: boolean;
  tip: string;
  firstDayOfWeek: number;
  width: number | string;
  maxDate: Date;
  minDate: Date;
  shouldDisableDate: (d: Date) => boolean;
  isSoldOut: (d: Date) => boolean;
  hightlightToday: boolean;
  verticalScroll: boolean;
  verticalMonthOffset: number[];
  minRangeGap: number
  viewSwitchable: boolean;
  isSelectable: (d1: Date, d2: Date | Date[]) => boolean;
  shadow: boolean;
}

export interface DatePickerState {
  view: string
  viewDate: (Date | undefined)
  curDate: Date | Date[]
  hoveringDate: (Date | null)
  prevRangeDate: (Date | null)
}

export function useState (date: Date | Date[]): DatePickerState {
  return reactive({
    view: 'date',
    viewDate: undefined as (Date | undefined),
    curDate: date,
    hoveringDate: null as (Date | null),
    prevRangeDate: null as (Date | null),
  });
}

export interface DatePickerContext {
  props: DatePickerProps;
  state: DatePickerState;
  computed: {
    range: boolean;
    isDoublePanel: boolean;
    weeks: string[];
    panels: {
      viewDate: Date;
    }[];
    canSwitchView: boolean;
  };
  $scopedSlots: any; // TODO
  switchView: (_view: string, viewDate?: Date) => void;
  setCurDate: (date: Date | Date[]) => void;
  setViewDate: (date: Date) => void;
  setHoveringDate: (date?: Date) => void;
  // TODO emit
  emit: (event: string, ...args: any[]) => void;
}

export function useDatePicker() {
  return inject<DatePickerContext | undefined>('$DatePickerContext', undefined);
}
