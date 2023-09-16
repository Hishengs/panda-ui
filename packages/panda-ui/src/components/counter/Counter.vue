<template>
  <div :class="cClass">
    <div :class="decreaseClass" @click="decrease">
      <Icon name="minus" />
    </div>
    <div class="panda-counter-input">
      <input
        ref="inputRef"
        type="text"
        :value="displayValue"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.up.prevent="increase"
        @keydown.down.prevent="decrease"
      >
    </div>
    <div :class="increaseClass" @click="increase">
      <Icon name="plus" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import Icon from '../icon';
import { useForm, useFormItem } from '../form/hook';
import { useGlobal } from '../../utils/hooks';

// INJECT
const $form = useForm();
const $formItem = useFormItem();
const { isRtl } = useGlobal();

defineOptions({
  name: 'panda-counter',
});

// PROPS
const props = defineProps({
  type: {
    type: String,
    validator(val: string) {
      return ['primary'].includes(val);
    }
  },
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  precision: {
    type: Number,
    validator(val: number) {
      return val >= 0 && val === parseInt(val + '', 10);
    }
  },
  size: {
    type: String,
    validator(val: string) {
      return ['small'].includes(val);
    }
  },
  disabled: Boolean,
  autofocus: Boolean,
  readonly: Boolean,
});

// STATES
const currentValue = ref(props.value);

// REF
const inputRef = ref<HTMLInputElement>();

// COMPUTED
const decreaseDisabled = computed(() => {
  return props.disabled || countValue(currentValue.value, -props.step) < props.min;
})
const increaseDisabled = computed(() => {
  return props.disabled || countValue(currentValue.value, +props.step) > props.max;
})
const decreaseClass = computed(() => {
  return {
    'panda-counter-decrease': true,
    'panda-counter-decrease-disabled': decreaseDisabled.value
  };
})
const increaseClass = computed(() => {
  return {
    'panda-counter-increase': true,
    'panda-counter-increase-disabled': increaseDisabled.value
  };
})
const cClass = computed(() => {
  const size = props.size || $form?.props.size;
  const disabled = props.disabled || $form?.props.disabled;
  return {
    'panda-counter': true,
    'panda-counter-disabled': disabled,
    [`panda-counter-${size}`]: !!size,
    [`panda-counter-${props.type}`]: !!props.type,
    'panda-counter-rtl': isRtl,
  };
})
// calc the actual precision should be used
const cPrecision = computed(() => {
  const { precision, step } = props;
  const stepPrecision = getPrecision(step);
  if (precision !== undefined) {
    if (precision < stepPrecision) {
      console.warn('[Counter]: precision should be large than step\'precision.');
    }
    return precision;
  } else {
    const valPrecision = getPrecision(currentValue.value);
    return Math.max(valPrecision, stepPrecision);
  }
})
const displayValue = computed(() => {
  if (props.precision) {
    return currentValue.value.toFixed(props.precision);
  } else return currentValue.value;
})

// EMITS
const emit = defineEmits(['input', 'change', 'disabled-click', 'decrease', 'increase', 'focus', 'blur']);

// WATCH
watch(() => currentValue.value, (val) => {
  emit('input', val);
  emit('change', val);
  $formItem?.emit('change', val);
})
watch(() => props.value, (val) => {
  if (isValid(val)) {
    currentValue.value = val;
  }
})

// METHODS
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let value: string | number = target.value;
  // reset to min if empty
  if (!value || !value.trim()) {
    target.value = props.min + '';
    value = props.min + '';
  }
  value = Number(value);
  if (Number.isNaN(value)) {
    // reset to original value if not a number
    target.value = currentValue.value + '';
    return false;
  } else if (value < props.min) {
    target.value = props.min + '';
    value = props.min;
  } else if (value > props.max) {
    target.value = props.max + '';
    value = props.max;
  }
  setValue(countValue(value));
}
const isValid = (val: any) => {
  if (typeof val === 'string') val = Number(val);
  if (typeof val !== 'number') return false;
  if (Number.isNaN(val)) return false;
  return true;
}
const countValue = (val: any, step = 0) => {
  if (!isValid(val)) return;
  const factor = Math.pow(10, cPrecision.value);
  val = (val * factor + step * factor) / factor;
  val = toPrecision(val, cPrecision.value);
  return val;
}
const setValue = (val: any) => {
  if (!isValid(val)) return;
  let newVal = val;
  if (newVal > props.max) newVal = props.max;
  if (newVal < props.min) newVal = props.min;
  if (newVal === currentValue.value) return;
  currentValue.value = newVal;
}
const toPrecision = (val: number, precision: number) => {
  if (!precision) return val;
  return parseFloat(Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision) + '');
}
/**
 * get precision with a given value
 */
const getPrecision = (val: any) => {
  let precision = 0;
  const sVal = val.toString();
  const index = sVal.indexOf('.');
  if (index !== -1) {
    precision = sVal.slice(index + 1).length;
  }
  return precision;
}
const decrease = () => {
  if (decreaseDisabled.value) {
    emit('disabled-click', 'decrease');
    return;
  }
  emit('decrease', currentValue.value);
  setValue(countValue(currentValue.value, -props.step));
}
const increase = () => {
  if (increaseDisabled.value) {
    emit('disabled-click', 'increase');
    return;
  }
  emit('increase', currentValue.value);
  setValue(countValue(currentValue.value, +props.step));
}
const onFocus = (e: Event) => {
  emit('focus', e);
  if (!props.disabled && !props.readonly && inputRef.value) {
    inputRef.value.select();
  }
}
const onBlur = (e: Event) => {
  emit('blur', e);
}
</script>
