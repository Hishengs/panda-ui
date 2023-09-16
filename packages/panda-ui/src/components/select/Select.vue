<template>
  <div ref="wrapperRef" v-click-outside="close" :class="cClass" @click="toggle">
    <input type="hidden" :name="name" :value="curValue" />
    <Poptip
      :value="showDropdown && !bottomSheet"
      trigger="none"
      :offset="5"
      :arrow="false"
      :max-height="1024"
      :max-width="7680"
      :z-index="zIndex"
      :width="poptipWidth"
      :placement="placement"
    >
      <div
        ref="referenceRef"
        class="panda-select-reference"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @keydown.tab="hideAndBlur"
        @keydown.esc.stop.prevent="hideAndBlur"
        @keydown.enter.prevent="onEnterSelect"
        @keydown.up.prevent="moveHoverOption(-1)"
        @keydown.down.prevent="moveHoverOption(+1)"
      >
        <!-- prefix -->
        <!-- TODO: 此部分可用，设计暂不需要，文档先对外隐藏 -->
        <span
          v-if="!!$slots.prefix"
          v-show="!viewAll"
          class="panda-select-prefix"
        >
          <slot name="prefix" />
        </span>
        <!-- input -->
        <input
          v-if="!showMutiple"
          ref="inputRef"
          v-model="query"
          type="text"
          :autocomplete="autocomplete"
          :placeholder="curPlaceholder"
          :readonly="readonly || bottomSheet"
          :disabled="isDisabled"
          @focus="onFocus"
          @blur="onBlur"
        />
        <!-- 多选 -->
        <div
          v-if="showMutiple"
          ref="multipleRef"
          class="panda-select-multiple panda-scrollbar-x"
          :style="{
            marginBottom: isOverflow ? '-5px' : '',
          }"
        >
          <span
            v-for="(option, i) in selected"
            :key="i"
            class="panda-select-selection-item"
            :class="{
              'is-plain': selectionStyle === 'plain',
              'is-last': i === selected.length - 1,
            }"
          >
            <span>{{ option.showLabel }}</span>
            <Icon
              v-if="selectionStyle !== 'plain'"
              type="icon_navigation_close"
              @click.stop="onRemoveOption(option)"
            />
          </span>
          <span v-if="viewAll && hasSelect" class="view-less">
            <!-- TODO: 多语言 -->
            <span @click.stop="toggleViewAll(false)">{{
              t('select.viewLess')
            }}</span>
          </span>
          <input
            v-if="filterable && !bottomSheet"
            v-show="!viewAll && hasSelect"
            ref="multipleInputRef"
            v-model="query"
            type="text"
            :autocomplete="autocomplete"
            :readonly="readonly"
            :disabled="isDisabled"
            :style="{
              minWidth: filterable ? '72px' : '',
            }"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
        <!-- suffix -->
        <span class="panda-select-suffix">
          <!-- view all -->
          <span
            v-if="showViewAll"
            class="view-all"
            @click.stop="toggleViewAll(true)"
          >
            <!-- TODO: 多语言 -->
            {{ t('select.viewMore') }}({{ selected.length }})
          </span>
          <!-- toggle btn -->
          <Icon
            v-show="showToggle"
            class="panda-select-toggle-btn"
            type="icon_navigation_chevron_down_xs"
          />
          <!-- clear btn -->
          <Icon
            v-if="showClear"
            class="panda-select-clear-btn"
            type="icon_feedback_failure_fill"
            @click.stop="onClear"
          />
        </span>
      </div>
      <!-- select dropdown -->
      <template v-if="!bottomSheet" #content>
        <SelectDropdown ref="dropdown">
          <slot />
        </SelectDropdown>
      </template>
    </Poptip>
    <!-- TODO: 设计原因，暂时禁用，后面可能直接去掉 -->
    <!-- <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p> -->
    <!-- support dropdown type: bottom-sheet -->
    <BottomSheet
      v-if="bottomSheet"
      ref="bottomSheetRef"
      v-model:visible="showDropdown"
      :height="bottomSheetHeight"
      v-bind="bottomSheetProps"
      show-close
      @close="onBottmSheetClose('close')"
    >
      <template #header>
        <div class="header-left">
          <Icon type="icon_navigation_close" size="20" @click="close()" />
        </div>
        <div class="header-title">
          <h1 v-if="bottomSheetTitle">
            {{ bottomSheetTitle }}
          </h1>
        </div>
        <div v-if="multiple" class="header-right">
          <Button type="outlined" size="mini" @click="confirm">
            {{ t('select.save') }}
          </Button>
        </div>
      </template>
      <Input
        v-if="filterable"
        v-model="mQuery"
        style-type="filled"
        :placeholder="t('select.search')"
        clearable
        :autocomplete="autocomplete"
        :readonly="readonly"
        :disabled="isDisabled"
      />
      <SelectDropdown ref="dropdownRef">
        <slot />
      </SelectDropdown>
    </BottomSheet>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  nextTick,
  watch,
  reactive,
  provide,
} from 'vue';
import Icon from '../icon';
import Input from '../input';
import Button from '../button';
import Poptip from '../poptip';
import { t } from '../../locale';
import BottomSheet from '../bottom-sheet';
import SelectDropdown from './SelectDropdown.vue';
import { isNullish } from '../../utils/is';
import { isIE, isEdge } from '../../utils/bom';
import { useGlobal } from '../../utils/hooks';
import { useForm, useFormItem } from '../form/hook';
import { getCompInitialZIndex } from '../../utils/comp';
import scrollIntoView from '../../utils/scroll-into-view';
import clickOutside from '../../directives/click-outside';
import {
  addResizeListener,
  removeResizeListener,
} from '../../utils/resize-event';
import type { OptionContext } from './Option.vue';
import { Placements } from '../../utils/const';
import type { Placement } from '../../utils/const';

