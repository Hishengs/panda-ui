<template>
  <div
    v-show="visible"
    ref="wrapperRef"
    :class="cClass"
    @click.stop="onClick"
    @mousedown.prevent
    @mouseenter.stop="onHover"
  >
    <Checkbox v-if="showCheckbox" :value="isChecked" :disabled="isDisabled" />
    <span class="panda-option-label">
      <slot>{{ showLabel }}</slot>
    </span>
    <CheckIcon
      v-if="!showCheckbox && isChecked"
      class="panda-option-checked-icon"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount, reactive } from 'vue';
import Checkbox from '../checkbox';
import CheckIcon from './Check.vue';
import { isMobile } from '../../utils/bom';
import { useSelect, useOptionGroup } from './hook';

const escapeRegexpString = (value = '') =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

defineOptions({
  name: 'panda-option',
});

// PROPS
const props = defineProps({
  value: {
    type: [String, Number],
  },
  label: String,
  disabled: Boolean,
});

// REFS
const wrapperRef = ref<HTMLDivElement>();

// STATES
const $select = useSelect();
const $group = useOptionGroup();

// COMPUTED
const visible = computed(() => {
  const { bottomSheet = false, filterable = false } = $select?.props || {};
  const { query = '', mQuery = '' } = $select || {};
  const qy = bottomSheet ? mQuery : query;
  if (!qy || !filterable) return true;
  const RE = new RegExp(escapeRegexpString(qy), 'i');
  let matchValue,
    matchLabel = false;
  if (typeof props.value === 'string') {
    matchValue = RE.test(props.value);
  }
  matchLabel = !!(props.label && RE.test(props.label));
  return matchValue || matchLabel;
});
const isSelected = computed(() => {
  const { bottomSheet = false, multiple = false } = $select?.props || {};
  const { tempSelected = [] } = $select || {};
  const selected =
    bottomSheet && multiple ? tempSelected : $select?.selected || [];
  return Boolean(
    selected &&
      selected.length &&
      selected.find((o: any) => o === $OptionContext) !== undefined,
  );
});
const cClass = computed(() => {
  const hovering = $select && $select.hoverIndex === getIndex();
  return {
    'panda-option': true,
    'panda-option-disabled': isDisabled.value,
    'panda-option-selected': isSelected.value,
    'panda-option-hovering': !isMobile && hovering,
  };
});
const showLabel = computed(() => {
  return props.label || String(props.value === undefined ? '' : props.value);
});
const showCheckbox = computed(() => {
  const { bottomSheet = false, multiple = false } = $select?.props || {};
  return bottomSheet && multiple;
});
const isChecked = computed(() => {
  const { multiple = false } = $select?.props || {};
  return multiple && isSelected.value;
});
const isDisabled = computed(() => {
  return props.disabled || ($group && $group.props.disabled);
});

// CONTEXT FOR SELECT
const $OptionContext: OptionContext = reactive({
  props,
  visible,
  showLabel,
  $el: wrapperRef,
});
export interface OptionContext {
  props: typeof props;
  visible: boolean;
  showLabel: string;
  $el: HTMLDivElement | undefined;
}

// LIFECYCLES
onMounted(() => {
  $select && $select.onOptionAdd($OptionContext);
});
onBeforeMount(() => {
  $select && $select.onOptionRemove($OptionContext);
});

// METHODS
const onClick = () => {
  if (isDisabled.value) return;
  $select && $select.onOptionSelect($OptionContext);
};
const onHover = () => {
  const index = getIndex();
  if (index !== -1 && $select) $select.hoverIndex = index;
};
const getIndex = () => {
  return $select && $select.options && $OptionContext
    ? $select.options.indexOf($OptionContext)
    : -1;
};
</script>
