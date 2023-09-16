import '../style/transitions.scss';
export { default as ExpandTransition } from './ExpandTransition';

function createTransition(name: string, mode?: string) {
  return {
    name,
    functional: true,
    render(h: any, context: any) {
      context.data = context.data || {};
      context.data.props = { name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on };
      }

      if (mode) context.data.props.mode = mode;

      return h('transition', context.data, context.children);
    },
  };
}

export const FadeTransition = createTransition('panda-fade-transition');
export const SlideTopTransition = createTransition(
  'panda-slide-top-transition',
);
export const SlideBottomTransition = createTransition(
  'panda-slide-bottom-transition',
);
export const SlideLeftTransition = createTransition(
  'panda-slide-left-transition',
);
export const SlideRightTransition = createTransition(
  'panda-slide-right-transition',
);
export const PopoverTransiton = createTransition('panda-popover-transition');
export const BottomSheetTransition = createTransition(
  'panda-bottom-sheet-transition',
);
export const ScaleTransition = createTransition('panda-scale-transition');
