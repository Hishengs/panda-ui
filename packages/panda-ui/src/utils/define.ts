export function defineComponent(comp: any) {
  comp.mixins = comp.mixins || [];
  comp.mixins.push({
    mounted() {
      const el = this.$el as Element;
      el.setAttribute && el.setAttribute('data-panda-comp', '');
    },
  });
  return comp;
}
