<template>
  <div :class="cClass" :style="cStyle">
    <label
      v-if="label || $slots.label"
      :for="labelFor"
      class="panda-form-item-label"
      :style="labelStyle"
    >
      <slot name="label">
        {{ label }}
        <template v-if="showColon"> :</template>
      </slot>
      <!-- <Poptip v-if="labelTooltip || $slots['label-tooltip']" :trigger="isMobile ? 'none' : 'hover'">
        <Icon type="icon_tips_tips_xxxl" size="16" class="panda-form-item-tooltip-icon" @click="onTooltipClick" />
        <span slot="content">
          <slot name="label-tooltip">
            {{ labelTooltip }}
          </slot>
        </span>
      </Poptip> -->
    </label>
    <div class="panda-form-item-content">
      <slot />
    </div>
    <div v-if="showError" class="panda-form-item-error">
      <slot name="error" :error="error || errorMsg">
        {{ error || errorMsg }}
      </slot>
    </div>
    <div
      v-if="!showError && (tip || $slots['tip'])"
      class="panda-form-item-tip"
    >
      <slot name="tip">
        {{ tip }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AsyncValidator from 'async-validator';
import {
  ref,
  computed,
  provide,
  onMounted,
  onBeforeMount,
  useSlots,
  reactive,
} from 'vue';
// import Icon from '../icon';
// import Poptip from '../poptip';
import { isMobile } from '../../utils/bom';
import { useForm } from './hook';

function noop() {}

function getPropByPath(
  obj: Record<string, any>,
  path: string,
  ignoreArrayKey?: boolean,
) {
  let curObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keys = path.split('.');
  let i = 0,
    len = keys.length;

  for (; i < len - 1; ++i) {
    if (!curObj) break;
    const key = keys[i];
    // 跳过数组索引
    if (ignoreArrayKey && key.match(/^\d+$/) && !curObj[key]) {
      continue;
    } else if (key in curObj) {
      curObj = curObj[key];
    }
  }

  return {
    obj: curObj,
    key: keys[i],
    val: curObj ? curObj[keys[i]] : null,
  };
}

defineOptions({
  name: 'panda-form-item',
});

// INJECT
const $form = useForm();

// PROPS
const props = defineProps({
  label: String,
  labelTooltip: String,
  labelFor: String,
  // labelWidth: String,
  prop: String,
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: {
    type: [Object, Array],
  },
  size: String,
  error: String,
  labelMargin: {
    type: Number,
  },
  disabled: Boolean,
  tip: String,
});

// STATES
const hasError = ref(false);
const errorMsg = ref('');
const showColon = computed(() => $form?.props.showColon);

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-form-item': true,
    'panda-form-item-has-error': showError.value,
    'panda-form-item-is-required': isRequired.value,
    'panda-form-item-no-required-mark': /* $form?.hideRequiredMark */ true,
  };
});
const cRules = computed(() => {
  const itemRules = props.rules;
  // const formRules = ($form?.rules || {})[props.prop || ''] || [];
  const { val: propRules = [] } = getPropByPath(
    $form?.props.rules || {},
    props.prop || '',
    true,
  );

  const rules: any[] = [].concat(itemRules || propRules || []);

  if (props.required !== undefined) {
    rules.push({ required: !!props.required });
  }

  return rules;
});
const isRequired = computed(() => {
  return props.required || cRules.value.some((rule) => rule.required);
});
const itemValue = computed(() => {
  if (!props.prop || !$form?.props.model) return;
  return getPropByPath($form?.props.model || {}, props.prop).val;
});
const cStyle = computed(() => {
  const inline = $form?.props.inline;
  const itemMargin = $form?.props.itemMargin;
  return {
    [inline ? 'marginRight' : 'marginBottom']: itemMargin
      ? `${itemMargin}px`
      : undefined,
  };
});
const labelStyle = computed(() => {
  const labelMargin = props.labelMargin || $form?.props.labelMargin;
  return labelMargin
    ? {
        marginBottom: `${labelMargin}px`,
      }
    : {};
});
const showError = computed(() => {
  return $form?.props.showError && (props.error || hasError.value);
});

let initialValue: any = Array.isArray(itemValue.value)
  ? ([] as any[]).concat(itemValue.value)
  : itemValue.value;

// LIFECYCLES
onMounted(() => {
  $form?.onItemAdd(this);
});
onBeforeMount(() => {
  $form?.onItemRemove(this);
});

// EMITS
const emit = defineEmits<{
  'update:error': [val: any];
  change: [val: any];
  blur: [];
}>();

// METHODS
const validate = (trigger = '', callback: any = noop) => {
  hasError.value = false;

  const rules = cRules.value
    .filter((rule) => {
      return !trigger || !rule.trigger
        ? true
        : Array.isArray(rule.trigger)
        ? rule.trigger.includes(trigger)
        : rule.trigger === trigger;
    })
    .map((rule) => {
      rule = Object.assign({}, rule);
      delete rule.trigger;
      return rule;
    });

  if (!props.prop || !$form?.props.model || rules.length === 0) {
    callback();
    return true;
  }

  const descriptor = {
    [props.prop]: rules,
  };

  const validator = new AsyncValidator(descriptor);

  const model = {
    [props.prop]: itemValue.value,
  };

  validator.validate(model, { firstFields: true }, (errors, fields) => {
    const errMsg =
      errors && errors.length ? errors[0].message : props.error || '';
    errorMsg.value = errMsg || '';
    hasError.value = !!errorMsg.value;
    callback(errorMsg, fields);
    if (props.prop) {
      $form?.emit(
        'validate',
        props.prop,
        !hasError.value,
        errorMsg.value || '',
      );
    }
  });
};
const resetField = () => {
  const model = $form?.props.model;
  clearValidate();
  // reset value
  if (!props.prop || !model) return;
  const { obj, key } = getPropByPath(model, props.prop);
  if (Array.isArray(itemValue.value)) {
    obj[key] = [].concat(initialValue);
  } else {
    obj[key] = initialValue;
  }
};
const clearValidate = () => {
  hasError.value = false;
  errorMsg.value = '';
  emit('update:error', '');
};
const onTooltipClick = () => {
  if (isMobile) {
    const slots = useSlots();
    $form &&
      $form?.openTooltip(props.labelTooltip || '', slots['label-tooltip']);
  }
};

// PROVIDE
const $FormItemContext = reactive({
  props,
  emit,
  validate,
  resetField,
  onTooltipClick,
});
export type FormItemContext = typeof $FormItemContext;
provide('$FormItemContext', $FormItemContext);
</script>
