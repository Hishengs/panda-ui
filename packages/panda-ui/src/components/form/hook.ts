import { inject } from 'vue';
import type { FormContext } from './Form.vue';
import type { FormItemContext } from './FormItem.vue';

export function useForm() {
  return inject<FormContext | undefined>('$FormContext', undefined);
}

export function useFormItem() {
  return inject<FormItemContext | undefined>('$FormItemContext', undefined);
}
