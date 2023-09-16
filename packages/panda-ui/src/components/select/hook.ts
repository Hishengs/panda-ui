import { inject } from 'vue';
import type { SelectContext } from './Select.vue';
import type { OptionGroupContext } from './OptionGroup.vue';

export function useSelect() {
  return inject<SelectContext | undefined>('$SelectContext', undefined);
}

export function useOptionGroup() {
  return inject<OptionGroupContext | undefined>(
    '$OptionGroupContext',
    undefined,
  );
}
