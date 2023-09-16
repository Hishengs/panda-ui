import Drag from '../utils/drag';

type El = Element & { _drag: Drag | null };

function inserted(el: El, { value, modifiers }: any) {
  const drag = new Drag(el, modifiers.touch);
  el._drag = drag;
  drag.start((pos: any, e: Element) => {
    value.start && value.start(pos, drag, e);
  });
  drag.drag((pos: any, e: Element) => {
    value.move && value.move(pos, drag, e);
  });
  drag.end((pos: any, e: Element) => {
    value.end && value.end(pos, drag, e);
    const dirRatio = 0.5;
    const minDistance = 16;
    if (Math.abs(pos.y) < dirRatio * Math.abs(pos.x)) {
      value.left && pos.x < -minDistance && value.left(pos, drag, e);
      value.right && pos.x > minDistance && value.right(pos, e);
    }

    if (Math.abs(pos.x) < dirRatio * Math.abs(pos.y)) {
      value.up && pos.y < -minDistance && value.up(pos, drag, e);
      value.down && pos.y > minDistance && value.down(pos, drag, e);
    }
  });
}
function unbind(el: El) {
  if (el._drag) el._drag.destory();
  el._drag = null;
}

export default {
  name: 'swipe',
  inserted,
  unbind,
};
