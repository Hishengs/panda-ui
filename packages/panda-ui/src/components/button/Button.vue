<template>
  <button
    :class="cClass"
    :style="cStyle"
    :disabled="disabled"
    :type="htmlType"
    @click="onClick"
    @touchstart="() => {}"
  >
    <!-- loading icon -->
    <Loading
      v-if="loading"
      class="panda-button-loading-icon"
      :style="{
        fontSize: iconSize + 'px',
      }"
    />
    <!-- custom icon -->
    <Icon v-if="icon" :name="icon" :size="iconSize" />
    <!-- custom slot -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
const ButtonTypes = [
  'primary',
  'secondary',
  'ghost',
  'outlined',
  'text',
  'white-outlined',
] as const;
export type ButtonType = (typeof ButtonTypes)[number];
const HTMLTypes = ['button', 'submit', 'reset', undefined] as const;
export type HTMLType = (typeof HTMLTypes)[number];
const ButtonSizes = ['mini', 'small', 'normal', 'large'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { ref, computed, onMounted } from 'vue';
import Icon from '../icon';
import Loading from './Loading.vue';
import route from '../../mixins/route';
import formMixin from '../../mixins/form';
import { warning } from '../../utils/log';
import { useForm } from '../form/hook';
import { useGlobal } from '../../utils/hooks';

defineOptions({
  name: 'panda-button',
  mixins: [route, formMixin],
});

// INJECT
const $form = useForm();
const { isRtl } = useGlobal();

// PROPS
const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary',
    validator(val: ButtonType) {
      if (val === 'ghost')
        warning('ghost 已重命名为 text，即将废弃，请进行替换');
      return ButtonTypes.includes(val);
    },
  },
  htmlType: {
    type: String as PropType<HTMLType>,
    default: 'button',
  },
  size: {
    type: String as PropType<ButtonSize>,
    validator(val: ButtonSize) {
      return ButtonSizes.includes(val);
    },
  },
  disabled: Boolean,
  round: Boolean,
  block: Boolean,
  icon: String,
  loading: Boolean,
  textOverflow: String,
});

// COMPUTED
const isIcon = ref(false);
const cClass = computed(() => {
  const size = props.size || $form?.props.size;
  const disabled = props.disabled || $form?.props.disabled;
  return {
    'panda-button': true,
    [`panda-button-${props.type}`]: true,
    [`panda-button-${size}`]: !!size,
    'panda-button-disabled': disabled,
    'panda-button-round': props.round,
    'panda-button-block': props.block,
    'panda-button-icon': isIcon.value,
    'panda-button-loading': props.loading,
    'panda-button-rtl': isRtl,
  };
});
const iconSize = computed(() => {
  return {
    normal: 20,
    large: 20,
    small: 16,
    mini: 14,
  }[props.size || 'normal'];
});
const cStyle = computed(() => {
  return {
    whiteSpace: !!props.textOverflow ? 'nowrap' : '',
    textOverflow: props.textOverflow || '',
  };
}) as any;

// LIFECYCLES
onMounted(() => {
  isIcon.value = !!props.icon || !!props.loading;
});

// EMITS
const emit = defineEmits({
  click: (e: MouseEvent) => e instanceof MouseEvent,
});

// METHODS
const onClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', e);
};
</script>
