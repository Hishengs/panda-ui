import keycode from 'keycode';
let tabPressed: boolean = false;
let listening: boolean = false;

function listenForTabPresses() {
  if (!listening) {
    typeof window !== 'undefined' &&
      window.addEventListener('keydown', (event: Event) => {
        tabPressed = keycode(event) === 'tab';
      });
    listening = true;
  }
}

const keyboardcontext = '@@keyboardcontext';
export default {
  name: 'keyboard-focus',
  bind(el: any, binding: any, vnode: any) {
    listenForTabPresses();
    let timer: number | null = null;
    const handleFocus = (e: Event) => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (tabPressed) {
          if (binding.expression) {
            vnode.context[el[keyboardcontext].methodName](e);
          } else {
            el[keyboardcontext].bindingFn(e);
          }
          tabPressed = false;
        }
      }, 150);
    };

    el[keyboardcontext] = {
      handleFocus,
      methodName: binding.expression,
      bindingFn: binding.value,
    };
    el.addEventListener('focus', handleFocus);
    el.addEventListener('blur', () => {
      if (timer) clearTimeout(timer);
    });
  },
  update(el: any, binding: any) {
    el[keyboardcontext].methodName = binding.expression;
    el[keyboardcontext].bindingFn = binding.value;
  },
  unbind(el: any) {
    el.removeEventListener('focus', el[keyboardcontext].handleFocus);
  },
};
