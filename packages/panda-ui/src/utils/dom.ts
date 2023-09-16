// @ts-nocheck
import { isServer } from './';
import Touch from './touch';

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const OVERFLOW_RE = /scroll|auto/i;

export function getScrollEventTarget(element: Element): Element | Window {
  let currentNode: Element | null = element;
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.nodeType === 1
  ) {
    const overflowY: string = window.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode as Element;
  }
  return window;
}

export function getScrollTop(element: Element | Window): number {
  if (element === window) {
    return Math.max(
      window.pageYOffset || 0,
      document.documentElement.scrollTop,
    );
  } else {
    return (element as Element).scrollTop;
  }
}

export function getOffset(el: Element) {
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = window.pageYOffset || el.scrollTop;
  const scrollLeft = window.pageXOffset || el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft,
  };
}

export function transitionEnd(el: Element, fun: Function) {
  const arr = [
    'msTransitionEnd',
    'mozTransitionEnd',
    'oTransitionEnd',
    'webkitTransitionEnd',
    'transitionend',
  ];
  const handler = {
    handleEvent(event: Event) {
      arr.forEach(function (eventName) {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, arguments);
    },
  };
  arr.forEach(function (eventName) {
    el.addEventListener(eventName, handler, false);
  });
}

export function hasClass(el?: Element, cls?: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export function addClass(el?: Element, cls?: string) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el?: Element, cls?: string) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = curClass ? curClass.trim() : curClass;
  }
}

export function on(
  el: Element | Document,
  event: string,
  callback: EventListener,
) {
  return el.addEventListener(event, callback);
}

export function off(
  el: Element | Document,
  event: string,
  callback: EventListener,
) {
  return el.removeEventListener(event, callback);
}

let cachedScrollerWidth: number | undefined;
export function getScrollBarSize(fresh: boolean = false): number {
  if (isServer) return 0;
  if (fresh || cachedScrollerWidth === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = '0';
    outerStyle.left = '0';
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cachedScrollerWidth = widthContained - widthScroll;
  }
  return cachedScrollerWidth;
}

const camelCase = function (name: string): string {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export function getStyle(
  element?: HTMLElement,
  styleName?: string,
): string | void {
  if (isServer || !element || !styleName) return;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed =
      document.defaultView &&
      document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || (computed ? computed[styleName] : null);
  } catch (e) {
    return element.style[styleName];
  }
}

let cachedHTML: HTMLElement | undefined;
export function getHtmlElm(): HTMLElement | void {
  if (isServer) return;
  return (
    cachedHTML ||
    (cachedHTML = document.documentElement || document.body.parentNode)
  );
}

// 单纯判断 scrollHeight > clientHeight 或者 获取 overflow 都存在问题
// 解决方案：https://segmentfault.com/a/1190000021934483
export function isElScrollable(el: HTMLElement): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const isOverflow = OVERFLOW_RE.test(getStyle(el, 'overflowY') || '');
  if (el.scrollTop > 0) return isOverflow;
  el.scrollTop++;
  if (el.scrollTop > 0) {
    // reset
    el.scrollTop = 0;
    return isOverflow;
  } else return false;
}

export function getScrollableEl(el: HTMLElement, root): HTMLElement | null {
  root = root || getHtmlElm();
  let current: HTMLElement | null = el,
    scrollable = false;

  while (
    current &&
    current.tagName !== 'HTML' &&
    current.nodeType === 1 &&
    root &&
    current !== root
  ) {
    if (isElScrollable(current)) {
      scrollable = true;
      break;
    }
    current = current.parentElement;
  }

  if (scrollable) return current;
  else return null;
}

let lockCount = 0;
let unlock: Function | undefined;