defineOptions({
  name: 'panda-select',
  directives: { clickOutside },
});

// INJECT
const { isRtl } = useGlobal();
const $form = useForm();
const $formItem = useFormItem();

// PROPS
const props = defineProps({
  styleType: {
    type: String,
    validator(val: string) {
      return ['lined', 'outlined', 'filled'].includes(val);
    },
  },
  value: {
    type: [Array, String, Number],
  },
  multiple: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    // default: 'normal',
    validator(val: string) {
      return ['small', 'normal', 'large'].includes(val);
    },
  },
  clearable: Boolean,
  name: String,
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: String,
  filterable: Boolean,
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator(val: Placement) {
      return Placements.includes(val);
    },
  },
  maxHeight: {
    type: Number,
    default: 500,
  },
  // errorMessage: String,
  selectionStyle: {
    type: String,
    default: 'tag',
    validator(val: string) {
      return ['tag', 'plain'].includes(val);
    },
  },
  hideViewAll: Boolean,
  bottomSheet: Boolean,
  bottomSheetTitle: String,
  bottomSheetHeight: String,
  bottomSheetProps: {
    type: Object,
    default: () => {},
  },
  placeholderEm: Boolean,
});

// STATES
const query = ref('');
const mQuery = ref(''); // query of mobile bottom-sheet
const options = ref<OptionContext[]>([]);
const selected = ref<OptionContext[]>([]);
const isFocus = ref(false);
const viewAll = ref(false);
const hoverIndex = ref(-1);
const hovering = ref(false);
const tempSelected = ref<OptionContext[]>([]);
const isOverflow = ref(false);
const showDropdown = ref(false);
const curValue = ref<string | number | unknown[] | undefined>(props.value);
const poptipWidth = ref<number>();
const curPlaceholder = ref(props.placeholder);
const cachedPlaceholder = ref(props.placeholder);
const zIndex = getCompInitialZIndex('panda-select');

// REFS
const wrapperRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();
const multipleRef = ref<HTMLInputElement>();
const multipleInputRef = ref<HTMLInputElement>();
const referenceRef = ref<HTMLDivElement>();
const dropdownRef = ref<typeof SelectDropdown>();
const bottomSheetRef = ref<typeof BottomSheet>();

