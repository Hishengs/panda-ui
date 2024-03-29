const IS_TOUCH =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    // @ts-ignore
    (window['DocumentTouch'] && document instanceof window['DocumentTouch']));

/* interface Pos {
  x?: number;
  y?: number;
  time?: number;
}; */

export default class Drag {
  el: Element;
  startPos: any = {};
  endPos: any = {};
  starts: Function[] = [];
  drags: Function[] = [];
  ends: Function[] = [];
  onlyTouch: boolean = false;

  constructor(element: Element, onlyTouch: boolean = false) {
    this.el = element;
    this.onlyTouch = onlyTouch;
    if (IS_TOUCH || onlyTouch) {
      this.el.addEventListener('touchstart', this);
    } else {
      this.el.addEventListener('mousedown', this);
    }
  }

  handleEvent(event: TouchEvent | MouseEvent) {
    switch (event.type) {
      case 'touchstart':
        this.touchStart(event as TouchEvent);
        break;
      case 'touchmove':
        this.touchMove(event as TouchEvent);
        break;
      case 'touchcancel':
      case 'touchend':
        this.touchEnd(event as TouchEvent);
        break;
      case 'mousedown':
        this.mouseStart(event as MouseEvent);
        break;
      case 'mousemove':
        this.mouseMove(event as MouseEvent);
        break;
      case 'mouseleave':
      case 'mouseup':
        this.mouseEnd(event as MouseEvent);
        break;
    }
  }

  touchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.startPos = {
      // 取第一个touch的坐标值
      x: touch.pageX,
      y: touch.pageY,
      time: new Date().getTime(),
    };
    this.endPos = {};
    document.addEventListener('touchmove', this, {
      passive: false,
    });
    document.addEventListener('touchend', this, {
      passive: false,
    });
    this.starts.map((func) => {
      func.call(this, this.startPos, event);
    });
  }

  touchMove(event: TouchEvent) {
    // @ts-ignore
    if (event.touches.length > 1 || (event.scale && event.scale !== 1)) return;
    const touch = event.touches[0];
    this.endPos = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y,
      time: new Date().getTime() - this.startPos.time,
    };
    this.drags.map((func) => {
      func.call(this, this.endPos, event);
    });
  }

  touchEnd(event: TouchEvent) {
    this.endPos.time = new Date().getTime() - this.startPos.time;

    document.removeEventListener('touchmove', this);
    document.removeEventListener('touchend', this);
    this.ends.map((func) => {
      func.call(this, this.endPos, event);
    });
  }

  mouseStart(event: MouseEvent) {
    this.startPos = {
      x: event.clientX,
      y: event.clientY,
      time: new Date().getTime(),
    };
    this.endPos = {};
    document.addEventListener('mousemove', this);
    document.addEventListener('mouseup', this);
    this.starts.map((func) => {
      func.call(this, this.startPos, event);
    });
  }

  mouseMove(event: MouseEvent) {
    this.endPos = {
      x: event.clientX - this.startPos.x,
      y: event.clientY - this.startPos.y,
    };

    this.drags.map((func) => {
      func.call(this, this.endPos, event);
    });
  }

  mouseEnd(event: MouseEvent) {
    document.removeEventListener('mousemove', this);
    document.removeEventListener('mouseup', this);

    this.endPos.time = new Date().getTime() - this.startPos.time;

    this.ends.map((func) => {
      func.call(this, this.endPos, event);
    });
  }

  start(fun: Function) {
    this.starts.push(fun);
    return this;
  }

  end(fun: Function) {
    this.ends.push(fun);
    return this;
  }

  drag(fun: Function) {
    this.drags.push(fun);
    return this;
  }

  reset(event: any) {
    const touch = event.touches ? event.touches[0] : {};
    this.startPos = {
      // 取第一个touch的坐标值
      x: touch.pageX || event.clientX,
      y: touch.pageY || event.clientY,
      time: new Date().getTime(),
    };
    this.endPos = {
      x: 0,
      y: 0,
    };
  }

  destory() {
    if (IS_TOUCH || this.onlyTouch) {
      this.el.removeEventListener('touchstart', this);
    } else {
      this.el.removeEventListener('mousedown', this);
    }
  }
}
