<template>
  <span
    :class="cClass"
    :tabIndex="tabIndex"
    role="switch"
    aria-label="switch"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <span class="panda-switch-base">
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
      <span class="panda-switch-track" />
      <span class="panda-switch-thumb" />
    </span>
    <!-- <span class="panda-switch-label" @click="onClick">
      <slot></slot>
    </span> -->
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useGlobal } from '../../utils/hooks';
import { useForm, useFormItem } from '../form/hook';

defineOptions({
  name: 'panda-switch',
});

// REFS
const inputRef = ref<HTMLInputElement>();

// INJECT
const { isRtl } = useGlobal();
const $form = useForm();
const $formItem = useFormItem();

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
  disabled: Boolean,
  size: {
    type: String,
    validator(val: string) {
      return ['normal', 'small'].includes(val);
    },
  },
});

// STATES
const inputVal = ref<typeof props.value>(false);
const checked = ref(props.value);

// COMPUTED
const cClass = computed(() => {
  const size = props.size || $form?.props.size;
  return {
    'panda-switch': true,
    'panda-switch-checked': !!isChecked.value,
    'panda-switch-disabled': isDisabled.value,
    [`panda-switch-${size}`]: !!size,
    'panda-switch-rtl': isRtl,
  };
});
const tabIndex = computed(() => {
  return isDisabled.value ? -1 : 0;
});
const isDisabled = computed(() => {
  return props.disabled || $form?.props.disabled;
});
const isChecked = computed(() => {
  return Boolean(props.value === undefined ? inputVal.value : checked.value);
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
  updateChecked();
});

// EMITS
const emit = defineEmits<{
  input: [val: typeof props.value];
  change: [val: typeof props.value];
  focus: [e?: Event];
  blur: [e?: Event];
}>();

const updateChecked = () => {
  checked.value = props.value === props.trueValue;
};
const onCheck = (e: Event) => {
  if (isDisabled.value) return;
  const { checked } = e.target as HTMLInputElement;
  // checked.value = checked;
  const value = checked ? props.trueValue : props.falseValue;
  inputVal.value = value;
  emit('input', value);
  emit('change', value);
  $formItem?.emit('change', value);
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

defineExpose({
  onClick,
  focus,
  blur
});
</script>
