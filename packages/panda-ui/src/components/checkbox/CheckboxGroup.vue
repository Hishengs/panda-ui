<template>
  <div :class="cClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, provide } from 'vue';
import { useGlobal } from '../../utils/hooks';
import { useFormItem } from '../form/hook';

defineOptions({
  name: 'panda-checkbox-group',
});

const { isRtl } = useGlobal();
const $formItem = useFormItem();

const props = defineProps({
  value: Array,
  disabled: Boolean,
  size: {
    type: String,
    validator(val: string) {
      return ['normal', 'small'].includes(val);
    },
  },
});

const children = ref<any[]>([]);

const cClass = computed(() => {
  return {
    'panda-checkbox-group': true,
    'panda-checkbox-group-disabled': props.disabled,
    [`panda-checkbox-group-${props.size}`]: !!props.size,
    'panda-checkbox-group-rtl': isRtl,
  };
});

// EMITS
const emit = defineEmits<{
  input: [val: any];
  change: [val: any];
}>();

const onChildAdd = (child: any) => {
  child.inGroup = true;
  children.value.push(child);
};
const onChildRemove = (child: any) => {
  const index = children.value.indexOf(child);
  if (index !== -1) {
    children.value.splice(index, 1);
  }
};
const onChildChange = (child: any) => {
  const value = props.value || [];
  const index = value.indexOf(child.groupValue);
  const newVal =
    index !== -1
      ? value.filter((val: any) => val !== child.groupValue)
      : [...value, child.groupValue];
  emit('input', newVal);
  emit('change', newVal);
  $formItem?.emit('change', newVal);
};

// PROVIDE
const $CheckboxGroupContext = reactive({
  props,
  onChildAdd,
  onChildRemove,
  onChildChange,
});
export type CheckboxGroupContext = typeof $CheckboxGroupContext;
provide('$CheckboxGroupContext', $CheckboxGroupContext);
</script>
