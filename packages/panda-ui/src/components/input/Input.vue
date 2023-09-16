<template>
  <div :class="cClass">
    <!-- label -->
    <!-- TODO: 暂时隐藏，设计没决定要不要 -->
    <!-- <p class="panda-input-label" v-if="label">{{ label }}</p> -->
    <div
      class="panda-input-inner"
      @click.self="focus"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- prepend -->
      <div
        v-if="($slots.prepend || prependIcon) && !isTextarea"
        class="panda-input-prepend"
      >
        <slot name="prepend">
          <Icon
            v-if="prependIcon"
            class="panda-input-prepend-icon"
            :name="prependIcon"
          />
        </slot>
      </div>
      <!-- textarea -->
      <textarea
        v-if="type === 'textarea'"
        ref="textarea"
        class="panda-scrollbar-y"
        type="text"
        v-bind="$attrs"
        :name="name"
        :value="curValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :spellcheck="spellcheck"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="rows"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onEnter"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @input="onInput"
        @change="onChange"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionUpdate"
        @compositionend="onCompositionEnd"
      />
      <!-- input -->
      <input
        v-else
        ref="input"
        :type="isPassword ? (passwordVisible ? 'text' : 'password') : type"
        v-bind="$attrs"
        :name="name"
        :value="curValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :spellcheck="spellcheck"
        :maxlength="maxlength"
        :minlength="minlength"
        :max="max"
        :min="min"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onEnter"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @input="onInput"
        @change="onChange"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionUpdate"
        @compositionend="onCompositionEnd"
      />
      <!-- append icon -->
      <div
        v-if="($slots.append || appendIcon) && !isTextarea"
        class="panda-input-append"
      >
        <slot name="append">
          <Icon
            v-if="appendIcon"
            class="panda-input-append-icon"
            :name="appendIcon"
          />
        </slot>
      </div>
      <!-- clearable btn -->
      <Icon
        v-if="clearable && !isTextarea"
        v-show="showClear"
        class="panda-input-clearable-btn"
        name="x"
        @click="clear"
      />
      <!-- toggle password btn -->
      <Icon
        v-if="isPassword && !isTextarea"
        v-show="showPassword"
        class="panda-input-password-btn"
        :name="passwordVisible ? 'eye' : 'eye-off'"
        @click="togglePasswdVisible"
      />
      <!-- words count -->
      <div
        v-if="(wordsCount || $slots['words-count']) && isTextarea"
        class="panda-input-words-count"
      >
        <slot name="words-count" :words-num="wordsNum">
          {{ wordsNum }}
        </slot>
      </div>
    </div>
    <!-- error message -->
    <!-- TODO: 暂时隐藏，设计没决定要不要 -->
    <!-- <p class="panda-input-error-message" v-if="errorMessage || $slots['error-message']">
      <slot name="error-message">{{ errorMessage }}</slot>
    </p> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue';
import Icon from '../icon';
import { useForm, useFormItem } from '../form/hook';
import { useGlobal } from '../../utils/hooks';

defineOptions({
  name: 'panda-input',
});

// INJECT
const $form = useForm();
const $formItem = useFormItem();
const { isRtl } = useGlobal();

// PROPS
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: [String, Number],
  size: {
    type: String,
    // default: 'normal',
    validator(val: string) {
      return ['small', 'normal', 'large'].includes(val);
    },
  },
  styleType: {
    type: String,
    // default: 'outlined',
    validator(val: string) {
      return ['outlined', 'lined', 'filled'].includes(val);
    },
  },
  disabled: Boolean,
  readonly: Boolean,
  autocomplete: {
    type: String,
    default: 'off',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  wordsCount: Boolean,
  wordsCountFunction: Function,
  maxlength: Number,
  minlength: Number,
  max: Number,
  min: Number,
  placeholder: String,
  prependIcon: String,
  appendIcon: String,
  name: String,
  autofocus: Boolean,
  // label: String,
  // errorMessage: String,
  rows: {
    type: Number,
    default: 5,
  },
  spellcheck: Boolean,
});

// STATES
const curValue = ref(props.value);
const isFocus = ref(false);
const passwordVisible = ref(false);
const isComposing = ref(false);
const hovering = ref(false);