// COMPUTED
const cClass = computed(() => {
  const size = props.size || $form?.props.size;
  const styleType = props.styleType || $form?.props.styleType;
  return {
    'panda-select': true,
    'panda-select-focus': isFocus.value,
    'panda-select-view-all': viewAll.value,
    'panda-select-disabled': isDisabled.value,
    'panda-select-multiple': props.multiple,
    'panda-select-expand': showDropdown.value,
    'panda-select-filterable': props.filterable,
    [`panda-select-${styleType}`]: !!styleType,
    [`panda-select-${size}`]: !!size,
    'placeholder-em': props.placeholderEm,
    'panda-select-highlight': highlight.value,
    'panda-select-rtl': isRtl,
    // 'panda-select-with-error': !!this.errorMessage,
  };
});
const selectedLabel = computed(() => {
  return props.multiple
    ? ''
    : selected.value[0]
    ? selected.value[0].showLabel
    : '';
});
const hasSelect = computed(() => {
  return selected.value && !!selected.value.length;
});
const readonly = computed(() => {
  return !props.filterable || (!isIE() && !isEdge() && !showDropdown.value);
});
const showClear = computed(() => {
  return (
    props.clearable &&
    !isDisabled.value &&
    hovering.value &&
    !viewAll.value &&
    hasSelect.value
  );
});
const showToggle = computed(() => {
  return !showClear.value && !viewAll.value;
});
const showViewAll = computed(() => {
  return (
    props.multiple && isOverflow.value && hasSelect.value && !props.hideViewAll
  );
});
const showMutiple = computed(() => {
  return props.multiple && hasSelect.value;
});
const curInput = computed(() => {
  return showMutiple.value ? multipleInputRef.value : inputRef.value;
});
const isEmpty = computed(() => {
  return (
    options.value.length <= 0 ||
    options.value.filter((option: OptionContext) => option.visible).length <= 0
  );
});
const isDisabled = computed(() => {
  return props.disabled || !!$form?.props.disabled;
});
const highlight = computed(() => {
  // const hasSelected = props.multiple
  //   ? Array.isArray(curValue.value) && !!curValue.value.length
  //   : !isNullish(curValue.value) && curValue.value !== '';
  return !isDisabled.value && isFocus.value;
});
const allOptionsDisabled = computed(() => {
  return options.value
    .filter((option: OptionContext) => option.visible)
    .every((option: OptionContext) => option.props.disabled);
});

// EMITS
const emit = defineEmits<{
  input: [val: any];
  change: [val: any];
  clear: [];
}>();

