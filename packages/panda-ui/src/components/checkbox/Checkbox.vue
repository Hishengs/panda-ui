<template>
  <span
    :class="cClass"
    :tabIndex="tabIndex"
    role="checkbox"
    aria-label="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <span class="panda-checkbox-base">
      <input
        ref="inputRef"
        type="checkbox"
        :name="name"
        :value="isChecked"
        :checked="isChecked"
        :disabled="isDisabled"
        aria-hidden="true"
        tabIndex="-1"
        @change="onCheck"
        @focus="onFocus"
        @blur="onBlur"
      />
      <!-- 选中 -->
      <CheckedIcon v-show="isChecked && !indeterminate" />
      <!-- 半选 -->
      <HalfCheckedIcon v-show="indeterminate" />
    </span>
    <span
      v-if="$slots.default"
      class="panda-checkbox-label"
      @click.stop="onClick"
    >
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  reactive,
} from 'vue';
import CheckedIcon from './CheckedIcon.vue';
import HalfCheckedIcon from './HalfCheckedIcon.vue';
import { useGlobal } from '../../utils/hooks';
import { useForm, useFormItem } from '../form/hook';
import { useCheckboxGroup } from './hook';

defineOptions({
  name: 'panda-checkbox',
});

// PROPS
const props = defineProps({
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  groupValue: {
    type: [String, Number],
  },
  disabled: Boolean,
  // TODO: 设计决定只保留一种尺寸，代码内先屏蔽，逻辑保留一段时间，后面再整体移除
  /* size: {
    type: String,
    validator (val) {
      return ['normal', 'small'].includes(val);
    }
  }, */
  // 不确定态
  indeterminate: Boolean,
});

// INJECT
const { isRtl } = useGlobal();
const $form = useForm();
const $formItem = useFormItem();
const $group = useCheckboxGroup();

// REFS
const inputRef = ref<HTMLInputElement>();

// STATE
const size = ref('normal');
const inputVal = ref<string | number | boolean>(false);
const checked = ref(false);
const inGroup = ref(false);

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-checkbox': true,
    'panda-checkbox-checked': isChecked.value,
    'panda-checkbox-disabled': isDisabled.value,
    [`panda-checkbox-${cSize.value}`]: !!cSize.value,
    'panda-checkbox-indeterminate': props.indeterminate,
    'panda-checkbox-rtl': isRtl,
  };
});
const groupChecked = computed(() => {
  return (
    inGroup.value &&
    !!$group &&
    ($group.props.value || []).includes(props.groupValue)
  );
});
const isChecked = computed(() => {
  return inGroup.value
    ? !!groupChecked.value
    : props.value === undefined
    ? !!inputVal.value
    : !!checked.value;
});
const isDisabled = computed(() => {
  return (
    (inGroup.value
      ? ($group && $group.props.disabled) || props.disabled
      : props.disabled) || !!$form?.props.disabled
  );
});
const cSize = computed(() => {
  return (
    size.value ||
    (inGroup.value && $group && $group.props.size) ||
    $form?.props.size
  );
});
const tabIndex = computed(() => {
  return isDisabled.value || (inGroup.value && !isChecked.value) ? -1 : 0;
});

// WATCH
watch(
  () => props.value,
  (val) => {
    if (val === props.trueValue || val === props.falseValue) {
      updateChecked();
    } else {
      throw 'value should be true-value or false-value.';
    }
  },
);

// LIFECYCLES
onMounted(() => {
  $group && $group.onChildAdd(this);
  updateChecked();
});
onBeforeUnmount(() => {
  $group && $group.onChildRemove(this);
});

// EMITS
const emit = defineEmits<{
  input: [val: any];
  change: [val: any];
  focus: [e: Event];
  blur: [e: Event];
}>();

// METHODS
const updateChecked = () => {
  checked.value = props.value === props.trueValue;
};
const onCheck = (e: Event) => {
  // console.log('>>> onCheck', e);
  if (isDisabled.value) return false;
  const { checked } = e.target as HTMLInputElement;
  // checked.value = checked;

  const value = checked ? props.trueValue : props.falseValue;
  emit('input', value);
  inputVal.value = value;
  // console.log('>>> onCheck', inputVal.value, props.value);

  if (inGroup.value) {
    $group && $group.onChildChange(this);
  } else {
    emit('change', value);
    $formItem?.emit('change', value);
  }
};
const onClick = () => {
  inputRef.value?.click();
};
const focus = () => {
  if (isDisabled.value) return;
  inputRef.value?.focus();
};
const blur = () => {
  if (isDisabled.value) return;
  inputRef.value?.blur();
};
const onFocus = (e: Event) => {
  emit('focus', e);
};
const onBlur = (e: Event) => {
  emit('blur', e);
};

defineExpose(
  reactive({
    focus,
    blur,
  }),
);
</script>
