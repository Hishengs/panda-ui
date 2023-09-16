<template>
  <div :class="cClass">
    <div
      ref="inner"
      class="panda-select-dropdown-inner panda-scrollbar-y"
      :style="cStyle"
      @scroll.prevent="onScroll"
    >
      <slot />
      <p v-if="$select && $select.isEmpty" class="select-empty-text">
        {{ t('select.noResult') }}
      </p>
    </div>
    <div v-if="showMask" class="panda-select-dropdown-mask" />
  </div>
</template>

<script lang="ts" setup>
import _debounce from 'lodash/debounce';
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { t } from '../../locale';
import { useSelect } from './hook';
import {
  addResizeListener,
  removeResizeListener,
} from '../../utils/resize-event';

defineOptions({
  name: 'panda-select-dropdown',
});

// INJECT
const $select = useSelect();

// STATES
const showMask = ref(false);

// COMPUTED
const cClass = computed(() => {
  return {
    'panda-select-dropdown': true,
  };
});
const cStyle = computed(() => {
  return {
    maxHeight: $select ? $select.props.maxHeight + 'px' : '',
  };
});

// REFS
const inner = ref<HTMLDivElement>();

// LIFECYCLES
onMounted(() => {
  addResizeListener(inner.value, updateMask);
});
onBeforeMount(() => {
  removeResizeListener(inner.value, updateMask);
});

// METHODS
const updateMask = () => {
  if (inner.value) {
    const { clientHeight, scrollHeight, scrollTop } = inner.value;
    showMask.value = scrollTop <= 0 && scrollHeight > clientHeight;
  }
};
const onScroll = _debounce(function (e) {
  updateMask();
}, 50);
</script>