// METHODS
const updateDomRelated = () => {
  poptipWidth.value = referenceRef.value!.clientWidth;
  setOverflow();
};
const setOverflow = () => {
  if (!multipleRef.value) return;
  const { clientWidth, scrollWidth } = multipleRef.value;
  isOverflow.value = scrollWidth > clientWidth;
};
const getValue = (selected: any[]) => {
  if (!selected) return undefined;
  if (props.multiple) {
    return selected.map((option) => option.props.value);
  } else {
    return selected[0] && selected[0].value;
  }
};
const getSelected = (val: any): OptionContext[] => {
  if (isNullish(val)) return selected.value;
  const _selected: OptionContext[] = [];
  const value = props.multiple ? val : [val];
  for (const v of value) {
    const option = options.value.find(
      (option: OptionContext) => option.props.value === v,
    );
    if (option) {
      _selected.push(option);
      if (!props.multiple) break;
    }
  }
  // 防止死循环
  const isEmpty = _selected.length === 0;
  const isSame =
    _selected.length === selected.value.length
      ? isEmpty
        ? true
        : _selected.every((option) => selected.value.includes(option))
      : false;
  return isSame ? selected.value : _selected;
};
const toggleViewAll = (show = false) => {
  if (show) {
    close();
    viewAll.value = true;
  } else {
    viewAll.value = false;
    setTimeout(() => {
      scrollMultipleToEnd(false);
      focusMultipleInput();
    }, 0);
  }
};
const toggle = (e: Event) => {
  if (e && isEventInBottomSheet(e)) return;
  if (showDropdown.value) close();
  else open();
  focus();
};
const open = () => {
  if (isDisabled.value || viewAll.value) return;
  showDropdown.value = true;
  // bottom-sheet
  if (props.bottomSheet && props.multiple) {
    tempSelected.value = selected.value.slice();
  }
};
const close = (e?: Event) => {
  if (e && isEventInBottomSheet(e)) return;
  if (isDisabled.value || !showDropdown.value) return;
  showDropdown.value = false;
  scrollMultipleToStart();
  if (props.bottomSheet) {
    tempSelected.value = [];
  }
};
const focus = () => {
  curInput.value && curInput.value.focus();
};
const blur = () => {
  curInput.value && curInput.value.blur();
};
const onFocus = () => {
  if (props.filterable) {
    isFocus.value = true;
    if (!props.bottomSheet) query.value = '';
    cachedPlaceholder.value = curPlaceholder.value;
    if (selectedLabel.value) {
      curPlaceholder.value = selectedLabel.value;
    }
  }
};
const onBlur = () => {
  if (props.filterable) {
    isFocus.value = false;
    if (!props.bottomSheet) query.value = selectedLabel.value;
    curPlaceholder.value = cachedPlaceholder.value;
  }
};
const hideAndBlur = () => {
  if (isDisabled.value) return;
  close();
  blur();
};
const onOptionSelect = (option: any) => {
  if (props.multiple) {
    const _selected = props.bottomSheet ? tempSelected.value : selected.value;
    const index = _selected.indexOf(option);
    if (index !== -1) {
      _selected.splice(index, 1);
    } else _selected.push(option);
    if (props.filterable) {
      if (query.value && !props.bottomSheet) {
        query.value = '';
      }
      nextTick(focusMultipleInput);
    }
    nextTick(() => {
      setOverflow();
      nextTick(scrollMultipleToEnd);
    });
  } else {
    // 注意：通过下标直接赋值 Vue 是检测不到的
    selected.value.splice(0, 1, option);
    hideAndBlur();
  }
};
const confirm = () => {
  if (!(props.multiple && props.bottomSheet)) return;
  selected.value.length = 0;
  selected.value = selected.value.concat(tempSelected.value);
  close();
};
const onRemoveOption = (option: any) => {
  if (isDisabled.value) return;
  const index = selected.value.indexOf(option);
  if (index !== -1) {
    selected.value.splice(index, 1);
  }
};
const onClear = () => {
  selected.value = [];
  emit('clear');
};
const scrollMultipleToEnd = (smooth = true) => {
  if (isOverflow.value && multipleRef.value) {
    const { clientWidth, scrollWidth } = multipleRef.value;
    multipleRef.value.scrollTo({
      left: scrollWidth - clientWidth,
      behavior: smooth ? 'smooth' : undefined,
    });
  }
};
const scrollMultipleToStart = () => {
  if (isOverflow.value && multipleRef.value) {
    multipleRef.value.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }
};
const focusMultipleInput = () => {
  if (props.multiple && props.filterable && curInput.value) {
    curInput.value.focus();
  }
};
const onOptionAdd = (option: OptionContext) => {
  if (!options.value.includes(option)) {
    options.value.push(option);
  }
};
const onOptionRemove = (option: OptionContext) => {
  const index = options.value.indexOf(option);
  if (index !== -1) {
    options.value.splice(index, 1);
  }
};
const onEnterSelect = () => {
  if (isDisabled.value) return;
  if (!showDropdown.value) {
    open();
    return;
  }
  if (hoverIndex.value >= 0) {
    const option = options.value[hoverIndex.value];
    if (!option || option.props.disabled || !option.visible) return;
    onOptionSelect(option);
  }
};
const scrollToOption = (option: any) => {
  if (dropdownRef.value && option) {
    const inner = dropdownRef.value.$refs.inner;
    scrollIntoView(inner, option.$el);
  }
};
const scrollToTop = () => {
  if (dropdownRef.value) {
    const inner = dropdownRef.value.$refs.inner;
    inner.scrollTo({
      top: 0,
    });
  }
};
const moveHoverOption = (dir = +1) => {
  if (!showDropdown.value) {
    open();
    return;
  }
  if (
    isDisabled.value ||
    !showDropdown.value ||
    !dropdownRef.value ||
    allOptionsDisabled.value
  )
    return;
  const _hoverIndex = (hoverIndex.value + dir) % options.value.length;
  hoverIndex.value = _hoverIndex < 0 ? options.value.length - 1 : _hoverIndex;
  const option = options.value[hoverIndex.value];
  if (!option) return;
  if (option.props.disabled || !option.visible) {
    // move to next one
    moveHoverOption(dir);
    return;
  }
  const inner = dropdownRef.value.$refs.inner;
  scrollIntoView(inner, option.$el);
};
const isEventInBottomSheet = (e: Event) => {
  return bottomSheetRef.value && bottomSheetRef.value.$el.contains(e.target);
};
const onBottmSheetClose = (from: string) => {
  if (from === 'mask' || from === 'pull') close();
};

