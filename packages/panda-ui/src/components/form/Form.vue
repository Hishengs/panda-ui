<template>
  <form ref="wrapper" :class="cClass">
    <slot />
    <!-- for label tooltip in mobile web -->
    <BottomSheet v-model:visible="showTooltip">
      <div style="min-height: 50vh">
        <TooltipRender :custom-slot="tooltipSlot">
          {{ tooltip }}
        </TooltipRender>
      </div>
    </BottomSheet>
  </form>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  provide,
  watch,
  nextTick,
  h,
  useSlots,
  reactive,
} from 'vue';
import type { SetupContext, Slot } from 'vue';
import type { ValidateFieldsError, Values } from 'async-validator';
import { warning } from '../../utils/log';
import { isTypeOf } from '../../utils/is';
import { useGlobal } from '../../utils/hooks';
import BottomSheet from '../bottom-sheet';

const { isRtl } = useGlobal();

function TooltipRender(
  props: { customSlot: Slot<any> | undefined },
  ctx: SetupContext,
) {
  const { customSlot } = props;
  const defaultSlot = useSlots().default;
  const children = customSlot ? customSlot : defaultSlot ? defaultSlot() : null;
  return children ? h('div', {}, children) : null;
}
TooltipRender.props = {
  customSlot: [Object, Array],
};

defineOptions({
  name: 'panda-form',
});

const props = defineProps({
  model: Object,
  rules: Object,
  // TODO: label related props
  labelPosition: String,
  labelWidth: String,
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  // 是否显示错误消息
  showError: {
    type: Boolean,
    default: true,
  },
  size: String,
  disabled: Boolean,
  // 是否在 rules 属性改变后立即触发一次验证
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  // 是否显示必填字段的标签旁边的标记（设计不需要，文档暂不暴露）
  /* hideRequiredMark: {
    type: Boolean,
    default: true
  }, */
  // 是否显示标签之后的冒号
  showColon: Boolean,
  // 样式类型
  styleType: {
    type: String,
    validator(val: string) {
      return ['outlined', 'lined', 'filled'].includes(val);
    },
  },
  // 表单项间距
  itemMargin: {
    type: Number,
  },
  labelMargin: {
    type: Number,
  },
  // 自动定位到第一个错误表单项
  autoLocateError: Boolean,
});

const items = ref<any[]>([]);
const showTooltip = ref(false);
const tooltip = ref('');
const tooltipSlot = ref<Slot>();

const cClass = computed(() => {
  return {
    'panda-form': true,
    'panda-form-inline': props.inline,
    [`panda-form-${props.size}`]: !!props.size,
    'panda-form-rtl': isRtl,
  };
});

watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) {
      validate(() => {});
    }
  },
);

// EMITS
const emit = defineEmits<{
  validate: [prop: string, hasError: boolean, errMsg: string];
}>();

const wrapper = ref<HTMLFormElement | null>(null);

const onItemAdd = (item: any) => {
  if (item) {
    items.value.push(item);
  }
};
const onItemRemove = (item: any) => {
  const index = items.value.indexOf(item);
  if (index >= 0) {
    items.value.splice(index, 1);
  }
};
const validate = (
  callback: (valid: boolean, _flds?: ValidateFieldsError | Values) => void,
) => {
  if (!props.model) {
    warning(' [Form] prop: model is needed.');
    return;
  }

  let promise;

  if (typeof callback !== 'function' && window.Promise) {
    promise = new window.Promise((resolve, reject) => {
      callback = (valid) => {
        if (valid) resolve(valid);
        else reject(valid);
      };
    });
  }

  if (items.value.length === 0 && typeof callback === 'function') {
    callback(true);
  }

  let valid = true,
    count = 0,
    fileds = {};

  for (const item of items.value) {
    item.validate('', (err: Error, _fields: ValidateFieldsError | Values) => {
      if (err) {
        valid = false;
      }
      fileds = Object.assign({}, fileds, _fields);
      count++;
      if (typeof callback === 'function' && count >= items.value.length) {
        // autoLocateError
        if (!valid && props.autoLocateError) {
          nextTick(() => {
            const item = wrapper.value!.querySelector(
              '.panda-form-item-has-error',
            );
            item && item.scrollIntoView();
          });
        }
        callback(valid, _fields);
      }
    });
  }

  return promise;
};
const validateField = (field: string[], callback: any) => {
  const fields: string[] = ([] as string[]).concat(field);
  const _items: any[] = items.value.filter(
    (item) => item.prop && fields.includes(item.prop),
  );
  _items.forEach((item) => item.validate('', callback));
};
const resetFields = () => {
  if (!props.model) {
    warning(' [Form] prop: model is needed.');
    return;
  }
  items.value.forEach((item) => item.prop && item.resetField());
};
const clearValidate = (props: string | string[]) => {
  const fields = isTypeOf(props, 'string')
    ? items.value.filter((item) => item.prop === props)
    : isTypeOf(props, 'array')
    ? items.value.filter((item) => props.includes(item.prop))
    : items.value;
  fields.forEach((field) => field.clearValidate());
};
const openTooltip = (_tooltip: string, slot?: Slot) => {
  showTooltip.value = true;
  tooltip.value = _tooltip;
  tooltipSlot.value = slot;
};

// PROVIDE
const $FormContext = reactive({
  props,
  emit,
  onItemAdd,
  onItemRemove,
  validateField,
  resetFields,
  clearValidate,
  openTooltip,
});
export type FormContext = typeof $FormContext;
provide('$FormContext', $FormContext);
</script>
