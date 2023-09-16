export default {
  name: 'resize',
  inserted(el: Element & { _onResize: Function }, binding: any) {
    let cb = binding.value;
    let debounce = 200;
    let callOnLoad = true;

    if (typeof binding.value !== 'function') {
      cb = binding.value.value;
      debounce = binding.value.debounce || debounce;
      callOnLoad = binding.value.quiet !== null ? false : callOnLoad;
    }

    let debounceTimeout: number | undefined = undefined;
    const onResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = window.setTimeout(cb, debounce);
    };

    window.addEventListener('resize', onResize, { passive: true });
    el._onResize = onResize;

    callOnLoad && onResize();
  },
  unbind(el: any, binding: any) {
    window.removeEventListener('resize', el._onResize);
  },
};