// WATCHS
watch(
  () => showDropdown.value,
  (val) => {
    if (val) {
      if (props.bottomSheet) mQuery.value = '';
      if (hasSelect.value) {
        nextTick(() => {
          scrollToOption(selected.value[0]);
        });
        /* const index = options.value.findIndex(option => option === selected.value[0]);
      if (index !== undefined) {
        hoverIndex.value = index;
      } */
        hoverIndex.value = -1;
      } else nextTick(scrollToTop);
    } else {
      hoverIndex.value = -1;
    }
  },
);
watch(
  () => selectedLabel.value,
  (val) => {
    query.value = val;
  },
);
watch(
  () => props.value,
  (val) => {
    curValue.value = val;
  },
);
watch(
  () => curValue.value,
  (val) => {
    emit('input', val);
    emit('change', val);
    $formItem?.emit('change', val);
    selected.value = getSelected(val);
  },
);
watch(
  () => selected.value,
  (val) => {
    const newVal = getValue(val);
    const isSame = props.multiple
      ? curValue.value !== undefined &&
        newVal.length === (curValue.value as unknown[]).length &&
        newVal.every((v: any) => (curValue.value as unknown[]).includes(v))
      : newVal === curValue.value;
    if (!isSame) curValue.value = newVal;
  },
);
watch(
  () => props.placeholder,
  (val) => {
    curPlaceholder.value = cachedPlaceholder.value = val;
  },
);
watch(
  () => hasSelect.value,
  (val) => {
    if (!val && viewAll.value) {
      toggleViewAll(false);
    }
  },
);
watch(
  () => options.value,
  (val, oldVal) => {
    if (
      oldVal &&
      oldVal.length &&
      val &&
      val.length &&
      curValue.value !== undefined
    ) {
      selected.value = getSelected(curValue.value);
    }
  },
);

// LIFECYCLES
onUpdated(() => {
  nextTick(updateDomRelated);
});
const onCreate = () => {
  const isUndef = props.value === undefined;
  const isArr = Array.isArray(props.value);
  if (props.multiple && !isArr && !isUndef) {
    emit('input', []);
  } else if (!props.multiple && isArr) {
    emit('input', '');
  } else {
    if (!isUndef) {
      selected.value = getSelected(props.value);
    }
  }
};
onMounted(() => {
  selected.value = getSelected(props.value);
  addResizeListener(wrapperRef.value, updateDomRelated);
});
onBeforeUnmount(() => {
  removeResizeListener(wrapperRef.value, updateDomRelated);
});

onCreate();

// PROVIDE
const $SelectContext = reactive({
  props,
  isEmpty,
  query,
  mQuery,
  options,
  selected,
  hoverIndex,
  tempSelected,
  onOptionAdd,
  onOptionRemove,
  onOptionSelect,
});
export type SelectContext = typeof $SelectContext;
provide('$SelectContext', $SelectContext);
</script>
