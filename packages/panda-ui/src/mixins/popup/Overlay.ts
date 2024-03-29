// @ts-nocheck
import '../../style/overlay.scss';
import { FadeTransition } from '../../transition';

export default {
  name: 'panda-overlay',
  props: {
    show: Boolean,
    fixed: Boolean,
    onClick: Function,
    opacity: {
      type: Number,
      default: 0.6,
    },
    color: String,
    zIndex: Number,
  },
  computed: {
    overlayStyle() {
      return {
        opacity: this.opacity,
        'background-color': this.color,
        position: this.fixed ? 'fixed' : '',
        'z-index': this.zIndex,
      };
    },
  },
  methods: {
    prevent(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handleClick() {
      if (this.onClick) {
        this.onClick();
      }
    },
  },
  render(h) {
    return h(FadeTransition, [
      h('div', {
        staticClass: 'panda-overlay',
        style: this.overlayStyle,
        directives: [
          {
            name: 'show',
            value: this.show,
          },
        ],
        on: {
          click: this.handleClick,
          touchmove: this.prevent,
        },
      }),
    ]);
  },
};
