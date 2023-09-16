import { inject } from 'vue';
import type { CheckboxGroupContext } from './CheckboxGroup.vue';

export function useCheckboxGroup() {
  return inject<CheckboxGroupContext | undefined>(
    '$CheckboxGroupContext',
    undefined,
  );
}