// COMPUTED
const isDisabled = computed(() => {
  return props.disabled || $form?.props.disabled;
});
const cClass = computed(() => {
  const size = props.size || $form?.props.size;
  const styleType = props.styleType || $form?.props.styleType;
  return {
    'panda-input': true,
    'panda-input-is-focus': isFocus.value,
    'panda-input-disabled': isDisabled.value,
    [`panda-input-${size}`]: !!size,
    // 'panda-input-with-error': !!props.errorMessage,
    [`panda-input-${styleType}`]: !!styleType,
    'panda-input-is-textarea': props.type === 'textarea',
    'panda-input-rtl': isRtl,
  };
});
const showClear = computed(() => {
  return (
    props.clearable &&
    !isDisabled.value &&
    !props.readonly &&
    curValue.value &&
    (isFocus.value || hovering.value)
  );
});
const isPassword = computed(() => {
  return props.type === 'password';
});
const isTextarea = computed(() => {
  return props.type === 'textarea';
});
const showPassword = computed(() => {
  return isPassword.value && !isDisabled.value && !props.readonly;
  // && (!!curValue.value || isFocus.value);
});
const wordsNum = computed(() => {
  if (typeof props.wordsCountFunction === 'function') {
    return props.wordsCountFunction(curValue.value);
  }
  if (typeof curValue.value === 'number') {
    return String(curValue.value).length;
  }

  return (curValue.value || '').length;
});

// WATCH
watch(
  () => props.value,
  (val) => {
    curValue.value = val;
  },
);

// EMITS
const emit = defineEmits<{
  input: [val: any];
  clear: [];
  focus: [e: FocusEvent];
  blur: [e: FocusEvent];
  enter: [e: KeyboardEvent];
  keyup: [e: KeyboardEvent];
  keydown: [e: KeyboardEvent];
  change: [val: any];
}>();

// METHODS
const setValue = (val: any) => {
  if (val === curValue.value) return;
  curValue.value = val;
  emit('input', val);
};
const clear = (e: MouseEvent) => {
  e.stopPropagation();
  if (isDisabled.value) return;
  setValue('');
  emit('clear');
  focus();
};
const input = ref<HTMLInputElement | null>(null);
const textarea = ref<HTMLTextAreaElement | null>(null);
const getInput = () => {
  return props.type === 'textarea' ? textarea : input;
};
const focus = () => {
  if (isDisabled.value) return;
  const input = getInput();
  input.value && input.value.focus();
};
const blur = () => {
  if (isDisabled.value) return;
  const input = getInput();
  input.value && input.value.blur();
};
const onFocus = (e: FocusEvent) => {
  if (isDisabled.value) return;
  isFocus.value = true;
  emit('focus', e);
};
const onBlur = (e: FocusEvent) => {
  if (isDisabled.value) return;
  isFocus.value = false;
  emit('blur', e);
  $formItem?.emit('blur');
};
const onEnter = (e: KeyboardEvent) => {
  if (isDisabled.value) return;
  blur();
  emit('enter', e);
};
const onKeyup = (e: KeyboardEvent) => {
  if (isDisabled.value) return;
  emit('keyup', e);
};
const onKeydown = (e: KeyboardEvent) => {
  if (isDisabled.value) return;
  emit('keydown', e);
};
const onInput = (e: KeyboardEvent | CompositionEvent) => {
  if (isComposing.value) return;
  if (!inRange(e)) return;
  setValue((e.target as HTMLInputElement)?.value);
};
const onChange = (e: KeyboardEvent) => {
  if (!inRange(e)) return;
  emit('change', (e.target as HTMLInputElement)?.value);
  $formItem?.emit('change', (e.target as HTMLInputElement)?.value);
};
const inRange = (e: KeyboardEvent | CompositionEvent) => {
  if (props.type === 'number') {
    if (
      props.min !== undefined &&
      parseFloat((e.target as HTMLInputElement)?.value) < props.min
    ) {
      return false;
    } else if (
      props.max !== undefined &&
      parseFloat((e.target as HTMLInputElement)?.value) > props.max
    ) {
      return false;
    }
  }
  return true;
};
const onCompositionStart = (/* e */) => {
  isComposing.value = true;
};
const onCompositionUpdate = (/* e */) => {
  //
};
const onCompositionEnd = (e: CompositionEvent) => {
  if (isComposing.value) {
    isComposing.value = false;
    onInput(e);
  }
};
const togglePasswdVisible = (e: MouseEvent) => {
  e.stopPropagation();
  passwordVisible.value = !passwordVisible.value;
  nextTick(focus);
};
</script>