function disableRubberEffect(el: Element): Function {
  const touch = new Touch(document.body, true);
  const onTouchStart = (e) => touch.touchstart(e);
  const onTouchMove = (e) => {
    touch.touchmove(e);
    const scrollable = !!touch.scrollableEl;
    const { atTop, atBottom } = touch.scrollableElInfo;
    const shouldPrevent =
      !el.contains(e.target) ||
      !scrollable ||
      (scrollable && atTop && touch.swipeDistance > 0) ||
      (scrollable && atBottom && touch.swipeDistance < 0);
    if (e.cancelable && shouldPrevent) {
      e.preventDefault();
    }
  };
  const onTouchEnd = (e) => touch.touchend(e);
  const onTouchCancel = (e) => touch.touchcancel(e);
  document.body.addEventListener('touchstart', onTouchStart);
  document.body.addEventListener('touchmove', onTouchMove, { passive: false });
  document.body.addEventListener('touchend', onTouchEnd);
  document.body.addEventListener('touchcancel', onTouchCancel);

  return function unDisableRubberEffect() {
    document.body.removeEventListener('touchstart', onTouchStart);
    // @ts-ignore
    document.body.removeEventListener('touchmove', onTouchMove, {
      passive: false,
    });
    document.body.removeEventListener('touchend', onTouchEnd);
    document.body.removeEventListener('touchcancel', onTouchCancel);
  };
}

export function lockOuterScroll(el: Element, noRubberEffect: boolean = false) {
  lockCount++;
  if (lockCount > 1) return; // locked, no need to lock again
  if (!el || el.nodeType !== 1) return;
  const scrollingElement =
    document.scrollingElement || document.documentElement || document.body;
  const scrollBarWidth = getScrollBarSize();
  const scrollTop = scrollingElement.scrollTop;
  const bodyHasOverflow =
    document.documentElement.clientHeight < document.body.scrollHeight;
  const bodyOverflowY = getStyle(document.body, 'overflowY');
  const prevBodyPaddinigRight = document.body.style.paddingRight;
  const prevTop = document.body.style.top;
  const cPaddingRight = parseInt(
    getStyle(document.body, 'paddingRight') || '0',
    10,
  );
  const html = getHtmlElm();
  // lock
  if (bodyHasOverflow || bodyOverflowY === 'scroll') {
    document.body.style.paddingRight = cPaddingRight + scrollBarWidth + 'px';
    html && addClass(html, 'panda-lock-body-scroll');
    document.body.style.top = -scrollTop + 'px';
  }
  let unDisableRubberEffect;
  if (noRubberEffect) {
    // disable rubber effect on ios
    unDisableRubberEffect = disableRubberEffect(el);
  }
  // unlock scroll
  unlock = function () {
    document.body.style.paddingRight = prevBodyPaddinigRight;
    html && removeClass(html, 'panda-lock-body-scroll');
    document.body.style.top = prevTop;
    document.body.scrollTop = scrollTop;
    if (document.documentElement) {
      document.documentElement.scrollTop = scrollTop;
    }
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (noRubberEffect) {
      unDisableRubberEffect && unDisableRubberEffect();
    }
  };
}

export function unlockOuterScroll() {
  lockCount--;
  if (lockCount !== 0) return;
  unlock && unlock();
}

export function getObjAttr(obj?: object, attrs?: string) {
  if (!obj || !attrs) return;
  let value = obj;
  attrs.split('.').forEach((key, index) => {
    if (!value) return;
    value = value[key];
  });
  return value;
}

export function setObjAttr(obj, attrs, value) {
  attrs.split('.').forEach((key, index) => {
    if (attrs.length - index <= 1) {
      obj[key] = value;
      return;
    }
    obj = obj[key];
  });
}

export function getWidth(w): string {
  let width = String(w);
  if (width && width.indexOf('%') === -1 && width.indexOf('px') === -1)
    width += 'px';
  return width;
}

export function parseWidth(width: number | string, offset?: number) {
  if (!['number', 'string'].includes(typeof width)) return width;
  if (typeof width === 'string') {
    width = width.trim();
    if (/(\d+|px)$/.test(width)) width = parseFloat(width);
    else return width;
  }
  if (typeof width === 'number' && !Number.isNaN(width)) {
    width = offset ? width + offset : width;
    return width + 'px';
  }
}

/**
 * 将 String, Object, Array 转成 Array
 */
export function convertClass(
  classes?: Array<string> | Object | string,
): string[] {
  let newClasses: string[] = [];
  if (!classes) return newClasses;
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes as Array<string>);
  } else if (classes instanceof Object) {
    for (const name in classes) {
      if (classes[name]) newClasses.push(name);
    }
  } else {
    newClasses = newClasses.concat(classes.split(' '));
  }
  return newClasses;
}
