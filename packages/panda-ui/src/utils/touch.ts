import { getScrollableEl } from './dom';

interface ScrollableElInfo {
  atTop?: boolean;
  atBottom?: boolean;
}

type TouchPoint = TouchList[0];

export default class Touch {
  pageX: number = 0;
  pageY: number = 0;
  swiping: boolean = false;
  swipeDistance: number = 0;
  swipeDistanceX: number = 0;
  swipeStartTime: number | null = null;
  rootEl: HTMLElement | null = null;
  detectScrollableEl: boolean = false;
  scrollableEl: HTMLElement | null = null;
  scrollableElInfo: ScrollableElInfo = {};

  constructor(rootEl: HTMLElement, detectScrollableEl = false) {
    this.rootEl = rootEl;
    this.detectScrollableEl = detectScrollableEl;
  }

  touchstart(e: TouchEvent) {
    this.swiping = true;
    this.swipeDistance = 0;
    this.swipeDistanceX = 0;
    this.swipeStartTime = Date.now();
    const touche: TouchPoint = e.targetTouches[0];
    const { pageX, pageY } = touche;
    this.pageX = pageX;
    this.pageY = pageY;
    if (this.detectScrollableEl) {
      this.scrollableEl = getScrollableEl(e.target as HTMLElement, this.rootEl);
    }
  }

  touchmove(e: TouchEvent) {
    if (!this.swiping) return;
    if (this.detectScrollableEl) {
      let atTop = false;
      let atBottom = false;
      if (this.scrollableEl) {
        const { scrollTop, clientHeight, scrollHeight } = this.scrollableEl;
        atTop = scrollTop === 0;
        atBottom = scrollTop >= scrollHeight - clientHeight;
      }
      this.scrollableElInfo = {
        atTop,
        atBottom,
      };
    }
    const touche = e.targetTouches[0];
    const { pageX, pageY } = touche;
    this.swipeDistance = pageY - this.pageY;
    this.swipeDistanceX = pageX - this.pageX;
  }

  touchend(e: TouchEvent) {
    this.touchcancel(e);
  }

  touchcancel(e: TouchEvent) {
    this.pageX = 0;
    this.pageY = 0;
    this.swiping = false;
    this.swipeDistance = 0;
    this.swipeDistanceX = 0;
    this.swipeStartTime = null;
    this.scrollableEl = null;
    this.scrollableElInfo = {};
  }
}
