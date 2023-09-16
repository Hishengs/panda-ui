// @ts-nocheck
import PopupManager from './manager';

export default {
  props: {
    open: Boolean,
    overlay: {
      type: Boolean,
      default: true,
    },
    overlayClosable: {
      type: Boolean,
      default: false,
    },
    overlayOpacity: {
      type: Number,
      default: 1,
    },
    overlayColor: {
      type: String,
    },
    escPressClosable: {
      // 按退出键是否触发关闭事件
      type: Boolean,
      default: false,
    },
    lockScroll: {
      // 是否锁定全局滚动
      type: Boolean,
      default: false,
    },
    appendBody: {
      // 是否添加到 body 元素后, 内部使用
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      overlayZIndex: 0,
      _zIndex: 0,
    };
  },
  methods: {
    overlayClick(e) {
      if (!this.overlay || !this.overlayClosable || !this.open) return;
      this.close('overlay');
    },
    escPress(e) {
      if (!this.escPressClosable || !this.open) return;
      this.close('esc');
    },
    popupEl() {
      return this.$el;
    },
    appendPopupElToBody() {
      if (!this.appendBody || this.appened) return;
      this.$nextTick(() => {
        document.body.appendChild(this.$el);
        this.appened = true;
      });
    },
  },
  created() {
    PopupManager.resetZIndex(this);
  },
  mounted() {
    if (this.open) {
      PopupManager.open(this);
      this.appendPopupElToBody();
    }
  },
  beforeDestroy() {
    PopupManager.close(this);
    if (this.appendBody) {
      if (!this.$el) return;
      if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
    }
  },
  watch: {
    open(val, oldVal) {
      if (val) {
        PopupManager.open(this);
        this.appendPopupElToBody();
      } else {
        PopupManager.close(this);
      }
    },
  },
};
