// @ts-nocheck
import { vueExtend, nextTick } from '../../utils/vue';
import keycode from 'keycode';
// 暂不使用 body-scroll-lock，在 C 端存在问题
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { lockOuterScroll, unlockOuterScroll } from '../../utils/dom';
import { initZIndex } from './utils';
import overlayOpt from './Overlay';
const Overlay = vueExtend(overlayOpt);

const PopupManager = {
  instances: [],
  open(instance) {
    if (!instance || this.instances.indexOf(instance) !== -1) return;
    if (instance.overlay) {
      this.createOverlay(instance);
    }
    this.updateZIndex(instance);
    if (instance.lockScroll) {
      this.preventScrolling(instance);
    }
    this.instances.push(instance);
  },
  close(instance) {
    const index = this.instances.indexOf(instance);
    if (index === -1) return;
    this.instances.splice(index, 1);
    this.resetZIndex(instance);
    this.closeOverlay(instance);
    if (instance.lockScroll) {
      this.allowScrolling();
    }
  },
  setZIndex(instance, zIndex) {
    instance._zIndex = zIndex;
    if (instance._overlay) {
      instance._overlay.zIndex = zIndex - 1;
    }
    instance.overlayZIndex = zIndex - 1;
  },
  updateZIndex(instance) {
    // use zIndex from props
    if (instance.zIndex) {
      this.setZIndex(instance, instance.zIndex);
      return;
    }
    // auto update zIndex
    if (this.instances.length) {
      const lastInstance = this.instances[this.instances.length - 1];
      this.setZIndex(instance, lastInstance._zIndex + 2);
    }
  },
  resetZIndex(instance) {
    this.setZIndex(instance, initZIndex);
  },
  createOverlay(instance) {
    const overlay = new Overlay({
      el: document.createElement('div'),
    });
    overlay.fixed = true;
    overlay.color = instance.overlayColor;
    overlay.opacity = instance.overlayOpacity;
    overlay.zIndex = instance.overlayZIndex;
    overlay.onClick = (e) => {
      if (instance.overlayClick) {
        instance.overlayClick(e);
      }
    };
    document.body.appendChild(overlay.$el);
    nextTick(() => {
      overlay.show = true;
    });
    instance._overlay = overlay;
  },
  closeOverlay(instance) {
    if (!instance || !instance._overlay) return;
    const overlay = instance._overlay;
    overlay.show = false;
    instance._overlay = null;
    setTimeout(() => {
      document.body.removeChild(overlay.$el);
      overlay.$destroy();
    }, 450);
  },
  // 禁止滚动
  preventScrolling(instance) {
    if (this.locked) return;
    // body 操作
    /* const body = document.getElementsByTagName('body')[0];
    disableBodyScroll(body, {
      reserveScrollBarGap: true,
      allowTouchMove: (el) => {
        for (let i = 0; i < this.instances.length; i++) {
          if (
            this.instances[i] &&
            this.instances[i].$el &&
            this.instances[i].$el.contains(el)
          ) {
            return true;
          }
        }
        return false;
      }
    }); */
    nextTick(() => {
      lockOuterScroll(instance.$el);
    });
    this.locked = true;
  },
  // 还原滚动设置
  allowScrolling() {
    if (this.instances.some((ins) => ins.lockScroll)) return;
    /* const body = document.getElementsByTagName('body')[0];
    enableBodyScroll(body, {
      reserveScrollBarGap: true
    });
    clearAllBodyScrollLocks(); */
    unlockOuterScroll();
    this.locked = false;
  },
};

typeof window !== 'undefined' &&
  window.addEventListener('keydown', (e) => {
    if (PopupManager.instances.length === 0 || keycode(e) !== 'esc') return;
    const instance = PopupManager.instances[PopupManager.instances.length - 1];
    if (instance.escPress) {
      instance.escPress();
    }
  });

export default PopupManager;
