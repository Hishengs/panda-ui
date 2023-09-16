import { inject } from 'vue';

export function useGlobal() {
  const size = inject<string | undefined>('size', undefined);
  const isRtl = inject<boolean>('isRtl', false);
  return {
    size,
    isRtl,
  };
}
